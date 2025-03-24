import express from 'express';
import * as videoController from '../controllers/videoController';
const videoRouter = express.Router();

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
videoRouter.get('/', videoController.getAllVideos);

/**
 * @swagger
 * /api/videos/category/{categoryId}:
 *   get:
 *     summary: Get videos by category
 *     description: Retrieves all videos belonging to a specific category
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
 *         description: List of videos retrieved successfully
 *       500:
 *         description: Server error
 */
videoRouter.get('/category/:categoryId', videoController.getVideosByCategory);

/**
 * @swagger
 * /api/videos/tag/{tagId}:
 *   get:
 *     summary: Get videos by tag
 *     description: Retrieves all videos associated with a specific tag
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
 *         description: List of videos retrieved successfully
 *       500:
 *         description: Server error
 */
videoRouter.get('/tag/:tagId', videoController.getVideosByTag);

/**
 * @swagger
 * /api/videos/playlist/{playlistId}:
 *   get:
 *     summary: Get videos by playlist
 *     description: Retrieves all videos belonging to a specific playlist
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
 *         description: List of videos retrieved successfully
 *       500:
 *         description: Server error
 */
videoRouter.get('/playlist/:playlistId', videoController.getVideosByPlaylistId);

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
videoRouter.get('/:videoId', videoController.getVideo);

/**
 * @swagger
 * /api/videos/{videoId}:
 *   put:
 *     summary: Update a video
 *     description: Updates a video with the provided data
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
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the video
 *               description:
 *                 type: string
 *                 description: Description of the video
 *               url:
 *                 type: string
 *                 description: The URL of the video
 *               thumbnail:
 *                 type: string
 *                 description: The thumbnail URL of the video
 *               categories:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Array of category IDs
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Array of tag IDs
 *     responses:
 *       200:
 *         description: Video updated successfully
 *       404:
 *         description: Video not found
 *       500:
 *         description: Server error
 */
videoRouter.put('/:videoId', videoController.updateVideo);

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
videoRouter.delete('/:videoId', videoController.deleteVideo);

/**
 * @swagger
 * /api/videos/{videoId}/views:
 *   put:
 *     summary: Increment video views
 *     description: Increments the view count for a specific video
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
 *         description: View count incremented successfully
 *       404:
 *         description: Video not found
 *       500:
 *         description: Server error
 */
videoRouter.put('/:videoId/views', videoController.incrementViews);

/**
 * @swagger
 * /api/videos/{videoId}/loves:
 *   put:
 *     summary: Increment video loves
 *     description: Increments the love/like count for a specific video
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
 *         description: Love count incremented successfully
 *       404:
 *         description: Video not found
 *       500:
 *         description: Server error
 */
videoRouter.put('/:videoId/loves', videoController.incrementLoves);

export default videoRouter;