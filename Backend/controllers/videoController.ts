import { Request, Response } from 'express';
import { videoService } from '../services/videoService';

// Get all videos
export const getAllVideos = async (req: Request, res: Response): Promise<void> => {
    try {
        const videos = await videoService.getAllVideos();
        
        res.status(200).json({
            success: true,
            count: videos.length,
            data: videos
        });
    } catch (error: any) {
        console.error('Controller error:', error);
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};

// Get a single video
export const getVideo = async (req: Request, res: Response): Promise<void> => {
    try {
        const video = await videoService.getVideo(req.params.videoId);
        
        res.status(200).json({
            success: true,
            data: video
        });
    } catch (error: any) {
        console.error('Controller error:', error);
        
        if (error.message && error.message.includes('not found')) {
            res.status(404).json({
                success: false,
                error: 'Video not found'
            });
            return;
        }
        
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};

// Create a new video
export const createVideo = async (req: Request, res: Response): Promise<void> => {
    try {
        const video = await videoService.createVideo(req.body);
        
        res.status(201).json({
            success: true,
            data: video
        });
    } catch (error: any) {
        console.error('Controller error:', error);
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};

// Update a video
export const updateVideo = async (req: Request, res: Response): Promise<void> => {
    try {
        const video = await videoService.updateVideo(req.params.videoId, req.body);
        
        res.status(200).json({
            success: true,
            data: video
        });
    } catch (error: any) {
        console.error('Controller error:', error);
        
        if (error.message && error.message.includes('not found')) {
            res.status(404).json({
                success: false,
                error: 'Video not found'
            });
            return;
        }
        
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};

// Delete a video
export const deleteVideo = async (req: Request, res: Response): Promise<void> => {
    try {
        const success = await videoService.deleteVideo(req.params.videoId);
        
        if (!success) {
            res.status(404).json({
                success: false,
                error: 'Video not found'
            });
            return;
        }
        
        res.status(200).json({
            success: true,
            data: {}
        });
    } catch (error: any) {
        console.error('Controller error:', error);
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};

// Increment video views
export const incrementViews = async (req: Request, res: Response): Promise<void> => {
    try {
        const video = await videoService.incrementViews(req.params.videoId);
        
        res.status(200).json({
            success: true,
            data: video
        });
    } catch (error: any) {
        console.error('Controller error:', error);
        
        if (error.message && error.message.includes('not found')) {
            res.status(404).json({
                success: false,
                error: 'Video not found'
            });
            return;
        }
        
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};

// Increment video loves (likes)
export const incrementLoves = async (req: Request, res: Response): Promise<void> => {
    try {
        const video = await videoService.incrementLoves(req.params.videoId);
        
        res.status(200).json({
            success: true,
            data: video
        });
    } catch (error: any) {
        console.error('Controller error:', error);
        
        if (error.message && error.message.includes('not found')) {
            res.status(404).json({
                success: false,
                error: 'Video not found'
            });
            return;
        }
        
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};

// Get videos by category
export const getVideosByCategory = async (req: Request, res: Response): Promise<void> => {
    try {
        const videos = await videoService.getVideosByCategory(req.params.categoryId);
        
        res.status(200).json({
            success: true,
            count: videos.length,
            data: videos
        });
    } catch (error: any) {
        console.error('Controller error:', error);
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};

// Get videos by tag
export const getVideosByTag = async (req: Request, res: Response): Promise<void> => {
    try {
        const videos = await videoService.getVideosByTag(req.params.tagId);
        
        res.status(200).json({
            success: true,
            count: videos.length,
            data: videos
        });
    } catch (error: any) {
        console.error('Controller error:', error);
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};

// Get videos by playlist
export const getVideosByPlaylistId = async (req: Request, res: Response): Promise<void> => {
    try {
        const videos = await videoService.getVideosByPlaylistId(req.params.playlistId);
        
        res.status(200).json({
            success: true,
            count: videos.length,
            data: videos
        });
    } catch (error: any) {
        console.error('Controller error:', error);
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};