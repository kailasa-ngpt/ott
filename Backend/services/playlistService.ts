import Playlist, { IPlaylist } from '../models/IPlaylist';

export const getAllPlaylists = async (): Promise<IPlaylist[]> => {
    try {
        return await Playlist.find().populate('videos');
    } catch (error) {
        throw new Error('Error fetching playlists');
    }
};

//From POSTMAN send id=PL21WI5_pNwj5QaRIWKUaSDRRU9NLuEGAk
// or trt id = 67e8d0dc7e71928d51bf8072
export const getPlaylistById = async (id: string): Promise<IPlaylist | null> => {
    try {
        console.log('Attempting to find playlist with ID:', id);
        // Try to find by MongoDB _id first
        let playlist = await Playlist.findById(id).populate('videos');
        
        // If not found by _id, try to find by the custom id field
        if (!playlist) {
            console.log('Not found by _id, trying custom id field');
            playlist = await Playlist.findOne({ id: id }).populate('videos');
        }

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

export const createPlaylist = async (playlistData: Partial<IPlaylist>): Promise<IPlaylist> => {
    try {
        const playlist = new Playlist(playlistData);
        return await playlist.save();
    } catch (error) {
        throw new Error('Error creating playlist');
    }
};

export const updatePlaylist = async (id: string, playlistData: Partial<IPlaylist>): Promise<IPlaylist | null> => {
    try {
        return await Playlist.findByIdAndUpdate(id, playlistData, { new: true });
    } catch (error) {
        throw new Error('Error updating playlist');
    }
};

export const deletePlaylist = async (id: string): Promise<boolean> => {
    try {
        const result = await Playlist.findByIdAndDelete(id);
        return result !== null;
    } catch (error) {
        throw new Error('Error deleting playlist');
    }
};

export const addVideoToPlaylist = async (playlistId: string, videoId: string): Promise<IPlaylist | null> => {
    try {
        return await Playlist.findByIdAndUpdate(
            playlistId,
            { $addToSet: { videos: videoId } },
            { new: true }
        ).populate('videos');
    } catch (error) {
        throw new Error('Error adding video to playlist');
    }
};

export const removeVideoFromPlaylist = async (playlistId: string, videoId: string): Promise<IPlaylist | null> => {
    try {
        return await Playlist.findByIdAndUpdate(
            playlistId,
            { $pull: { videos: videoId } },
            { new: true }
        ).populate('videos');
    } catch (error) {
        throw new Error('Error removing video from playlist');
    }
}; 