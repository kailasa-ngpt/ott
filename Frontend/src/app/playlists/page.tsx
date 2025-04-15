"use client";

import React, { useState, useEffect } from "react";
import { FaPlay } from "react-icons/fa";
import Footer from "../shared/footer";
import Header from "../shared/header";
import { getPlaylists } from "../../services/playListService";

interface Video {
  id: string;
  videoTitle: string;
  thumbnail: string;
  videoLink: string;
  createdDate: string;
  views: number;
}

interface Playlist {
  id: string;
  name: string;
  description: string;
  thumbnailPath: string;
  videos: Video[];
  createdDate: string;
  updatedDate: string;
}

const Playlists = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const data = await getPlaylists();
        setPlaylists(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching playlists:', err);
        setError('Failed to load playlists');
        setLoading(false);
      }
    };

    fetchPlaylists();
  }, []);

  if (loading) {
    return (
      <div className="bg-white text-gray-800 font-sans min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">Loading playlists...</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white text-gray-800 font-sans min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-red-600">{error}</div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-white text-gray-800 font-sans">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Custom Scrollbar CSS */}
        <style jsx global>{`
          .orange-scrollbar::-webkit-scrollbar {
            height: 4px;
            background-color: transparent;
          }

          .orange-scrollbar::-webkit-scrollbar-thumb {
            background: linear-gradient(to right, #ff9901, #ff7801);
            border-radius: 4px;
          }

          .orange-scrollbar::-webkit-scrollbar-track {
            background: #f1f1f1;
            border-radius: 4px;
          }

          .orange-scrollbar {
            scrollbar-width: thin;
            scrollbar-color: #ff9901 #f1f1f1;
          }
        `}</style>

        {/* Render playlists */}
        {playlists.map((playlist: Playlist) => (
          <div key={playlist.id} className="mb-8">
            <div className="flex items-center mb-4">
              <h2 className="text-xl font-bold text-black mr-4">{playlist.name}</h2>
              <button className="flex items-center text-black hover:text-orange-500 transition-colors duration-300">
                <FaPlay className="mr-2" size={14} />
                <span>Play all</span>
              </button>
            </div>

            <div className="orange-scrollbar overflow-x-auto pb-2 mb-2">
              <div className="flex space-x-4">
                {(isMobile ? playlist.videos.slice(0, 12) : playlist.videos).map((video: Video) => (
                  <div key={video.id} className="flex-shrink-0 w-44">
                    <a
                      href={`https://ott-ui.koogle.sk/play?id=${video.id}`}
                      className="block aspect-[9/16] w-full rounded-lg overflow-hidden mb-2 bg-gray-100 relative"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={video.thumbnail}
                        alt={video.videoTitle}
                        className="w-full h-full object-cover"
                      />
                    </a>
                    <div className="text-left">
                      <p className="text-sm font-medium text-black truncate">{video.videoTitle}</p>
                      <p className="text-xs text-gray-500">{video.views} views</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default Playlists;
