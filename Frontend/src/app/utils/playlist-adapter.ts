// This adapter function converts playlist video format to the IVideo format expected by VideoSlider

// Interface for the VideoSlider component
interface IVideo {
  Id: number;
  video_id: string;
  CreatedAt: string;
  UpdatedAt: string;
  title: string;
  description: string;
  thumbnail_id: string;
  video_m3u8_id: string;
  duration_secs: number | null;
  delivered_date: string | null;
  uploaded_date: string | null;
}

// Interface for the playlist videos
interface IPlaylistVideo {
  thumbnailPath: string;
  videoTitle: string;
  videoLink: string;
  createdDate: string;
  views: number;
}

// Adapter function to convert playlist videos to IVideo format
export const adaptPlaylistVideosToSliderFormat = (videos: IPlaylistVideo[]): IVideo[] => {
  return videos.map((video, index) => ({
    Id: index, // Use index as a fallback ID
    video_id: `video-${index}`, // Generate a temporary ID
    CreatedAt: video.createdDate,
    UpdatedAt: video.createdDate,
    title: video.videoTitle,
    description: "Video from playlist", // Default description
    thumbnail_id: video.thumbnailPath,
    video_m3u8_id: video.videoLink,
    duration_secs: null,
    delivered_date: video.createdDate,
    uploaded_date: null
  }));
};