import express, { Request, Response } from 'express';
import * as playlistController from '../../controllers/playlistController';

const router = express.Router();

/**
 * @route   GET api/playlists
 * @desc    Get all playlists
 * @access  Public
 * @returns {Object} 200 - An array of playlists
 * @returns {Error} 500 - Server error
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
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Playlist'
 *       400:
 *         description: Invalid playlist IDs provided
 *       500:
 *         description: Server error
 */

router.get('/getPlaylistsByIds', playlistController.getPlaylistsByIds);

/**
 * @route   GET api/playlists/:id
 * @desc    Get playlist by ID
 * @access  Public
 * @param {string} id.path.required - Playlist ID
 * @returns {Object} 200 - Playlist object
 * @returns {Error} 404 - Playlist not found
 * @returns {Error} 500 - Server error
 */

router.get('/:id', playlistController.getPlaylist);

/**
 * @route   POST api/playlists
 * @desc    Create a new playlist
 * @access  Private (to be implemented with auth)
 * @param {Object} request.body.required - Playlist object
 * @returns {Object} 201 - Created playlist object
 * @returns {Error} 500 - Server error
 */

router.post('/', playlistController.createPlaylist);

/**
 * @route   PUT api/playlists/:id
 * @desc    Update playlist
 * @access  Private (to be implemented with auth)
 * @param {string} id.path.required - Playlist ID
 * @param {Object} request.body.required - Updated playlist object
 * @returns {Object} 200 - Updated playlist object
 * @returns {Error} 404 - Playlist not found
 * @returns {Error} 500 - Server error
 */

router.put('/:id', playlistController.updatePlaylist);

/**
 * @route   DELETE api/playlists/:id
 * @desc    Delete playlist
 * @access  Private (to be implemented with auth)
 * @param {string} id.path.required - Playlist ID
 * @returns {Object} 200 - Success message
 * @returns {Error} 404 - Playlist not found
 * @returns {Error} 500 - Server error
 */

router.delete('/:id', playlistController.deletePlaylist);

/**
 * @route   POST api/playlists/:id/videos
 * @desc    Add video to playlist
 * @access  Private (to be implemented with auth)
 * @param {string} id.path.required - Playlist ID
 * @param {Object} request.body.required - Video ID
 * @returns {Object} 200 - Updated playlist object
 * @returns {Error} 404 - Playlist not found
 * @returns {Error} 500 - Server error
 */

router.post('/:id/videos', playlistController.addVideoToPlaylist);

/**
 * @route   DELETE api/playlists/:id/videos/:videoId
 * @desc    Remove video from playlist
 * @access  Private (to be implemented with auth)
 * @param {string} id.path.required - Playlist ID
 * @param {string} videoId.path.required - Video ID
 * @returns {Object} 200 - Updated playlist object
 * @returns {Error} 404 - Playlist not found
 * @returns {Error} 500 - Server error
 */

router.delete('/:id/videos/:videoId', playlistController.removeVideoFromPlaylist);

export default router;
