import { IPlayList } from '../models/IPlayList';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

// Add a console log to debug the API_URL
console.log('API_URL:', API_URL);

export const getPlaylistById = async (playlistId: string): Promise<IPlayList> => {
    try {
        const response = await fetch(`${API_URL}/playlists/${playlistId}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching playlist:', error);
        throw error;
    }
};

export const getPlaylistsByIds = async (playlistIds: string[]): Promise<IPlayList[]> => {
    try {
        // Encode each ID individually and then join them
        const encodedIds = playlistIds.map(id => encodeURIComponent(id)).join(',');
        const response = await fetch(`${API_URL}/playlists/getPlaylistsByIds?ids=${encodedIds}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching playlists:', error);
        throw error;
    }
};

export const getPlaylists = async (): Promise<IPlayList[]> => {
    try 
    {
      const response = await fetch(`${API_URL}/playlists`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
        
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) 
    {
      console.error('Error fetching playlists:', error);
      throw error;
    }
};
