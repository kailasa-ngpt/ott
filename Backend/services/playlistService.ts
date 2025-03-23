import { IPlaylist } from '../models/IPlaylist';

// This is a temporary mock database for development
let mockPlaylists: IPlaylist[] = [
    {
        id: "pl1",
        name: "eNHealth",
        description: "EnHealth Programs",
        thumbnailPath: "/thumbnails/playlist1.jpg",
        videos: ["OS8lk2KnzNE", "znofRdIjoYQ", "rBvx1JXwEIE"],
        createdDate: new Date().toISOString(),
        updatedDate: new Date().toISOString()
    },
    {
        id: "pl2",
        name: "Nithya Dhyana Yoga",
        description: "Nithya Dhyana Yoga programs",
        thumbnailPath: "/thumbnails/playlist2.jpg",
        videos: ["HE0jMAK2EVY", "_jua-NLtdQw"],
        createdDate: new Date().toISOString(),
        updatedDate: new Date().toISOString()
    },
    {
        id: "pl3",
        name: "eNHealth",
        description: "EnHealth Programs",
        thumbnailPath: "/thumbnails/playlist1.jpg",
        videos: ["OS8lk2KnzNE", "znofRdIjoYQ", "rBvx1JXwEIE"],
        createdDate: new Date().toISOString(),
        updatedDate: new Date().toISOString()
    },
    {
        id: "pl4",
        name: "Nithya Dhyana Yoga",
        description: "Nithya Dhyana Yoga programs",
        thumbnailPath: "/thumbnails/playlist2.jpg",
        videos: ["HE0jMAK2EVY", "_jua-NLtdQw"],
        createdDate: new Date().toISOString(),
        updatedDate: new Date().toISOString()
    },
    {
        id: "pl5",
        name: "eNHealth",
        description: "EnHealth Programs",
        thumbnailPath: "/thumbnails/playlist1.jpg",
        videos: ["OS8lk2KnzNE", "znofRdIjoYQ", "rBvx1JXwEIE"],
        createdDate: new Date().toISOString(),
        updatedDate: new Date().toISOString()
    },
    {
        id: "pl6",
        name: "Nithya Dhyana Yoga",
        description: "Nithya Dhyana Yoga programs",
        thumbnailPath: "/thumbnails/playlist2.jpg",
        videos: ["HE0jMAK2EVY", "_jua-NLtdQw"],
        createdDate: new Date().toISOString(),
        updatedDate: new Date().toISOString()
    }
];

export class PlaylistService {
    // Get all playlists
    async getAllPlaylists(): Promise<IPlaylist[]> {
        return mockPlaylists;
    }

    // Get a playlist by ID
    async getPlaylist(playlistId: string): Promise<IPlaylist> {
        const playlist = mockPlaylists.find(p => p.id === playlistId);
        
        if (!playlist) {
            throw new Error(`Playlist with ID ${playlistId} not found`);
        }
        
        return playlist;
    }

    // Create a new playlist
    async createPlaylist(playlistData: Omit<IPlaylist, 'id' | 'createdDate' | 'updatedDate'>): Promise<IPlaylist> {
        const date = new Date().toISOString();
        const newPlaylist: IPlaylist = {
            ...playlistData,
            id: `pl${Math.random().toString(36).substring(2, 7)}`,
            createdDate: date,
            updatedDate: date
        };
        
        mockPlaylists.push(newPlaylist);
        return newPlaylist;
    }

    // Update an existing playlist
    async updatePlaylist(playlistId: string, playlistData: Partial<IPlaylist>): Promise<IPlaylist> {
        const index = mockPlaylists.findIndex(p => p.id === playlistId);
        
        if (index === -1) {
            throw new Error(`Playlist with ID ${playlistId} not found`);
        }
        
        const updatedPlaylist: IPlaylist = {
            ...mockPlaylists[index],
            ...playlistData,
            updatedDate: new Date().toISOString()
        };
        
        mockPlaylists[index] = updatedPlaylist;
        return updatedPlaylist;
    }

    // Delete a playlist
    async deletePlaylist(playlistId: string): Promise<boolean> {
        const initialLength = mockPlaylists.length;
        mockPlaylists = mockPlaylists.filter(p => p.id !== playlistId);
        
        return mockPlaylists.length !== initialLength;
    }

    // Add a video to a playlist
    async addVideoToPlaylist(playlistId: string, videoId: string): Promise<IPlaylist> {
        const playlist = await this.getPlaylist(playlistId);
        
        if (playlist.videos.includes(videoId)) {
            return playlist; // Video already in playlist
        }
        
        return this.updatePlaylist(playlistId, {
            videos: [...playlist.videos, videoId]
        });
    }

    // Remove a video from a playlist
    async removeVideoFromPlaylist(playlistId: string, videoId: string): Promise<IPlaylist> {
        const playlist = await this.getPlaylist(playlistId);
        
        return this.updatePlaylist(playlistId, {
            videos: playlist.videos.filter(id => id !== videoId)
        });
    }
}

export const playlistService = new PlaylistService(); 