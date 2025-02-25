//Functionality: Service to get a single video that will play in the player.
import { IVideo } from '../models/IVideo';

const API_URL = process.env.REACT_APP_API_URL;

export const playService = {
  async getVideo(videoId: string): Promise<IVideo> {
    try {
        console.log('Requesting URL:', `${API_URL}/${videoId}`);
        console.log('API_URL:', API_URL);
        const response = await fetch(`${API_URL}/${videoId}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        console.log('Response status:', response.status);
        const data = await response.json();
        console.log('Response body:', data);

        if (!data.success) {
            throw new Error(data.error);
        }
        return data.data;
    } catch (error) {
        console.error('Error fetching video:', error);
        throw error;
    }
  }
};