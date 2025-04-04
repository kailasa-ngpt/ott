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
        const playlist = await playlistService.addVideoToPlaylist(req.params.id, req.body.videoId);
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
        const playlist = await playlistService.removeVideoFromPlaylist(req.params.id, req.params.videoId);
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