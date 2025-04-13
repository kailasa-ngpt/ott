import express, { Request, Response, Router, NextFunction } from 'express';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import axios from 'axios';
import dotenv from 'dotenv';
import NodeCache from 'node-cache';
import { Readable } from 'stream';

dotenv.config();

// S3 Configuration
const S3_ENDPOINT = process.env.CLOUDFLARE_ENDPOINT_URL || "";
const ACCESS_KEY = process.env.CLOUDFLARE_ACCESS_KEY_ID || "";
const SECRET_KEY = process.env.CLOUDFLARE_ACCESS_KEY_SECRET || "";
const BUCKET_NAME = process.env.CLOUDFLARE_BUCKET_NAME || "ntv-ott";
const EXPIRATION = parseInt(process.env.URL_EXPIRATION || "300"); // 5 minutes default

// Get CORS origins from environment
const CORS_ORIGINS = process.env.CORS_ORIGINS
  ? process.env.CORS_ORIGINS.split(',').map(origin => origin.trim())
  : [];

// Create S3 client
const s3Client = new S3Client({
  region: "auto",
  endpoint: S3_ENDPOINT,
  credentials: {
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_KEY,
  }
});

// Initialize cache
const m3u8Cache = new NodeCache({ stdTTL: 300, checkperiod: 60 });
const tsCache = new NodeCache({ stdTTL: 1800, checkperiod: 300 });
const urlCache = new NodeCache({ stdTTL: Math.floor(EXPIRATION * 0.9), checkperiod: 30 });

// Logging function
function logger(message: string, level: 'debug' | 'info' | 'error' = 'info') {
  const LOG_LEVEL = process.env.LOG_LEVEL || 'info';
  if (LOG_LEVEL === 'error' && level !== 'error') return;
  if (LOG_LEVEL === 'info' && level === 'debug') return;

  const timestamp = new Date().toISOString();
  const logMessage = `${timestamp} [${level.toUpperCase()}] ${message}`;
  console.log(logMessage);
}

// Get a signed URL with caching
async function getSignedUrlWithCache(path: string, type: 'm3u8' | 'ts' = 'm3u8'): Promise<string> {
  const cacheKey = `url-${path}`;

  const cachedUrl = urlCache.get<string>(cacheKey);
  if (cachedUrl) {
    logger(`Cache hit for signed URL: ${path}`, 'debug');
    return cachedUrl;
  }

  logger(`Generating signed URL for: ${path}`, 'debug');

  const command = new GetObjectCommand({
    Bucket: BUCKET_NAME,
    Key: path
  });

  try {
    const signedUrl = await getSignedUrl(s3Client, command, {
      expiresIn: EXPIRATION
    });

    urlCache.set(cacheKey, signedUrl);
    return signedUrl;
  } catch (error: any) {
    logger(`Error generating signed URL for ${path}: ${error.message}`, 'error');
    throw error;
  }
}

// Parse M3U8 and rewrite URLs
function rewriteM3U8Content(content: string, basePath: string): string {
  const baseDir = basePath.substring(0, basePath.lastIndexOf('/') + 1);

  const lines = content.split('\n');
  const rewrittenLines = lines.map(line => {
    if (line.trim().startsWith('#')) {
      return line;
    }

    if (line.endsWith('.m3u8')) {
      const m3u8Path = line.startsWith('/') ? line.substring(1) : baseDir + line;
      return `/media/${encodeURIComponent(m3u8Path)}`;
    }

    if (line.endsWith('.ts')) {
      const tsPath = line.startsWith('/') ? line.substring(1) : baseDir + line;
      return `/media/${encodeURIComponent(tsPath)}`;
    }

    return line;
  });

  return rewrittenLines.join('\n');
}

// Create the router
const streamProxyRouter = Router();

// Add CORS middleware
streamProxyRouter.use((req, res, next) => {
  const origin = req.headers.origin;

  if (origin && CORS_ORIGINS.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Range, Accept, Content-Type');
    res.header('Access-Control-Expose-Headers', 'Content-Length, Content-Range, Accept-Ranges');
  }

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  next();
});

