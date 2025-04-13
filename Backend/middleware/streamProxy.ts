import express, { Request, Response, Router, NextFunction } from 'express';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import axios from 'axios';
import dotenv from 'dotenv';
// Import NodeCache with proper type declaration
import NodeCache from 'node-cache';

dotenv.config();

// R2 Configuration - From environment variables
const R2_ENDPOINT = process.env.CLOUDFLARE_ENDPOINT_URL || "";
const ACCESS_KEY = process.env.CLOUDFLARE_ACCESS_KEY_ID || "";
const SECRET_KEY = process.env.CLOUDFLARE_ACCESS_KEY_SECRET || "";
const BUCKET_NAME = process.env.CLOUDFLARE_BUCKET_NAME || "ntv-ott";
const EXPIRATION = parseInt(process.env.URL_EXPIRATION || "300"); // 5 minutes default

// Create S3 client for R2
const s3Client = new S3Client({
  region: "auto",
  endpoint: R2_ENDPOINT,
  credentials: {
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_KEY,
  }
});

// Initialize cache
// ttl is in seconds: 5 min for m3u8, 30 min for ts files
const m3u8Cache = new NodeCache({ stdTTL: 300, checkperiod: 60 });
const tsCache = new NodeCache({ stdTTL: 1800, checkperiod: 300 });
const urlCache = new NodeCache({ stdTTL: Math.floor(EXPIRATION * 0.9), checkperiod: 30 }); // 90% of EXPIRATION

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

  // Check if we have a cached URL that's still valid
  const cachedUrl = urlCache.get<string>(cacheKey);
  if (cachedUrl) {
    logger(`Cache hit for signed URL: ${path}`, 'debug');
    return cachedUrl;
  }

  // Generate a new signed URL
  logger(`Generating signed URL for: ${path}`, 'debug');

  const command = new GetObjectCommand({
    Bucket: BUCKET_NAME,
    Key: path
  });

  try {
    const signedUrl = await getSignedUrl(s3Client, command, {
      expiresIn: EXPIRATION
    });

    // Cache the URL
    urlCache.set(cacheKey, signedUrl);

    return signedUrl;
  } catch (error: any) {
    logger(`Error generating signed URL for ${path}: ${error.message}`, 'error');
    throw error;
  }
}

