import React, { useState } from 'react';
import { FaPlay } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

// Sample data - Replace with your actual data
const featuredPlaylists = [
  {
    id: "playlist1",
    title: "Meditation Techniques",
    videos: [
      { id: "m1", title: "Meditation 1", duration: "15 min", color: "#e9f0f5" },
      { id: "m2", title: "Meditation 2", duration: "20 min", color: "#e9f0f5" },
      { id: "m3", title: "Meditation 3", duration: "25 min", color: "#e9f0f5" },
      { id: "m4", title: "Meditation 4", duration: "30 min", color: "#e9f0f5" },
      { id: "m5", title: "Meditation 5", duration: "15 min", color: "#e9f0f5" },
      { id: "m6", title: "Meditation 6", duration: "20 min", color: "#e9f0f5" },
      { id: "m7", title: "Meditation 7", duration: "25 min", color: "#e9f0f5" },
      { id: "m8", title: "Meditation 8", duration: "30 min", color: "#e9f0f5" },
      { id: "m9", title: "Meditation 9", duration: "15 min", color: "#e9f0f5" },
      { id: "m10", title: "Meditation 10", duration: "20 min", color: "#e9f0f5" },
      { id: "m11", title: "Meditation 11", duration: "25 min", color: "#e9f0f5" },
      { id: "m12", title: "Meditation 12", duration: "30 min", color: "#e9f0f5" }
    ]
  },
  {
    id: "playlist2",
    title: "Sacred Teachings",
    videos: [
      { id: "s1", title: "Teaching 1", duration: "25 min", color: "#e9f0f5" },
      { id: "s2", title: "Teaching 2", duration: "30 min", color: "#e9f0f5" },
      { id: "s3", title: "Teaching 3", duration: "20 min", color: "#e9f0f5" },
      { id: "s4", title: "Teaching 4", duration: "35 min", color: "#e9f0f5" },
      { id: "s5", title: "Teaching 5", duration: "40 min", color: "#e9f0f5" },
      { id: "s6", title: "Teaching 6", duration: "25 min", color: "#e9f0f5" },
      { id: "s7", title: "Teaching 7", duration: "30 min", color: "#e9f0f5" },
      { id: "s8", title: "Teaching 8", duration: "20 min", color: "#e9f0f5" },
      { id: "s9", title: "Teaching 9", duration: "35 min", color: "#e9f0f5" },
      { id: "s10", title: "Teaching 10", duration: "40 min", color: "#e9f0f5" },
      { id: "s11", title: "Teaching 11", duration: "25 min", color: "#e9f0f5" },
      { id: "s12", title: "Teaching 12", duration: "30 min", color: "#e9f0f5" }
    ]
  },
  {
    id: "playlist3",
    title: "KAILASA's Economic Policies",
    videos: [
      { id: "k1", title: "Economic Policy 1", duration: "45 min", color: "#e9f0f5" },
      { id: "k2", title: "Economic Policy 2", duration: "40 min", color: "#e9f0f5" },
      { id: "k3", title: "Economic Policy 3", duration: "35 min", color: "#e9f0f5" },
      { id: "k4", title: "Economic Policy 4", duration: "30 min", color: "#e9f0f5" },
      { id: "k5", title: "Economic Policy 5", duration: "45 min", color: "#e9f0f5" },
      { id: "k6", title: "Economic Policy 6", duration: "40 min", color: "#e9f0f5" },
      { id: "k7", title: "Economic Policy 7", duration: "35 min", color: "#e9f0f5" },
      { id: "k8", title: "Economic Policy 8", duration: "30 min", color: "#e9f0f5" },
      { id: "k9", title: "Economic Policy 9", duration: "45 min", color: "#e9f0f5" },
      { id: "k10", title: "Economic Policy 10", duration: "40 min", color: "#e9f0f5" },
      { id: "k11", title: "Economic Policy 11", duration: "35 min", color: "#e9f0f5" },
      { id: "k12", title: "Economic Policy 12", duration: "30 min", color: "#e9f0f5" }
    ]
  }
];

const FeaturedPlaylists = () => {
  const router = useRouter();
  const [playButtonHover, setPlayButtonHover] = useState<string | null>(null);

  const handleViewAll = () => {
    router.push('/playlists');
  };

  const handlePlayAll = (playlistId: string) => {
    // Add logic to play all videos in the playlist
    console.log(`Playing all videos in playlist: ${playlistId}`);
  };

  return (
    <section className="w-full py-6 bg-white">
      <div className="container mx-auto px-4">
        {/* Featured Playlists heading */}
        <div className="flex items-center mb-6">
          <h1 className="text-2xl font-bold text-black mr-4">Featured Playlists</h1>
          <button 
            onClick={handleViewAll}
            className="text-orange-500 hover:underline"
          >
            View all
          </button>
        </div>

        {/* CSS for custom scrollbar (add directly in the component) */}
        <style jsx global>{`
          /* Custom scrollbar styles */
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
          
          /* For Firefox */
          .orange-scrollbar {
            scrollbar-width: thin;
            scrollbar-color: #ff9901 #f1f1f1;
          }
        `}</style>

        {featuredPlaylists.map((playlist) => (
          <div key={playlist.id} className="mb-8">
            <div className="flex items-center mb-4">
              <h2 className="text-xl font-bold text-black mr-4">{playlist.title}</h2>
              
              <button 
                onClick={() => handlePlayAll(playlist.id)}
                onMouseEnter={() => setPlayButtonHover(playlist.id)}
                onMouseLeave={() => setPlayButtonHover(null)}
                className="flex items-center text-black hover:text-orange-500 transition-colors duration-300"
              >
                <FaPlay 
                  className="mr-2" 
                  size={14} 
                  color={playButtonHover === playlist.id ? '#f97316' : 'black'} 
                />
                <span>Play all</span>
              </button>
            </div>
            
            {/* Scrollable container with orange scrollbar */}
            <div className="orange-scrollbar overflow-x-auto pb-2 mb-2">
              <div className="flex space-x-4">
                {playlist.videos.map((video) => (
                  <div key={video.id} className="flex-shrink-0 w-44">
                    <div className="aspect-[9/16] w-full rounded-lg overflow-hidden mb-2 bg-gray-100 relative">
                      <div 
                        className="w-full h-full flex items-center justify-center" 
                        style={{ backgroundColor: video.color }}
                      >
                        <span className="text-gray-700">{video.title}</span>
                      </div>
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-medium text-black truncate">{video.title}</p>
                      <p className="text-xs text-gray-500">{video.duration}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedPlaylists;