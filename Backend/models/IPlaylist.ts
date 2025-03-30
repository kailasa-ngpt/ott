import mongoose, { Schema, Document } from 'mongoose';

export interface IPlaylist extends Document {
    id: string;
    name: string;
    description: string;
    thumbnailPath: string;
    videos: string[]; // Array of video IDs
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
        type: String
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