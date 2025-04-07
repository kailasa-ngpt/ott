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
export const adaptPlaylistVideosToSliderFormat = (videos: string[] | IPlaylistVideo[]): IVideo[] => {
  return videos.map((video, index) => {
    // If video is a string (video ID), create a basic IPlaylistVideo object
    if (typeof video === 'string') {
      return {
        Id: index,
        video_id: video,
        CreatedAt: new Date().toISOString(),
        UpdatedAt: new Date().toISOString(),
        title: `Video ${index + 1}`,
        description: '',
        thumbnail_id: '',
        video_m3u8_id: video,
        duration_secs: null,
        delivered_date: null,
        uploaded_date: null
      };
    }
    // If video is already an IPlaylistVideo object, convert it
    return {
      Id: index,
      video_id: video.videoLink,
      CreatedAt: video.createdDate,
      UpdatedAt: video.createdDate,
      title: video.videoTitle,
      description: '',
      thumbnail_id: video.thumbnailPath,
      video_m3u8_id: video.videoLink,
      duration_secs: null,
      delivered_date: null,
      uploaded_date: null
    };
  });
};