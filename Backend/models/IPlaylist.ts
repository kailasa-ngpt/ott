import mongoose, { Schema, Document } from 'mongoose';

export interface IPlaylist extends Document {
    id: string;
    name: string;
    description: string;
    thumbnailPath: string;
    videos: {
        id: string;
        thumbnail: string;
        videoTitle: string;
        videoLink: string;
        createdDate: string;
        views: number;
    }[]
    createdDate: string;
    updatedDate: string;
}

const playlistSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    thumbnailPath: {
        type: String,
        required: true
    },
    videos: [{
        id: {
            type: String,
            required: true
        },
        thumbnail: {
            type: String,
            required: true
        },
        videoTitle: {
            type: String,
            required: true
        },
        videoLink: {
            type: String,
            required: true
        },
        createdDate: {
            type: String,
            required: true
        },
        views: {
            type: Number,
            required: true,
            default: 0
        }
    }],
    createdDate: {
        type: String,
        required: true
    },
    updatedDate: {
        type: String,
        required: true
    }
});

export default mongoose.model<IPlaylist>('Playlist', playlistSchema); 