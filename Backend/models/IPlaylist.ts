import mongoose, { Schema, Document } from 'mongoose';

export interface IPlaylist extends Document {
    id: string;
    name: string;
    description: string;
    videos: {
        id: string;           // Video ID reference
        videoTitle: string;   // Title of the video
        uploadDate: string;   // Upload date of the video
        views: number;        // View count of the video
    }[];
    createdDate: string;      // Playlist creation date
    updatedDate: string;      // Playlist last update date
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
    videos: [{
        id: {
            type: String,
            required: true
        },
        videoTitle: {
            type: String,
            required: true
        },
        uploadDate: {
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
        required: true,
        default: () => new Date().toISOString()
    },
    updatedDate: {
        type: String,
        required: true,
        default: () => new Date().toISOString()
    }
});

const Playlist = mongoose.model<IPlaylist>('Playlist', playlistSchema);
export { Playlist };
export default Playlist;