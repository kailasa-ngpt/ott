export interface IVideo {
    id: string;               // YouTube video ID
    title: string;            // Video title
    description: string;      // Video description
    videoUrl: string;         // Video URL/link
    thumbnailUrl: string;     // Thumbnail image URL
    dateOfVideo?: Date;       // Original date of the video (nullable)
    uploadDate: string;       // Date uploaded to platform
    categories: string[];     // Array of category IDs
    viewStatus: 'public' | 'private' | 'unlisted'; // Visibility status
    views: number;            // View count
    videoLength: number;      // Duration in seconds
    tags: string[];           // Array of tag IDs
    loves: number;            // Like count
} 