import axios from 'axios';

interface IVideo {
  videoId: string;
  videoTitle: string;
  videoSrc: string;
  thumbnail: string;
  autoLoop: boolean;
  autoPlay: boolean;
  controls: boolean;
  preload: string;
}

const api_url = 'https://localhost:3000';
export const getVideoData: (videoId: string) => Promise<IVideo> = async (videoId: string) => {
  try {
    // const response = await axios.get(`${api_url}/${videoId}`);
    // return response.data;
    if(videoId === '1') {
      return {
        videoId: '1',
        videoTitle: 'Sample Video a1',
        videoSrc: '/SampleVideos/SampleVideo.mp4',
        thumbnail: '/ThumbnailImages/sampleImage2.png',
        autoLoop: false,
        autoPlay: true,
        controls: true,
        preload: 'auto',
      };
    } 
    return {
        videoId: '2',
        videoTitle: 'Sample Video b2',
        videoSrc: '/SampleVideos/SampleVideo2.mp4',
        thumbnail: '/ThumbnailImages/sampleImage3.png',
        autoLoop: false,
        autoPlay: true,
        controls: true,
        preload: 'auto',
    };
  } catch (error) {
    console.error('Error fetching video data:', error);
    throw error;
  }
};