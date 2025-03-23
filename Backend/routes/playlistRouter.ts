import express from 'express';
import * as playlistController from '../controllers/playlistController';

const playlistRouter = express.Router();

/**
 * @swagger
 * /api/playlists:
 *   get:
 *     summary: Get all playlists
 *     description: Retrieves a list of all playlists
 *     tags: [Playlists]
 *     responses:
 *       200:
 *         description: List of playlists retrieved successfully
 *       500:
 *         description: Server error
 */
playlistRouter.get('/', playlistController.getAllPlaylists);

/**
 * @swagger
 * /api/playlists/{playlistId}:
 *   get:
 *     summary: Get a single playlist
 *     description: Retrieves a playlist by its ID
 *     tags: [Playlists]
 *     parameters:
 *       - in: path
 *         name: playlistId
 *         required: true
 *         schema:
 *           type: string
 *         description: The playlist ID
 *     responses:
 *       200:
 *         description: Playlist retrieved successfully
 *       404:
 *         description: Playlist not found
 *       500:
 *         description: Server error
 */
playlistRouter.get('/:playlistId', playlistController.getPlaylist);

/**
 * @swagger
 * /api/playlists:
 *   post:
 *     summary: Create a new playlist
 *     description: Creates a new playlist with the provided data
 *     tags: [Playlists]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the playlist
 *               description:
 *                 type: string
 *                 description: Description of the playlist
 *     responses:
 *       201:
 *         description: Playlist created successfully
 *       500:
 *         description: Server error
 */
playlistRouter.post('/', playlistController.createPlaylist);

/**
 * @swagger
 * /api/playlists/{playlistId}:
 *   put:
 *     summary: Update a playlist
 *     description: Updates a playlist with the provided data
 *     tags: [Playlists]
 *     parameters:
 *       - in: path
 *         name: playlistId
 *         required: true
 *         schema:
 *           type: string
 *         description: The playlist ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the playlist
 *               description:
 *                 type: string
 *                 description: Description of the playlist
 *     responses:
 *       200:
 *         description: Playlist updated successfully
 *       404:
 *         description: Playlist not found
 *       500:
 *         description: Server error
 */
playlistRouter.put('/:playlistId', playlistController.updatePlaylist);

/**
 * @swagger
 * /api/playlists/{playlistId}:
 *   delete:
 *     summary: Delete a playlist
 *     description: Deletes a playlist by its ID
 *     tags: [Playlists]
 *     parameters:
 *       - in: path
 *         name: playlistId
 *         required: true
 *         schema:
 *           type: string
 *         description: The playlist ID
 *     responses:
 *       200:
 *         description: Playlist deleted successfully
 *       404:
 *         description: Playlist not found
 *       500:
 *         description: Server error
 */
playlistRouter.delete('/:playlistId', playlistController.deletePlaylist);

/**
 * @swagger
 * /api/playlists/{playlistId}/videos/{videoId}:
 *   put:
 *     summary: Add a video to a playlist
 *     description: Adds a video to the specified playlist
 *     tags: [Playlists]
 *     parameters:
 *       - in: path
 *         name: playlistId
 *         required: true
 *         schema:
 *           type: string
 *         description: The playlist ID
 *       - in: path
 *         name: videoId
 *         required: true
 *         schema:
 *           type: string
 *         description: The video ID to add
 *     responses:
 *       200:
 *         description: Video added to playlist successfully
 *       404:
 *         description: Playlist or video not found
 *       500:
 *         description: Server error
 */
playlistRouter.put('/:playlistId/videos/:videoId', playlistController.addVideoToPlaylist);

/**
 * @swagger
 * /api/playlists/{playlistId}/videos/{videoId}:
 *   delete:
 *     summary: Remove a video from a playlist
 *     description: Removes a video from the specified playlist
 *     tags: [Playlists]
 *     parameters:
 *       - in: path
 *         name: playlistId
 *         required: true
 *         schema:
 *           type: string
 *         description: The playlist ID
 *       - in: path
 *         name: videoId
 *         required: true
 *         schema:
 *           type: string
 *         description: The video ID to remove
 *     responses:
 *       200:
 *         description: Video removed from playlist successfully
 *       404:
 *         description: Playlist or video not found
 *       500:
 *         description: Server error
 */
playlistRouter.delete('/:playlistId/videos/:videoId', playlistController.removeVideoFromPlaylist);

/**
 * @swagger
 * /api/playlists/all-videos:
 *   get:
 *     summary: Get all playlists with their videos
 *     description: Retrieves all playlists along with their video details
 *     tags: [Playlists]
 *     responses:
 *       200:
 *         description: Playlists with videos retrieved successfully
 *       500:
 *         description: Server error
 */
playlistRouter.get('/all-videos', playlistController.getAllVideosByPlaylists);

export default playlistRouter;