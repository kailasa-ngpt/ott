"use client";
import { useEffect, useState } from "react";
import Footer from "../shared/footer";
import Header from "../shared/header";
import { getPlayListsByUserId } from "../../services/playListService";
import VideoSlider from "../components/videoSlider";

interface IPlayList {
  playlistId: string;
  playListTitle: string;
  videos: {
    thumbnailPath: string;
    videoTitle: string;
    videoLink: string;
    createdDate: string;
    views: number;
  }[];
}


const Playlists = () => {
  const [playlistsState, setPlaylistsState] = useState<IPlayList[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        let userId = getCurrentUserId();
        const playlists = await getPlayListsByUserId(userId);
        setPlaylistsState(playlists);
      } catch (error) {
        console.error("Error fetching playlist IDs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPlaylists();
  }, []);

  return (
    <div className="bg-[#220E0E] text-white font-sans">
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
                <p className="text-xl">You haven't created any playlists.</p>
              </div>
              ) : (
                playlistsState.map((playlist, index) => (
                    <div key={index}>
                      <VideoSlider category={playlist.playListTitle}  videos={playlist.videos} />
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