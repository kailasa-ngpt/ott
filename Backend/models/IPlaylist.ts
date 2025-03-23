export interface IPlaylist {
    id: string;
    name: string;
    description: string;
    thumbnailPath: string;
    videos: string[]; // Array of video IDs
    createdDate: string;
    updatedDate: string;
} 