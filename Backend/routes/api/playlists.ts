// Backend/routes/api/playlists.ts
import express from 'express';
import * as playlistController from '../../controllers/playlistController';

const router = express.Router();

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
router.get('/', playlistController.getAllPlaylists);

/**
 * @swagger
 * /api/playlists/getPlaylistsByIds:
 *   get:
 *     summary: Get multiple playlists by their IDs
 *     tags: [Playlists]
 *     parameters:
 *       - in: query
 *         name: ids
 *         required: true
 *         schema:
 *           type: string
 *         description: Comma-separated list of playlist IDs
 *     responses:
 *       200:
 *         description: List of playlists
 *       400:
 *         description: Invalid playlist IDs provided
 *       500:
 *         description: Server error
 */
router.get('/getPlaylistsByIds', playlistController.getPlaylistsByIds);

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
router.get('/all-videos', playlistController.getAllVideosByPlaylists);

/**
 * @swagger
 * /api/playlists/{id}:
 *   get:
 *     summary: Get a single playlist
 *     description: Retrieves a playlist by its ID
 *     tags: [Playlists]
 *     parameters:
 *       - in: path
 *         name: id
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
router.get('/:id', playlistController.getPlaylist);

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
 *               - id
 *               - name
 *             properties:
 *               id:
 *                 type: string
 *                 description: The ID of the playlist
 *               name:
 *                 type: string
 *                 description: The name of the playlist
 *               description:
 *                 type: string
 *                 description: Description of the playlist
 *               thumbnailPath:
 *                 type: string
 *                 description: Path to playlist thumbnail
 *               videos:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Array of video IDs
 *               createdDate:
 *                 type: string
 *                 format: date-time
 *                 description: Creation date (ISO string)
 *               updatedDate:
 *                 type: string
 *                 format: date-time
 *                 description: Last update date (ISO string)
 *     responses:
 *       201:
 *         description: Playlist created successfully
 *       400:
 *         description: Invalid input data
 *       500:
 *         description: Server error
 */
router.post('/', playlistController.createPlaylist);

/**
 * @swagger
 * /api/playlists/{id}:
 *   put:
 *     summary: Update a playlist
 *     description: Updates a playlist with the provided data
 *     tags: [Playlists]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The playlist ID
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               thumbnailPath:
 *                 type: string
 *     responses:
 *       200:
 *         description: Playlist updated successfully
 *       404:
 *         description: Playlist not found
 *       500:
 *         description: Server error
 */
router.put('/:id', playlistController.updatePlaylist);

/**
 * @swagger
 * /api/playlists/{id}:
 *   delete:
 *     summary: Delete a playlist
 *     description: Deletes a playlist by its ID
 *     tags: [Playlists]
 *     parameters:
 *       - in: path
 *         name: id
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
router.delete('/:id', playlistController.deletePlaylist);

/**
 * @swagger
 * /api/playlists/{id}/videos:
 *   post:
 *     summary: Add videos to a playlist
 *     description: Adds one or more videos to the specified playlist
 *     tags: [Playlists]
 *     parameters:
 *       - in: path
 *         name: id
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
 *             required:
 *               - video
 *             properties:
 *               video:
 *                 type: object
 *                 required:
 *                   - id
 *                 properties:
 *                   id:
 *                     oneOf:
 *                       - type: string
 *                         description: Single video ID or comma-separated video IDs
 *                       - type: array
 *                         items:
 *                           type: string
 *                         description: Array of video IDs
 *     responses:
 *       200:
 *         description: Videos added to playlist successfully
 *       404:
 *         description: Playlist or video not found
 *       500:
 *         description: Server error
 */
router.post('/:id/videos', playlistController.addVideoToPlaylist);

/**
 * @swagger
 * /api/playlists/{id}/videos/{videoId}:
 *   delete:
 *     summary: Remove a video from a playlist
 *     description: Removes a video from the specified playlist
 *     tags: [Playlists]
 *     parameters:
 *       - in: path
 *         name: id
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
router.delete('/:id/videos/:videoId', playlistController.removeVideoFromPlaylist);

export default router;