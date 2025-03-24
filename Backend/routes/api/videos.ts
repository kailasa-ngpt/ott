import express from 'express';
import * as videoController from '../../controllers/videoController';

const router = express.Router();

/**
 * @route   GET api/videos
 * @desc    Get all videos
 * @access  Public
 * @returns {Object} 200 - An array of videos
 * @returns {Error} 500 - Server error
 */

router.get('/', videoController.getAllVideos);

/**
 * @route   GET api/videos/category/:categoryId
 * @desc    Get videos by category
 * @access  Public
 * @param {string} categoryId.path.required - Category ID
 * @returns {Object} 200 - An array of videos
 * @returns {Error} 500 - Server error
 */

router.get('/category/:categoryId', videoController.getVideosByCategory);

/**
 * @route   GET api/videos/tag/:tagId
 * @desc    Get videos by tag
 * @access  Public
 * @param {string} tagId.path.required - Tag ID
 * @returns {Object} 200 - An array of videos
 * @returns {Error} 500 - Server error
 */

router.get('/tag/:tagId', videoController.getVideosByTag);

/**
 * @route   GET api/videos/:videoId
 * @desc    Get video by ID
 * @access  Public
 * @param {string} videoId.path.required - Video ID
 * @returns {Object} 200 - Video object
 * @returns {Error} 404 - Video not found
 * @returns {Error} 500 - Server error
 */

router.get('/:videoId', videoController.getVideo);

/**
 * @route   PUT api/videos/:videoId
 * @desc    Update video
 * @access  Private (to be implemented with auth)
 * @param {string} videoId.path.required - Video ID
 * @param {Object} request.body.required - Updated video object
 * @returns {Object} 200 - Updated video object
 * @returns {Error} 404 - Video not found
 * @returns {Error} 500 - Server error
 */

router.put('/:videoId', videoController.updateVideo);

/**
 * @route   DELETE api/videos/:videoId
 * @desc    Delete video
 * @access  Private (to be implemented with auth)
 * @param {string} videoId.path.required - Video ID
 * @returns {Object} 200 - Success message
 * @returns {Error} 404 - Video not found
 * @returns {Error} 500 - Server error
 */

router.delete('/:videoId', videoController.deleteVideo);

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
