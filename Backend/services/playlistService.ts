import Playlist, { IPlaylist } from '../models/IPlaylist';
import Video from '../models/IVideo';

// Get all playlists
export const getAllPlaylists = async (): Promise<IPlaylist[]> => {
    try {
        return await Playlist.find();
    } catch (error) {
        console.error('Error in getAllPlaylists:', error);
        throw new Error('Error fetching playlists');
    }
};

// Get a playlist by ID
export const getPlaylistById = async (id: string): Promise<IPlaylist | null> => {
    try {
        console.log('Attempting to find playlist with ID:', id);
        const playlist = await Playlist.findOne({ id: id });

        if (!playlist) {
            console.log('No playlist found with ID:', id);
            return null;
        }
        console.log('Found playlist:', playlist);
        return playlist;
    } catch (error) {
        console.error('Error in getPlaylistById:', error);
        throw new Error('Error fetching playlist');
    }
};

// Create a new playlist
export const createPlaylist = async (playlistData: Partial<IPlaylist>): Promise<IPlaylist> => {
    try {
        // Create new playlist document
        const playlist = new Playlist(playlistData);
        return await playlist.save();
    } catch (error) {
        console.error('Error in createPlaylist:', error);
        throw new Error('Error creating playlist');
    }
};

// Update a playlist
export const updatePlaylist = async (id: string, playlistData: Partial<IPlaylist>): Promise<IPlaylist | null> => {
    try {
        // Update with the new data and return the updated document
        return await Playlist.findOneAndUpdate(
            { id: id },
            { ...playlistData, updatedDate: new Date().toISOString() },
            { new: true }
        );
    } catch (error) {
        console.error('Error in updatePlaylist:', error);
        throw new Error('Error updating playlist');
    }
};

// Delete a playlist
export const deletePlaylist = async (id: string): Promise<boolean> => {
    try {
        const result = await Playlist.findOneAndDelete({ id: id });
        return result !== null;
    } catch (error) {
        console.error('Error in deletePlaylist:', error);
        throw new Error('Error deleting playlist');
    }
};

// Add a single video to a playlist
export const addVideoToPlaylist = async (playlistId: string, videoId: string): Promise<IPlaylist | null> => {
    try {
        // Check if the video exists in the videos collection
        const videoExists = await Video.findOne({ id: videoId });
        if (!videoExists) {
            throw new Error(`Video with ID ${videoId} not found`);
        }

        // Add video to playlist if it's not already there
        return await Playlist.findOneAndUpdate(
            { id: playlistId },
            {
                $addToSet: { videos: videoId },
                updatedDate: new Date().toISOString()
            },
            { new: true }
        );
    } catch (error) {
        console.error('Error in addVideoToPlaylist:', error);
        throw error;
    }
};

// Add multiple videos to a playlist
export const addVideosToPlaylist = async (playlistId: string, videoIds: string[]): Promise<IPlaylist | null> => {
    try {
        // Check if all videos exist in the videos collection
        for (const videoId of videoIds) {
            const videoExists = await Video.findOne({ id: videoId });
            if (!videoExists) {
                throw new Error(`Video with ID ${videoId} not found`);
            }
        }

        // Add videos to playlist if they're not already there
        return await Playlist.findOneAndUpdate(
            { id: playlistId },
            {
                $addToSet: { videos: { $each: videoIds } },
                updatedDate: new Date().toISOString()
            },
            { new: true }
        );
    } catch (error) {
        console.error('Error in addVideosToPlaylist:', error);
        throw error;
    }
};

// Remove a video from a playlist
export const removeVideoFromPlaylist = async (playlistId: string, videoId: string): Promise<IPlaylist | null> => {
    try {
        return await Playlist.findOneAndUpdate(
            { id: playlistId },
            {
                $pull: { videos: videoId },
                updatedDate: new Date().toISOString()
            },
            { new: true }
        );
    } catch (error) {
        console.error('Error in removeVideoFromPlaylist:', error);
        throw new Error('Error removing video from playlist');
    }
};

// Get playlists by IDs
export const getPlaylistsByIds = async (ids: string[]): Promise<IPlaylist[]> => {
    try {
        console.log('Fetching playlists with IDs:', ids);
        return await Playlist.find({ id: { $in: ids } });
    } catch (error) {
        console.error('Error in getPlaylistsByIds:', error);
        throw error;
    }
};

// Get playlists with populated video data
export const getPopulatedPlaylists = async (): Promise<any[]> => {
    try {
        const playlists = await Playlist.find();

        // For each playlist, get the full video objects
        const populatedPlaylists = await Promise.all(playlists.map(async (playlist) => {
            const videoIds = playlist.videos;
            const videos = await Video.find({ id: { $in: videoIds } });

            return {
                ...playlist.toObject(),
                videos: videos
            };
        }));

        return populatedPlaylists;
    } catch (error) {
        console.error('Error in getPopulatedPlaylists:', error);
        throw error;
    }
};