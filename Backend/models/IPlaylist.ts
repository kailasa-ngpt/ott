import mongoose, { Schema, Document } from 'mongoose';

export interface IPlaylist extends Document {
    id: string;                   // Custom playlist ID (not MongoDB's _id)
    name: string;                 // Name of the playlist
    description?: string;         // Optional description
    thumbnailPath?: string;       // Optional thumbnail path
    videos: string[];             // Array of video IDs that reference videos collection
    createdDate: string;          // Creation date
    updatedDate: string;          // Last updated date
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
        trim: true,
        default: ''
    },
    thumbnailPath: {
        type: String,
        default: ''
    },
    videos: [{
        type: String,  // Video IDs
        ref: 'Video'   // Reference to the Video model
    }],
    createdDate: {
        type: String,
        required: true,
        default: () => new Date().toISOString()
    },
    updatedDate: {
        type: String,
        required: true,
        default: () => new Date().toISOString()
    }
});

export default mongoose.model<IPlaylist>('Playlist', playlistSchema);