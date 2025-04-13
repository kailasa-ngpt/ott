// Backend/controllers/playlistController.ts
import { Request, Response } from 'express';
import * as playlistService from '../services/playlistService';

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
        const playlist = await playlistService.getPlaylistById(req.params.id);

        if (!playlist) {
            res.status(404).json({
                success: false,
                error: 'Playlist not found'
            });
            return;
        }

        res.status(200).json({
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

// Create a new playlist
export const createPlaylist = async (req: Request, res: Response): Promise<void> => {
    try {
        console.log('Creating playlist with data:', req.body);

        // Validate required fields
        if (!req.body.id || !req.body.name) {
            res.status(400).json({
                success: false,
                error: 'Please provide id and name fields'
            });
            return;
        }

        // Create playlist with provided data
        const playlist = await playlistService.createPlaylist({
            id: req.body.id,
            name: req.body.name,
            description: req.body.description || '',
            thumbnailPath: req.body.thumbnailPath || '',
            videos: req.body.videos || [],
            createdDate: req.body.createdDate || new Date().toISOString(),
            updatedDate: req.body.updatedDate || new Date().toISOString()
        });

        res.status(201).json({
            success: true,
            data: playlist
        });
    } catch (error: any) {
        console.error('Controller error:', error);

        // Handle duplicate key error
        if (error.code === 11000) {
            res.status(400).json({
                success: false,
                error: 'A playlist with this ID already exists'
            });
            return;
        }

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
            req.params.id,
            req.body
        );

        if (!playlist) {
            res.status(404).json({
                success: false,
                error: 'Playlist not found'
            });
            return;
        }

        res.status(200).json({
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

// Delete a playlist
export const deletePlaylist = async (req: Request, res: Response): Promise<void> => {
    try {
        const success = await playlistService.deletePlaylist(req.params.id);

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

// Add videos to playlist
export const addVideoToPlaylist = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { video } = req.body;

        if (!video) {
            res.status(400).json({
                success: false,
                error: 'Please provide video data'
            });
            return;
        }

        let playlist;

        // Check if multiple video IDs are provided as a comma-separated string
        if (typeof video.id === 'string' && video.id.includes(',')) {
            const videoIds = video.id.split(',').map((id: string) => id.trim());
            playlist = await playlistService.addVideosToPlaylist(id, videoIds);
        }
        // Check if it's an array of video IDs
        else if (Array.isArray(video.id)) {
            playlist = await playlistService.addVideosToPlaylist(id, video.id);
        }
        // Single video ID
        else {
            playlist = await playlistService.addVideoToPlaylist(id, video.id);
        }

        if (!playlist) {
            res.status(404).json({
                success: false,
                error: 'Playlist not found'
            });
            return;
        }

        res.status(200).json({
            success: true,
            data: playlist
        });
    } catch (error: any) {
        console.error('Controller error:', error);

        // Handle video not found error
        if (error.message && error.message.includes('not found')) {
            res.status(404).json({
                success: false,
                error: error.message
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
        const { id, videoId } = req.params;

        const playlist = await playlistService.removeVideoFromPlaylist(id, videoId);

        if (!playlist) {
            res.status(404).json({
                success: false,
                error: 'Playlist not found'
            });
            return;
        }

        res.status(200).json({
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

// Get playlists by IDs
export const getPlaylistsByIds = async (req: Request, res: Response): Promise<void> => {
    try {
        const { ids } = req.query;

        if (!ids) {
            res.status(400).json({
                success: false,
                error: 'No playlist IDs provided'
            });
            return;
        }

        // Convert comma-separated string to array and ensure string type
        const idArray = (typeof ids === 'string' ? ids.split(',') : ids) as string[];

        if (!Array.isArray(idArray)) {
            res.status(400).json({
                success: false,
                error: 'Invalid playlist IDs format'
            });
            return;
        }

        const playlists = await playlistService.getPlaylistsByIds(idArray);
        res.status(200).json({
            success: true,
            count: playlists.length,
            data: playlists
        });
    } catch (error) {
        console.error('Error in getPlaylistsByIds:', error);
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};

// Get all playlists with populated video data
export const getAllVideosByPlaylists = async (req: Request, res: Response): Promise<void> => {
    try {
        const populatedPlaylists = await playlistService.getPopulatedPlaylists();

        res.status(200).json({
            success: true,
            count: populatedPlaylists.length,
            data: populatedPlaylists
        });
    } catch (error: any) {
        console.error('Controller error:', error);
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};