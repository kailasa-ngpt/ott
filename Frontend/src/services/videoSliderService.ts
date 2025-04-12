import axios from 'axios';

// Get Cloudflare configuration from environment variables
const CLOUDFLARE_ENDPOINT_URL = process.env.NEXT_PUBLIC_CLOUDFLARE_ENDPOINT_URL;
const CLOUDFLARE_BUCKET_NAME = process.env.NEXT_PUBLIC_CLOUDFLARE_BUCKET_NAME;
const CLOUDFLARE_ACCESS_KEY_ID = process.env.NEXT_PUBLIC_CLOUDFLARE_ACCESS_KEY_ID;
const CLOUDFLARE_ACCESS_KEY_SECRET = process.env.NEXT_PUBLIC_CLOUDFLARE_ACCESS_KEY_SECRET;

const API_URL = 'https://cms-ott.koogle.sk/api/v2/tables/migjkvqskrgjn5s/records';
const XC_TOKEN = 'OKbRlSd6P3z5fWuwT_ee7yGjn9QouGaqIxfXWLq3';
//THESE UPPER TWO LINES, TEMPORARY, EDIT LATER, GET DATA FROM BACKEND.

if (!CLOUDFLARE_ENDPOINT_URL || !CLOUDFLARE_BUCKET_NAME || !CLOUDFLARE_ACCESS_KEY_ID || !CLOUDFLARE_ACCESS_KEY_SECRET) {
  console.error('Missing required Cloudflare configuration in environment variables');
}

export const getSliderData = async (category: string): Promise<ISlider> => {
  try {
    const response = await axios.get<IApiResponse>(API_URL, {
      headers: {
        'Xc-Token': XC_TOKEN,
      },
    });

    const videos = response.data.list;

    // Generate multiple unreal data entries based on the fetched data to test the slider
    const multipleVideos = [];
    for (let i = 0; i < 5; i++) {
      multipleVideos.push(...videos.map(video => {
        // Extract account ID from the endpoint URL
        const accountId = CLOUDFLARE_ENDPOINT_URL?.split('//')[1].split('.')[0];
        // Construct URL in the correct format: https://{accountid}.r2.cloudflarestorage.com/{bucket}/{path}
        const videoUrl = `https://${accountId}.r2.cloudflarestorage.com/${CLOUDFLARE_BUCKET_NAME}/${video.id}/master.m3u8`;
        
        return {
          ...video,
          id: `${video.id}-${i}`,
          title: `${video.title} - Part ${i + 1}`,
          videoUrl: videoUrl,
          viewStatus: 'public' as const,
          views: 0,
          loves: 0,
          categories: [],
          tags: [],
          videoLength: video.videoLength || 0,
          uploadDate: new Date().toISOString()
        };
      }));
    }

    return {
      category: category,
      videos: multipleVideos,
    };
  } catch (error) {
    console.error('Error fetching slider data:', error);
    throw error;
  }
};

interface IVideo {
  id: string;               // YouTube video ID
  title: string;            // Video title
  description: string;      // Video description
  videoUrl: string;         // Video URL/link
  thumbnailUrl: string;     // Thumbnail image URL
  dateOfVideo?: Date;       // Original date of the video
  uploadDate: string;       // Date uploaded to platform
  categories: string[];     // Array of category IDs
  viewStatus: 'public' | 'private' | 'unlisted'; // Visibility status
  views: number;            // View count
  videoLength: number;      // Duration in seconds
  tags: string[];          // Array of tag IDs
  loves: number;           // Like count
}

interface ISlider {
  category: string;
  videos: IVideo[];
}

interface IApiResponse {
  list: IVideo[];
  pageInfo: {
    totalRows: number;
    page: number;
    pageSize: number;
    isFirstPage: boolean;
    isLastPage: boolean;
  };
}