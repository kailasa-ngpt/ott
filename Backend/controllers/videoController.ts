import { Request, Response } from 'express';
import { videoService } from '../services/videoService';

// Get all videos
export const getAllVideos = async (req: Request, res: Response): Promise<void> => {
    try {
        const videos = await videoService.getAllVideos();
        res.json(videos);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching videos' });
    }
};

// Get a single video
export const getVideoById = async (req: Request, res: Response): Promise<void> => {
    try {
        const video = await videoService.getVideoById(req.params.id);
        if (!video) {
            res.status(404).json({ message: 'Video not found' });
            return;
        }
        res.json(video);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching video' });
    }
};

// Create a new video
export const createVideo = async (req: Request, res: Response): Promise<void> => {
    try {
        const video = await videoService.createVideo(req.body);
        res.status(201).json(video);
    } catch (error) {
        res.status(500).json({ message: 'Error creating video' });
    }
};

// Update a video
export const updateVideo = async (req: Request, res: Response): Promise<void> => {
    try {
        const video = await videoService.updateVideo(req.params.id, req.body);
        if (!video) {
            res.status(404).json({ message: 'Video not found' });
            return;
        }
        res.json(video);
    } catch (error) {
        res.status(500).json({ message: 'Error updating video' });
    }
};

// Delete a video
export const deleteVideo = async (req: Request, res: Response): Promise<void> => {
    try {
        const deleted = await videoService.deleteVideo(req.params.id);
        if (!deleted) {
            res.status(404).json({ message: 'Video not found' });
            return;
        }
        res.json({ message: 'Video deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting video' });
    }
};

// Get videos by category
export const getVideosByCategory = async (req: Request, res: Response): Promise<void> => {
    try {
        const videos = await videoService.getVideosByCategory(req.params.categoryId);
        res.json(videos);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching videos by category' });
    }
};

// Get videos by tag
export const getVideosByTag = async (req: Request, res: Response): Promise<void> => {
    try {
        const videos = await videoService.getVideosByTag(req.params.tagId);
        res.json(videos);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching videos by tag' });
    }
};

// Get videos by playlist
export const getVideosByPlaylist = async (req: Request, res: Response): Promise<void> => {
    try {
        const videos = await videoService.getVideosByPlaylist(req.params.playlistId);
        res.json(videos);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching videos by playlist' });
    }
};

// Increment video views
export const incrementViews = async (req: Request, res: Response): Promise<void> => {
    try {
        const video = await videoService.incrementViews(req.params.videoId);
        if (!video) {
            res.status(404).json({ message: 'Video not found' });
            return;
        }
        res.json(video);
    } catch (error) {
        res.status(500).json({ message: 'Error incrementing views' });
    }
};

// Increment video loves
export const incrementLoves = async (req: Request, res: Response): Promise<void> => {
    try {
        const video = await videoService.incrementLoves(req.params.videoId);
        if (!video) {
            res.status(404).json({ message: 'Video not found' });
            return;
        }
        res.json(video);
    } catch (error) {
        res.status(500).json({ message: 'Error incrementing loves' });
    }
};

