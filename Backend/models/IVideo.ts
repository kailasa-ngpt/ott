import mongoose, { Schema, Document } from 'mongoose';

export interface IVideo extends Document {
    id: string;               // YouTube video ID
    title: string;            // Video title
    description: string;      // Video description
    uploadDate: string;       // Date uploaded to platform
    categories: string[];     // Array of category IDs
    viewStatus: 'public' | 'private' | 'unlisted'; // Visibility status
    views: number;            // View count
    videoLength: number;      // Duration in seconds
    tags: string[];          // Array of tag IDs
    loves: number;           // Like count
}

const videoSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    uploadDate: {
        type: String,
        required: true,
        default: () => new Date().toISOString()
    },
    categories: {
        type: [String],
        required: true,
        default: []
    },
    viewStatus: {
        type: String,
        enum: ['public', 'private', 'unlisted'],
        required: true
    },
    views: {
        type: Number,
        default: 0
    },
    videoLength: {
        type: Number,
        required: true
    },
    tags: {
        type: [String],
        required: true,
        default: []
    },
    loves: {
        type: Number,
        default: 0
    }
});

const Video = mongoose.model<IVideo>('Video', videoSchema);
export { Video };
export default Video;