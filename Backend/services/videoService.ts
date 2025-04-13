import axios from 'axios';
import Video, { IVideo } from '../models/IVideo';

export class VideoService {
    constructor() {
        // No need for API_URL or XC_TOKEN since we're not making external API calls
    }

    // Add the new method to get video resources
    async getVideoResources(videoId: string): Promise<{streamUrl: string, thumbnailUrl: string}> {
        try {
            // Use the proxy server paths for both resources
            const streamUrl = `/media/${videoId}/master.m3u8`;
            const thumbnailUrl = `/media/${videoId}/thumbnail.webp`;

            return {
                streamUrl,
                thumbnailUrl
            };
        } catch (error) {
            console.error('Error generating resource URLs:', error);
            throw error;
        }
    }

    //Remove getAllVideos after 1000s of videos are uploaded.
    //When 1000s of videos are uploaded we need pagination.
    async getAllVideos(): Promise<IVideo[]> {
        const videos = await Video.find();
        // Transform videos to include dynamic URLs
        return Promise.all(videos.map(async (video) => {
            const videoObj = video.toObject() as IVideo;
            const resources = await this.getVideoResources(video.id);
            videoObj.streamUrl = resources.streamUrl;
            videoObj.thumbnailUrl = resources.thumbnailUrl;
            return videoObj;
        }));
    }

    //From POSTMAN send id=OS8lk2KnzNE
    async getVideoById(Id: string): Promise<IVideo | null> {
        try {
            console.log('Attempting to find video with ID:', Id);
            const video = await Video.findOne({ id: Id });

            if (!video) {
                console.log('No video found with ID:', Id);
                return null;
            }

            // Add the dynamically generated URLs
            const videoWithUrls = video.toObject() as IVideo;
            const resources = await this.getVideoResources(video.id);
            videoWithUrls.streamUrl = resources.streamUrl;
            videoWithUrls.thumbnailUrl = resources.thumbnailUrl;

            console.log('Found video:', videoWithUrls);
            return videoWithUrls;
        } catch (error) {
            console.error('Error in getVideoById:', error);
            throw new Error('Error fetching video');
        }
    }

    async createVideo(videoData: IVideo): Promise<IVideo> {
        const video = new Video(videoData);
        return await video.save();
    }

    //Update video document/record in DB
    async updateVideo(id: string, videoData: Partial<IVideo>): Promise<IVideo | null> {
        return await Video.findByIdAndUpdate(id, videoData, { new: true });
    }

    //As of now, this deletes Video document/record only from DB
    async deleteVideo(id: string): Promise<boolean> {
        const result = await Video.findByIdAndDelete(id);
        return result !== null;
    }

    async getVideosByCategory(categoryId: string): Promise<IVideo[]> {
        const videos = await Video.find({ categories: categoryId });

        // Add dynamic URLs to each video
        return Promise.all(videos.map(async (video) => {
            const videoObj = video.toObject() as IVideo;
            const resources = await this.getVideoResources(video.id);
            videoObj.streamUrl = resources.streamUrl;
            videoObj.thumbnailUrl = resources.thumbnailUrl;
            return videoObj;
        }));
    }

    async getVideosByTag(tagId: string): Promise<IVideo[]> {
        const videos = await Video.find({ tags: tagId });

        // Add dynamic URLs to each video
        return Promise.all(videos.map(async (video) => {
            const videoObj = video.toObject() as IVideo;
            const resources = await this.getVideoResources(video.id);
            videoObj.streamUrl = resources.streamUrl;
            videoObj.thumbnailUrl = resources.thumbnailUrl;
            return videoObj;
        }));
    }

    async getVideosByPlaylist(playlistId: string): Promise<IVideo[]> {
        const videos = await Video.find({ playlists: playlistId });

        // Add dynamic URLs to each video
        return Promise.all(videos.map(async (video) => {
            const videoObj = video.toObject() as IVideo;
            const resources = await this.getVideoResources(video.id);
            videoObj.streamUrl = resources.streamUrl;
            videoObj.thumbnailUrl = resources.thumbnailUrl;
            return videoObj;
        }));
    }

    async incrementViews(videoId: string): Promise<IVideo | null> {
        const video = await Video.findByIdAndUpdate(
            videoId,
            { $inc: { views: 1 } },
            { new: true }
        );

        if (video) {
            // Add dynamic URLs to the returned video
            const videoWithUrls = video.toObject() as IVideo;
            const resources = await this.getVideoResources(video.id);
            videoWithUrls.streamUrl = resources.streamUrl;
            videoWithUrls.thumbnailUrl = resources.thumbnailUrl;
            return videoWithUrls;
        }

        return null;
    }

    async incrementLoves(videoId: string): Promise<IVideo | null> {
        const video = await Video.findByIdAndUpdate(
            videoId,
            { $inc: { loves: 1 } },
            { new: true }
        );

        if (video) {
            // Add dynamic URLs to the returned video
            const videoWithUrls = video.toObject() as IVideo;
            const resources = await this.getVideoResources(video.id);
            videoWithUrls.streamUrl = resources.streamUrl;
            videoWithUrls.thumbnailUrl = resources.thumbnailUrl;
            return videoWithUrls;
        }

        return null;
    }
}

export const videoService = new VideoService();

// Get videos by playlist - Updated to include dynamic URLs
export const getVideosByPlaylist = async (playlistId: string): Promise<IVideo[]> => {
    const videos = await Video.find({ playlists: playlistId });

    // Add dynamic URLs to each video
    return Promise.all(videos.map(async (video) => {
        const videoObj = video.toObject() as IVideo;
        const resources = await videoService.getVideoResources(video.id);
        videoObj.streamUrl = resources.streamUrl;
        videoObj.thumbnailUrl = resources.thumbnailUrl;
        return videoObj;
    }));
};

// Increment video views - Updated to include dynamic URLs
export const incrementViews = async (videoId: string): Promise<IVideo | null> => {
    const video = await Video.findByIdAndUpdate(
        videoId,
        { $inc: { views: 1 } },
        { new: true }
    );

    if (video) {
        // Add dynamic URLs to the returned video
        const videoWithUrls = video.toObject() as IVideo;
        const resources = await videoService.getVideoResources(video.id);
        videoWithUrls.streamUrl = resources.streamUrl;
        videoWithUrls.thumbnailUrl = resources.thumbnailUrl;
        return videoWithUrls;
    }

    return null;
};

// Increment video loves - Updated to include dynamic URLs
export const incrementLoves = async (videoId: string): Promise<IVideo | null> => {
    const video = await Video.findByIdAndUpdate(
        videoId,
        { $inc: { loves: 1 } },
        { new: true }
    );

    if (video) {
        // Add dynamic URLs to the returned video
        const videoWithUrls = video.toObject() as IVideo;
        const resources = await videoService.getVideoResources(video.id);
        videoWithUrls.streamUrl = resources.streamUrl;
        videoWithUrls.thumbnailUrl = resources.thumbnailUrl;
        return videoWithUrls;
    }

    return null;
};