// Handle streaming media requests
streamProxyRouter.get('*', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const mediaPath = req.path.substring(1);
    const decodedPath = decodeURIComponent(mediaPath);

    if (!decodedPath) {
      return res.status(400).send("Invalid media path");
    }

    logger(`Processing media request for: ${decodedPath}`, 'debug');

    const isM3U8 = decodedPath.endsWith('.m3u8');
    const isTS = decodedPath.endsWith('.ts');
    const isWebp = decodedPath.endsWith('.webp') || decodedPath.endsWith('.jpg') || decodedPath.endsWith('.png');

    // Handle image files
    if (isWebp) {
      try {
        const signedUrl = await getSignedUrlWithCache(decodedPath, 'm3u8');
        const response = await axios.get(signedUrl, { responseType: 'arraybuffer' });
        const contentType = response.headers['content-type'] || 'image/webp';

        res.setHeader('Content-Type', contentType);
        res.send(response.data);
      } catch (error: any) {
        logger(`Error fetching image ${decodedPath}: ${error.message}`, 'error');
        return next(error);
      }
      return;
    }

    // Handle M3U8 files
    if (isM3U8) {
      const cachedM3u8 = m3u8Cache.get<string>(decodedPath);
      if (cachedM3u8) {
        logger(`M3U8 cache hit: ${decodedPath}`, 'debug');
        res.setHeader('Content-Type', 'application/vnd.apple.mpegurl');
        return res.send(cachedM3u8);
      }

      try {
        const signedUrl = await getSignedUrlWithCache(decodedPath);
        const response = await axios.get(signedUrl);
        let m3u8Content: string | Buffer = response.data;

        if (Buffer.isBuffer(m3u8Content)) {
          m3u8Content = m3u8Content.toString('utf-8');
        } else if (typeof m3u8Content !== 'string') {
          m3u8Content = String(m3u8Content);
        }

        const modifiedContent = rewriteM3U8Content(m3u8Content, decodedPath);
        m3u8Cache.set(decodedPath, modifiedContent);

        res.setHeader('Content-Type', 'application/vnd.apple.mpegurl');
        return res.send(modifiedContent);
      } catch (error: any) {
        logger(`Error fetching M3U8 ${decodedPath}: ${error.message}`, 'error');
        return next(error);
      }
    }

    // Handle TS files
    if (isTS) {
      if (tsCache.has(decodedPath) && process.env.TS_CACHE_ENABLED !== 'false') {
        logger(`TS cache hit: ${decodedPath}`, 'debug');
        const cachedData = tsCache.get(decodedPath);
        res.setHeader('Content-Type', 'video/mp2t');
        return res.send(cachedData);
      }

      try {
        const signedUrl = await getSignedUrlWithCache(decodedPath, 'ts');

        if (process.env.TS_CACHE_ENABLED !== 'false') {
          // For smaller files, cache in memory
          const response = await axios.get<Buffer>(signedUrl, { responseType: 'arraybuffer' });
          tsCache.set(decodedPath, response.data);

          res.setHeader('Content-Type', 'video/mp2t');
          return res.send(response.data);
        } else {
          // For larger files or when caching is disabled, use streaming
          const response = await axios({
            method: 'get',
            url: signedUrl,
            responseType: 'stream'
          });

          res.setHeader('Content-Type', 'video/mp2t');

          if (response.data && response.data instanceof Readable) {
            return response.data.pipe(res);
          } else {
            throw new Error('Invalid response data format');
          }
        }
      } catch (error: any) {
        logger(`Error fetching TS file ${decodedPath}: ${error.message}`, 'error');
        return next(error);
      }
    }

    logger(`Unsupported media type: ${decodedPath}`, 'error');
    return res.status(400).send("Unsupported media type");
  } catch (error: any) {
    logger(`Error processing media request: ${error.message}`, 'error');
    return next(error);
  }
});

// Add cache clearing endpoint
streamProxyRouter.get('/clear-cache', (req: Request, res: Response) => {
  try {
    m3u8Cache.flushAll();
    tsCache.flushAll();
    urlCache.flushAll();
    logger('Cache cleared', 'info');
    return res.json({ success: true });
  } catch (error: any) {
    logger(`Error clearing cache: ${error.message}`, 'error');
    return res.json({ success: false, error: error.message });
  }
});

export { streamProxyRouter };