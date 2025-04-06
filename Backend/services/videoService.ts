import axios from 'axios';
import Video, { IVideo } from '../models/IVideo';

export class VideoService {
    private API_URL: string;
    private XC_TOKEN: string;

    constructor() {
        this.API_URL = process.env.KOOGLE_URL || '';
        this.XC_TOKEN = process.env.XC_TOKEN || '';
    }

    //Remove getAllVideos after 1000s of videos are uploaded.
    //When 1000s of videos are uploaded we need pagination.
    async getAllVideos(): Promise<IVideo[]> {
        return await Video.find();
    }

    //From POSTMAN send id=OS8lk2KnzNE
    async getVideoById(id: string): Promise<IVideo | null> {
        return await Video.findById(id);
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
        return await Video.find({ categories: categoryId });
    }

    async getVideosByTag(tagId: string): Promise<IVideo[]> {
        return await Video.find({ tags: tagId });
    }

    async getVideosByPlaylist(playlistId: string): Promise<IVideo[]> {
        return await Video.find({ playlists: playlistId });
    }

    async incrementViews(videoId: string): Promise<IVideo | null> {
        return await Video.findByIdAndUpdate(
            videoId,
            { $inc: { views: 1 } },
            { new: true }
        );
    }

    async incrementLoves(videoId: string): Promise<IVideo | null> {
        return await Video.findByIdAndUpdate(
            videoId,
            { $inc: { loves: 1 } },
            { new: true }
        );
    }
}

export const videoService = new VideoService();

// Get videos by playlist
export const getVideosByPlaylist = async (playlistId: string): Promise<IVideo[]> => {
    return await Video.find({ playlists: playlistId });
};

// Increment video views
export const incrementViews = async (videoId: string): Promise<IVideo | null> => {
    return await Video.findByIdAndUpdate(
        videoId,
        { $inc: { views: 1 } },
        { new: true }
    );
};

// Increment video loves
export const incrementLoves = async (videoId: string): Promise<IVideo | null> => {
    return await Video.findByIdAndUpdate(
        videoId,
        { $inc: { loves: 1 } },
        { new: true }
    );
}; 