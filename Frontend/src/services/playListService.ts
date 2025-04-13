import { IPlayList } from '../models/IPlayList';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

// Add a console log to debug the API_URL
console.log('API_URL:', API_URL);

export const getPlaylistById = async (playlistId: string): Promise<IPlayList> => {
    try {
        const response = await fetch(`${API_URL}/api/playlists/${playlistId}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        console.log('Response:', response);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Received playlist:', data);

        // Transform the playlist to use the media proxy for video URLs
        if (data.videos && Array.isArray(data.videos)) {
            data.videos = data.videos.map(video => ({
                ...video,
                videoLink: `${API_URL}/media/${video.id}/master.m3u8`,
                thumbnail: `${API_URL}/media/${video.id}/thumbnail.webp`
            }));
        }

        return data;
    } catch (error) {
        console.error('Error fetching playlist:', error);
        throw error;
    }
};

export const getPlaylistsByIds = async (playlistIds: string[]): Promise<IPlayList[]> => {
    try {
        const encodedIds = playlistIds.map(id => encodeURIComponent(id)).join(',');

        const response = await fetch(`${API_URL}/api/playlists/getPlaylistsByIds?ids=${encodedIds}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Validate the response data
        if (!Array.isArray(data)) {
            console.error('Response is not an array:', data);
            throw new Error('Invalid response: expected an array of playlists');
        }

        // Transform the playlists to use the media proxy for video URLs
        const transformedPlaylists = data.map(playlist => {
            if (playlist.videos && Array.isArray(playlist.videos)) {
                playlist.videos = playlist.videos.map(video => ({
                    ...video,
                    videoLink: `${API_URL}/media/${video.id}/master.m3u8`,
                    thumbnail: `${API_URL}/media/${video.id}/thumbnail.webp`
                }));
            }
            return playlist;
        });

        return transformedPlaylists;
    } catch (error) {
        console.error('Error fetching playlists:', error);
        throw error;
    }
};

export const getPlaylists = async (): Promise<IPlayList[]> => {
    try
    {
      const response = await fetch(`${API_URL}/api/playlists`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Transform the playlists to use the media proxy for video URLs
      const transformedPlaylists = data.map(playlist => {
        if (playlist.videos && Array.isArray(playlist.videos)) {
            playlist.videos = playlist.videos.map(video => ({
                ...video,
                videoLink: `${API_URL}/media/${video.id}/master.m3u8`,
                thumbnail: `${API_URL}/media/${video.id}/thumbnail.webp`
            }));
        }
        return playlist;
      });

      return transformedPlaylists;
    } catch (error)
    {
      console.error('Error fetching playlists:', error);
      throw error;
    }
};