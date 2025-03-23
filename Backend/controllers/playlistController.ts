import { Request, Response } from 'express';
import { playlistService } from '../services/playlistService';
import { videoService } from '../services/videoService';

// Get all playlists
export const getAllPlaylists = async (req: Request, res: Response): Promise<void> => {
    try {
        const playlists = await playlistService.getAllPlaylists();
        
        res.status(200).json({
            success: true,
            count: playlists.length,
            data: playlists
        });
    } catch (error: any) {
        console.error('Controller error:', error);
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};

// Get a single playlist
export const getPlaylist = async (req: Request, res: Response): Promise<void> => {
    try {
        const playlist = await playlistService.getPlaylist(req.params.playlistId);
        
        res.status(200).json({
            success: true,
            data: playlist
        });
    } catch (error: any) {
        console.error('Controller error:', error);
        
        if (error.message && error.message.includes('not found')) {
            res.status(404).json({
                success: false,
                error: 'Playlist not found'
            });
            return;
        }
        
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};

// Create a new playlist
export const createPlaylist = async (req: Request, res: Response): Promise<void> => {
    try {
        const playlist = await playlistService.createPlaylist(req.body);
        
        res.status(201).json({
            success: true,
            data: playlist
        });
    } catch (error: any) {
        console.error('Controller error:', error);
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};

// Update a playlist
export const updatePlaylist = async (req: Request, res: Response): Promise<void> => {
    try {
        const playlist = await playlistService.updatePlaylist(
            req.params.playlistId, 
            req.body
        );
        
        res.status(200).json({
            success: true,
            data: playlist
        });
    } catch (error: any) {
        console.error('Controller error:', error);
        
        if (error.message && error.message.includes('not found')) {
            res.status(404).json({
                success: false,
                error: 'Playlist not found'
            });
            return;
        }
        
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};

// Delete a playlist
export const deletePlaylist = async (req: Request, res: Response): Promise<void> => {
    try {
        const success = await playlistService.deletePlaylist(req.params.playlistId);
        
        if (!success) {
            res.status(404).json({
                success: false,
                error: 'Playlist not found'
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

// Add a video to a playlist
export const addVideoToPlaylist = async (req: Request, res: Response): Promise<void> => {
    try {
        const { playlistId, videoId } = req.params;
        
        const playlist = await playlistService.addVideoToPlaylist(playlistId, videoId);
        
        res.status(200).json({
            success: true,
            data: playlist
        });
    } catch (error: any) {
        console.error('Controller error:', error);
        
        if (error.message && error.message.includes('not found')) {
            res.status(404).json({
                success: false,
                error: 'Playlist or Video not found'
            });
            return;
        }
        
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};

// Remove a video from a playlist
export const removeVideoFromPlaylist = async (req: Request, res: Response): Promise<void> => {
    try {
        const { playlistId, videoId } = req.params;
        
        const playlist = await playlistService.removeVideoFromPlaylist(playlistId, videoId);
        
        res.status(200).json({
            success: true,
            data: playlist
        });
    } catch (error: any) {
        console.error('Controller error:', error);
        
        if (error.message && error.message.includes('not found')) {
            res.status(404).json({
                success: false,
                error: 'Playlist or Video not found'
            });
            return;
        }
        
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};

/**
 * Returns all playlists plus their full video objects
 */
export const getAllVideosByPlaylists = async (req: Request, res: Response): Promise<void> => {
    try {
        const playlists = await playlistService.getAllPlaylists();
        
        const results = [];

        for (const playlist of playlists) {
            const videoObjects = [];
            for (const videoId of playlist.videos) {
                const video = await videoService.getVideo(videoId);
                videoObjects.push(video);
            }
            results.push({
                playlist,
                videos: videoObjects
            });
        }

        res.status(200).json({
            success: true,
            data: results
        });
    } catch (error: any) {
        console.error('Controller error:', error);
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};