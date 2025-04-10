"use client";
import { useEffect, useState } from "react";
import Footer from "../shared/footer";
import Header from "../shared/header";
//import { getPlayListsByUserId } from "../../services/playListService";
import VideoSlider from "../components/videoSlider";
import { IPlayList } from "@/models/IPlayList";
import { getPlaylistsByIds } from "@/services/playListService";

const cloudflareEndPointUrl = process.env.NEXT_PUBLIC_CLOUDFLARE_ENDPOINT_URL;
const bucketName = process.env.NEXT_PUBLIC_CLOUDFLARE_BUCKET_NAME;

if (!cloudflareEndPointUrl || !bucketName) {
    throw new Error('Missing required Cloudflare R2 environment variables');
}

// Extract the account ID from the endpoint URL
const accountId = cloudflareEndPointUrl.split('.')[0].split('//')[1];

const Playlists = () => {
  const [playlistsState, setPlaylistsState] = useState<IPlayList[]>([]);
  const [loading, setLoading] = useState(true);

  const playlistIds = [
    "nithyanandasatsang2025",
    "shivasankalpaupanishads",
    "naradabhaktisutras",
    "navatattvamnineformsofparamashiva",
    "experienceparamashivaasyourfirstperson"
  ];

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        console.log('Fetching playlists with IDs:', playlistIds);
        const playlists = await getPlaylistsByIds(playlistIds);
        for (const playlist of playlists) {
          for (const video of playlist.videos) {
            // Construct URLs using the correct R2 public URL format
            //standard format: https://{bucket_name}.{account_id}.r2.cloudflarestorage.com/{video_id}/master.m3u8
            video.videoLink = `https://${bucketName}.${accountId}.r2.cloudflarestorage.com/${video.id}/master.m3u8`;
            video.thumbnail = `https://${bucketName}.${accountId}.r2.cloudflarestorage.com/${video.id}/thumbnail.jpg`;
          }
        }
        console.log('Received playlists:', playlists);
        setPlaylistsState(playlists);
      } catch (error) {
        console.error("Error fetching playlists:", error);
        // Log more details about the error
        if (error instanceof Error) {
          console.error("Error message:", error.message);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchPlaylists();
  }, []);

  return (
    <div className="bg-white text-gray-800 font-sans">
      <Header />
      <div className="container mx-auto px-4 flex-grow min-h-screen">
        {
          loading ? (
            <div className="mt-4 text-center">
              <p className="text-xl">Loading...</p>
            </div>
          ) : (
            playlistsState.length === 0) ? (
              <div className="mt-4 text-center">
                <p className="text-xl">No playlists found.</p>
              </div>
              ) : (
                playlistsState.map((playlist, index) => (
                    <div key={index}>
                      <VideoSlider 
                        category={playlist.name}  
                        videos={playlist.videos} 
                      />
                    </div>
                  )
                )
              )
        }
      </div>
      <Footer/> 
    </div>
  );
}

export default Playlists;

const getCurrentUserId = () => "123"; //modify this code later as we make the actual call. This is just for testing