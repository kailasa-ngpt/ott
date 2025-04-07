"use client";
import { useEffect, useState } from "react";
import Footer from "../shared/footer";
import Header from "../shared/header";
//import { getPlayListsByUserId } from "../../services/playListService";
import VideoSlider from "../components/videoSlider";
import { adaptPlaylistVideosToSliderFormat } from "../utils/playlist-adapter";
import { IPlayList } from "@/models/IPlayList";
import { getPlaylistsByIds } from "@/services/playListService";


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
                        videos={adaptPlaylistVideosToSliderFormat(playlist.videos)} 
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