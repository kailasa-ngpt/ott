import { Request, Response } from 'express';
import * as playlistService from '../services/playlistService';
import { videoService } from '../services/videoService';

// Get all playlists
export const getAllPlaylists = async (req: Request, res: Response): Promise<void> => {
    try {
        const playlists = await playlistService.getAllPlaylists();
        res.json(playlists);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching playlists' });
    }
};

// Get a single playlist
export const getPlaylist = async (req: Request, res: Response): Promise<void> => {
    try {
        const playlist = await playlistService.getPlaylistById(req.params.id);
        if (!playlist) {
            res.status(404).json({ message: 'Playlist not found' });
            return;
        }
        res.json(playlist);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching playlist' });
    }
};

// Create a new playlist
export const createPlaylist = async (req: Request, res: Response): Promise<void> => {
    try {
        const playlist = await playlistService.createPlaylist(req.body);
        res.status(201).json(playlist);
    } catch (error) {
        res.status(500).json({ message: 'Error creating playlist' });
    }
};

// Update a playlist
export const updatePlaylist = async (req: Request, res: Response): Promise<void> => {
    try {
        const playlist = await playlistService.updatePlaylist(req.params.id, req.body);
        if (!playlist) {
            res.status(404).json({ message: 'Playlist not found' });
            return;
        }
        res.json(playlist);
    } catch (error) {
        res.status(500).json({ message: 'Error updating playlist' });
    }
};

// Delete a playlist
export const deletePlaylist = async (req: Request, res: Response): Promise<void> => {
    try {
        const deleted = await playlistService.deletePlaylist(req.params.id);
        if (!deleted) {
            res.status(404).json({ message: 'Playlist not found' });
            return;
        }
        res.json({ message: 'Playlist deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting playlist' });
    }
};

// Add a video to a playlist
export const addVideoToPlaylist = async (req: Request, res: Response): Promise<void> => {
    try {
        const { video } = req.body;
        if (!video || !video.id || !video.thumbnail || !video.videoTitle || !video.videoLink || !video.createdDate || typeof video.views !== 'number') {
            res.status(400).json({ message: 'Invalid video object provided' });
            return;
        }
        
        const playlist = await playlistService.addVideoToPlaylist(req.params.id, video);
        if (!playlist) {
            res.status(404).json({ message: 'Playlist not found' });
            return;
        }
        res.json(playlist);
    } catch (error) {
        res.status(500).json({ message: 'Error adding video to playlist' });
    }
};

// Remove a video from a playlist
export const removeVideoFromPlaylist = async (req: Request, res: Response): Promise<void> => {
    try {
        const { videoId } = req.params;
        if (!videoId) {
            res.status(400).json({ message: 'No video ID provided' });
            return;
        }
        
        const playlist = await playlistService.removeVideoFromPlaylist(req.params.id, videoId);
        if (!playlist) {
            res.status(404).json({ message: 'Playlist not found' });
            return;
        }
        res.json(playlist);
    } catch (error) {
        res.status(500).json({ message: 'Error removing video from playlist' });
    }
};

/**
 * Returns all playlists plus their full video objects
 */
export const getAllVideosByPlaylists = async (req: Request, res: Response): Promise<void> => {
    try {
        const playlists = await playlistService.getAllPlaylists();
        
        const results = playlists.map(playlist => ({
            playlist,
            videos: playlist.videos
        }));

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

export const getPlaylistsByIds = async (req: Request, res: Response): Promise<void> => {
    try {
        const { ids } = req.query;
        
        if (!ids) {
            res.status(400).json({ message: 'No playlist IDs provided' });
            return;
        }

        // Convert comma-separated string to array and ensure string type
        const idArray = (typeof ids === 'string' ? ids.split(',') : ids) as string[];
        
        if (!Array.isArray(idArray)) {
            res.status(400).json({ message: 'Invalid playlist IDs format' });
            return;
        }

        const playlists = await playlistService.getPlaylistsByIds(idArray);
        res.json(playlists);
    } catch (error) {
        console.error('Error in getPlaylistsByIds:', error);
        res.status(500).json({ message: 'Error fetching playlists' });
    }
};