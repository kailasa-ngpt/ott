import express from 'express';
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
 * @route   GET api/playlists/:playlistId
 * @desc    Get playlist by ID
 * @access  Public
 * @param {string} playlistId.path.required - Playlist ID
 * @returns {Object} 200 - Playlist object
 * @returns {Error} 404 - Playlist not found
 * @returns {Error} 500 - Server error
 */

router.get('/:playlistId', playlistController.getPlaylist);

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
 * @route   PUT api/playlists/:playlistId
 * @desc    Update playlist
 * @access  Private (to be implemented with auth)
 * @param {string} playlistId.path.required - Playlist ID
 * @param {Object} request.body.required - Updated playlist object
 * @returns {Object} 200 - Updated playlist object
 * @returns {Error} 404 - Playlist not found
 * @returns {Error} 500 - Server error
 */

router.put('/:playlistId', playlistController.updatePlaylist);

/**
 * @route   DELETE api/playlists/:playlistId
 * @desc    Delete playlist
 * @access  Private (to be implemented with auth)
 * @param {string} playlistId.path.required - Playlist ID
 * @returns {Object} 200 - Success message
 * @returns {Error} 404 - Playlist not found
 * @returns {Error} 500 - Server error
 */

router.delete('/:playlistId', playlistController.deletePlaylist);

/**
 * @route   PUT api/playlists/:playlistId/videos/:videoId
 * @desc    Add video to playlist
 * @access  Private (to be implemented with auth)
 * @param {string} playlistId.path.required - Playlist ID
 * @param {string} videoId.path.required - Video ID
 * @returns {Object} 200 - Updated playlist object
 * @returns {Error} 404 - Playlist or Video not found
 * @returns {Error} 500 - Server error
 */

router.put('/:playlistId/videos/:videoId', playlistController.addVideoToPlaylist);

/**
 * @route   DELETE api/playlists/:playlistId/videos/:videoId
 * @desc    Remove video from playlist
 * @access  Private (to be implemented with auth)
 * @param {string} playlistId.path.required - Playlist ID
 * @param {string} videoId.path.required - Video ID
 * @returns {Object} 200 - Updated playlist object
 * @returns {Error} 404 - Playlist or Video not found
 * @returns {Error} 500 - Server error
 */

router.delete('/:playlistId/videos/:videoId', playlistController.removeVideoFromPlaylist);

export default router;
