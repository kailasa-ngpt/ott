import axios from 'axios';
const API_URL = 'https://cms-ott.koogle.sk/api/v2/tables/migjkvqskrgjn5s/records';
const XC_TOKEN = 'OKbRlSd6P3z5fWuwT_ee7yGjn9QouGaqIxfXWLq3';
//THESE UPPER TWO LINES, TEMPORARY, EDIT LATER, GET DATA FROM BACKEND.

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
      multipleVideos.push(...videos.map(video => ({
        ...video,
        Id: video.Id + i,
        video_id: `${video.video_id}-${i}`,
        title: `${video.title} - Part ${i + 1}`,
      })));
    }

    return {
      category : category,
      videos: multipleVideos,
    };
  } catch (error) {
    console.error('Error fetching slider data:', error);
    throw error;
  }
};

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