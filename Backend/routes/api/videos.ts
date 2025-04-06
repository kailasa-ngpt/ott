import express from 'express';
import * as videoController from '../../controllers/videoController';

const router = express.Router();

/**
 * @swagger
 * /api/videos:
 *   get:
 *     summary: Get all videos
 *     description: Retrieves a list of all videos
 *     tags: [Videos]
 *     responses:
 *       200:
 *         description: List of videos retrieved successfully
 *       500:
 *         description: Server error
 */
router.get('/', videoController.getAllVideos);

/**
 * @swagger
 * /api/videos/{videoId}:
 *   get:
 *     summary: Get a single video
 *     description: Retrieves a video by its ID
 *     tags: [Videos]
 *     parameters:
 *       - in: path
 *         name: videoId
 *         required: true
 *         schema:
 *           type: string
 *         description: The video ID
 *     responses:
 *       200:
 *         description: Video retrieved successfully
 *       404:
 *         description: Video not found
 *       500:
 *         description: Server error
 */
router.get('/:id', videoController.getVideoById);

/**
 * @swagger
 * /api/videos:
 *   post:
 *     summary: Create a new video
 *     description: Creates a new video entry
 *     tags: [Videos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - title
 *               - description
 *               - videoUrl
 *               - thumbnailUrl
 *               - uploadDate
 *               - categories
 *               - viewStatus
 *               - videoLength
 *               - tags
 *     responses:
 *       201:
 *         description: Video created successfully
 *       500:
 *         description: Server error
 */
router.post('/', videoController.createVideo);

/**
 * @swagger
 * /api/videos/{videoId}:
 *   put:
 *     summary: Update a video
 *     description: Updates an existing video
 *     tags: [Videos]
 *     parameters:
 *       - in: path
 *         name: videoId
 *         required: true
 *         schema:
 *           type: string
 *         description: The video ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Video updated successfully
 *       404:
 *         description: Video not found
 *       500:
 *         description: Server error
 */
router.put('/:id', videoController.updateVideo);

/**
 * @swagger
 * /api/videos/{videoId}:
 *   delete:
 *     summary: Delete a video
 *     description: Deletes a video by its ID
 *     tags: [Videos]
 *     parameters:
 *       - in: path
 *         name: videoId
 *         required: true
 *         schema:
 *           type: string
 *         description: The video ID
 *     responses:
 *       200:
 *         description: Video deleted successfully
 *       404:
 *         description: Video not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', videoController.deleteVideo);

/**
 * @swagger
 * /api/videos/category/{categoryId}:
 *   get:
 *     summary: Get videos by category
 *     description: Retrieves videos that belong to a specific category
 *     tags: [Videos]
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: string
 *         description: The category ID
 *     responses:
 *       200:
 *         description: Videos retrieved successfully
 *       500:
 *         description: Server error
 */
router.get('/category/:categoryId', videoController.getVideosByCategory);

/**
 * @swagger
 * /api/videos/tag/{tagId}:
 *   get:
 *     summary: Get videos by tag
 *     description: Retrieves videos that have a specific tag
 *     tags: [Videos]
 *     parameters:
 *       - in: path
 *         name: tagId
 *         required: true
 *         schema:
 *           type: string
 *         description: The tag ID
 *     responses:
 *       200:
 *         description: Videos retrieved successfully
 *       500:
 *         description: Server error
 */
router.get('/tag/:tagId', videoController.getVideosByTag);

/**
 * @swagger
 * /api/videos/playlist/{playlistId}:
 *   get:
 *     summary: Get videos by playlist
 *     description: Retrieves videos that belong to a specific playlist
 *     tags: [Videos]
 *     parameters:
 *       - in: path
 *         name: playlistId
 *         required: true
 *         schema:
 *           type: string
 *         description: The playlist ID
 *     responses:
 *       200:
 *         description: Videos retrieved successfully
 *       500:
 *         description: Server error
 */
router.get('/playlist/:playlistId', videoController.getVideosByPlaylist);

/**
 * @route   PUT api/videos/:videoId/views
 * @desc    Increment video views
 * @access  Public
 * @param {string} videoId.path.required - Video ID
 * @returns {Object} 200 - Updated video object
 * @returns {Error} 404 - Video not found
 * @returns {Error} 500 - Server error
 */

router.put('/:videoId/views', videoController.incrementViews);

/**
 * @route   PUT api/videos/:videoId/loves
 * @desc    Increment video loves
 * @access  Public
 * @param {string} videoId.path.required - Video ID
 * @returns {Object} 200 - Updated video object
 * @returns {Error} 404 - Video not found
 * @returns {Error} 500 - Server error
 */

router.put('/:videoId/loves', videoController.incrementLoves);

export default router;