// Parse M3U8 and rewrite URLs
function rewriteM3U8Content(content: string, basePath: string): string {
  // Extract base directory
  const baseDir = basePath.substring(0, basePath.lastIndexOf('/') + 1);

  // Process line by line for more efficient and accurate parsing
  const lines = content.split('\n');
  const rewrittenLines = lines.map(line => {
    // Skip comment lines
    if (line.trim().startsWith('#')) {
      return line;
    }

    // Handle M3U8 files (like in master playlists)
    if (line.endsWith('.m3u8')) {
      const m3u8Path = line.startsWith('/') ? line.substring(1) : baseDir + line;
      return `/media/${encodeURIComponent(m3u8Path)}`;
    }

    // Handle TS files
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

// Handle streaming media requests (both M3U8 and TS files)
streamProxyRouter.get('*', async (req: Request, res: Response) => {
  try {
    // Extract the media path from the URL and properly decode it
    const mediaPath = req.path.substring(1); // Remove leading slash
    const decodedPath = decodeURIComponent(mediaPath);

    if (!decodedPath) {
      return res.status(400).send("Invalid media path");
    }

    logger(`Processing media request for: ${decodedPath}`, 'debug');

    // Determine content type
    const isM3U8 = decodedPath.endsWith('.m3u8');
    const isTS = decodedPath.endsWith('.ts');
    const isWebp = decodedPath.endsWith('.webp') || decodedPath.endsWith('.jpg') || decodedPath.endsWith('.png');

    // Handle image files (thumbnails)
    if (isWebp) {
      // Get signed URL
      const signedUrl = await getSignedUrlWithCache(decodedPath, 'm3u8');

      try {
        // Fetch the image
        const response = await axios.get(signedUrl, { responseType: 'arraybuffer' });

        // Determine content type
        const contentType = response.headers['content-type'] || 'image/webp';

        // Send the image data
        res.setHeader('Content-Type', contentType);
        res.send(response.data);
      } catch (error: any) {
        logger(`Error fetching image ${decodedPath}: ${error.message}`, 'error');
        res.status(500).send(`Error fetching image: ${error.message}`);
      }
      return;
    }

    // Handle M3U8 files
    if (isM3U8) {
      // Check cache first
      const cachedM3u8 = m3u8Cache.get<string>(decodedPath);
      if (cachedM3u8) {
        logger(`M3U8 cache hit: ${decodedPath}`, 'debug');
        res.setHeader('Content-Type', 'application/vnd.apple.mpegurl');
        res.send(cachedM3u8);
        return;
      }

      // Get signed URL
      const signedUrl = await getSignedUrlWithCache(decodedPath);

      try {
        // Fetch the M3U8 content
        const response = await axios.get<string>(signedUrl);
        let m3u8Content = response.data;

        // Ensure content is a string
        if (typeof m3u8Content !== 'string') {
          m3u8Content = m3u8Content.toString();
        }

        // Rewrite URLs
        const modifiedContent = rewriteM3U8Content(m3u8Content, decodedPath);

        // Cache the modified content
        m3u8Cache.set(decodedPath, modifiedContent);

        // Send the response
        res.setHeader('Content-Type', 'application/vnd.apple.mpegurl');
        res.send(modifiedContent);
      } catch (error: any) {
        logger(`Error fetching M3U8 ${decodedPath}: ${error.message}`, 'error');
        res.status(500).send(`Error fetching M3U8: ${error.message}`);
      }
    }
    // Handle TS files
    else if (isTS) {
      // Check if we have this TS segment cached
      if (tsCache.has(decodedPath) && process.env.TS_CACHE_ENABLED !== 'false') {
        logger(`TS cache hit: ${decodedPath}`, 'debug');
        const cachedData = tsCache.get(decodedPath);
        res.setHeader('Content-Type', 'video/mp2t');
        res.send(cachedData);
        return;
      }

      // Get signed URL
      const signedUrl = await getSignedUrlWithCache(decodedPath, 'ts');

      try {
        // For smaller TS files, we'll cache them in memory
        if (process.env.TS_CACHE_ENABLED !== 'false') {
          // For caching, we need the full response
          const response = await axios.get<Buffer>(signedUrl, { responseType: 'arraybuffer' });

          // Cache the segment
          tsCache.set(decodedPath, response.data);

          // Send response
          res.setHeader('Content-Type', 'video/mp2t');
          res.send(response.data);
        } else {
          // For larger files or when caching is disabled, use streaming
          const response = await axios({
            method: 'get',
            url: signedUrl,
            responseType: 'stream'
          });

          res.setHeader('Content-Type', 'video/mp2t');
          response.data.pipe(res);
        }
      } catch (error: any) {
        logger(`Error fetching TS file ${decodedPath}: ${error.message}`, 'error');
        res.status(500).send(`Error fetching video segment: ${error.message}`);
      }
    } else {
      logger(`Unsupported media type: ${decodedPath}`, 'error');
      return res.status(400).send("Unsupported media type");
    }
  } catch (error: any) {
    logger(`Error processing media request: ${error.message}`, 'error');
    res.status(500).send(`Error processing media: ${error.message}`);
  }
});

// Add cache clearing endpoint
streamProxyRouter.get('/clear-cache', (req: Request, res: Response) => {
  try {
    m3u8Cache.flushAll();
    tsCache.flushAll();
    urlCache.flushAll();
    logger('Cache cleared', 'info');
    res.json({ success: true });
  } catch (error: any) {
    logger(`Error clearing cache: ${error.message}`, 'error');
    res.json({ success: false, error: error.message });
  }
});

export { streamProxyRouter };