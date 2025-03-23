import express from 'express';
import { uploadToR2, getFromR2 } from '../controllers/cloudFlareR2Controller';

const router = express.Router();

/**
 * @swagger
 * /api/v1/r2/upload:
 *   post:
 *     summary: Upload a file to Cloudflare R2 storage
 *     description: Uploads a file with the specified key to Cloudflare R2 bucket.
 *     tags: [Storage]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - key
 *               - body
 *             properties:
 *               key:
 *                 type: string
 *                 description: The key (path) where the file will be stored
 *               body:
 *                 type: string
 *                 format: binary
 *                 description: The file content to upload
 *     responses:
 *       200:
 *         description: File uploaded successfully
 *       500:
 *         description: Server error during upload
 */
router.post('/upload', uploadToR2);

/**
 * @swagger
 * /api/v1/r2/file/{key}:
 *   get:
 *     summary: Get a file from Cloudflare R2 storage
 *     description: Retrieves a file with the specified key from Cloudflare R2 bucket.
 *     tags: [Storage]
 *     parameters:
 *       - in: path
 *         name: key
 *         required: true
 *         schema:
 *           type: string
 *         description: The key (path) of the file to retrieve
 *     responses:
 *       200:
 *         description: File retrieved successfully
 *       500:
 *         description: Server error while retrieving file
 */
router.get('/file/:key', getFromR2);

export default router;