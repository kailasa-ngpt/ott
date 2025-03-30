import axios from 'axios';
import { IVideo } from '../models/IVideo';

// This is a temporary mock database for development
// In a real application, this would be replaced with a proper database
let mockVideos: IVideo[] = [
    {
        id: "HE0jMAK2EVY",
        title: "Sample Video 1",
        description: "This is a sample video description",
        videoUrl: "https://www.youtube.com/watch?v=HE0jMAK2EVY",
        thumbnailUrl: "/thumbnails/video1.jpg",
        dateOfVideo: new Date("2023-01-15"),
        uploadDate: new Date().toISOString(),
        categories: ["cat1", "cat3"],
        viewStatus: "public",
        views: 100,
        videoLength: 360, // 6 minutes
        tags: ["tag1", "tag2"],
        loves: 25
    },
    {
        id: "OS8lk2KnzNE",
        title: "Sample Video 2",
        description: "This is another sample video description",
        videoUrl: "https://www.youtube.com/watch?v=OS8lk2KnzNE",
        thumbnailUrl: "/thumbnails/video2.jpg",
        uploadDate: new Date().toISOString(),
        categories: ["cat2"],
        viewStatus: "public",
        views: 200,
        videoLength: 720, // 12 minutes
        tags: ["tag2", "tag3"],
        loves: 50
    }
];

export class VideoService {
    private API_URL: string;
    private XC_TOKEN: string;

    constructor() {
        this.API_URL = process.env.KOOGLE_URL || '';
        this.XC_TOKEN = process.env.XC_TOKEN || '';
    }

    // Get all videos
    async getAllVideos(): Promise<IVideo[]> {
        // In a real application, this would make a database or API call
        return mockVideos;
    }

    // Get a single video by ID
    async getVideo(videoId: string): Promise<IVideo> {
        // For demo, use the mock data
        const video = mockVideos.find(v => v.id === videoId);
        
        if (!video) {
            throw new Error(`Video with ID ${videoId} not found`);
        }
        
        return video;
        
        // Below is the original API call code which would be used in production
        /*
        const url = `${this.API_URL}/${videoId}/records`;

        try {
            const response = await axios.get<IVideo>(url, {
                headers: {
                    'Xc-Token': this.XC_TOKEN
                }
            });
            console.log('Response of video data from cloudflare:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error fetching videos:', error);
            throw error;
        }
        */
    }

    // Update an existing video
    async updateVideo(videoId: string, videoData: Partial<IVideo>): Promise<IVideo> {
        const index = mockVideos.findIndex(v => v.id === videoId);
        
        if (index === -1) {
            throw new Error(`Video with ID ${videoId} not found`);
        }
        
        const updatedVideo: IVideo = {
            ...mockVideos[index],
            ...videoData
        };
        
        mockVideos[index] = updatedVideo;
        return updatedVideo;
    }

    // Delete a video
    async deleteVideo(videoId: string): Promise<boolean> {
        const initialLength = mockVideos.length;
        mockVideos = mockVideos.filter(v => v.id !== videoId);
        
        return mockVideos.length !== initialLength;
    }

    // Increment view count for a video
    async incrementViews(videoId: string): Promise<IVideo> {
        const video = await this.getVideo(videoId);
        return this.updateVideo(videoId, { views: video.views + 1 });
    }

    // Increment love count for a video
    async incrementLoves(videoId: string): Promise<IVideo> {
        const video = await this.getVideo(videoId);
        return this.updateVideo(videoId, { loves: video.loves + 1 });
    }

    // Get videos by category
    async getVideosByCategory(categoryId: string): Promise<IVideo[]> {
        return mockVideos.filter(video => video.categories.includes(categoryId));
    }

    // Get videos by tag
    async getVideosByTag(tagId: string): Promise<IVideo[]> {
        return mockVideos.filter(video => video.tags.includes(tagId));
    }
    
    // Get videos by playlist ID
    async getVideosByPlaylistId(playlistId: string): Promise<IVideo[]> {
        // This is mock data - in a real application, this would query the database
        // to find videos associated with the given playlist
        
        // For demo purposes, we'll return different videos based on the playlistId
        // This simulates different playlists having different videos
        if (playlistId === 'playlist1') {
            return [mockVideos[0]]; // Return first video
        } else if (playlistId === 'playlist2') {
            return [mockVideos[1]]; // Return second video
        } else if (playlistId === 'allVideos') {
            return mockVideos; // Return all videos
        } else {
            // For any other playlist ID, return a random subset of videos
            return mockVideos.filter(video => 
                // Use the string hash of the video ID and playlist ID to determine inclusion
                (video.id.charCodeAt(0) + playlistId.charCodeAt(0)) % 2 === 0
            );
        }
    }
}

export const videoService = new VideoService(); 