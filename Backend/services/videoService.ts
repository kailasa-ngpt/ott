import axios from 'axios';
import { IVideo } from '../models/IVideo';

export class VideoService {
    private API_URL: string;
    private XC_TOKEN: string;

    constructor() {
        this.API_URL = process.env.KOOGLE_URL || '';
        this.XC_TOKEN = process.env.XC_TOKEN || '';
    }
    async getVideo(videoId: string): Promise<IVideo> {
        videoId = "migjkvqskrgjn5s"; //TEMPORARY, REMOVE LATER
        const url = `${this.API_URL}/${videoId}/records`;

        try {
            const response = await axios.get<IVideo>(url, {
                headers: {
                    'Xc-Token': this.XC_TOKEN
                }
            });
            console.log('Response of video data from cloudflare:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error fetching videos:', error);
            throw error;
        }
    }
}

export const videoService = new VideoService(); 