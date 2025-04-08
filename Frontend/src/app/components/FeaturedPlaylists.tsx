import React, { useRef, useState } from 'react';
import { FaArrowLeft, FaArrowRight, FaPlay } from 'react-icons/fa';
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

// Simple placeholder component to replace the image
const PlaceholderBox = ({ text, color }) => (
  <div 
    className="w-full h-full flex items-center justify-center" 
    style={{ backgroundColor: color }}
  >
    <span className="text-white text-sm font-medium text-center px-2">
      {text}
    </span>
  </div>
);

const FeaturedPlaylists = () => {
  const router = useRouter();
  const scrollContainerRefs = useRef<Array<HTMLDivElement | null>>([]);
  
  // Initialize refs array
  if (!scrollContainerRefs.current.length) {
    scrollContainerRefs.current = Array(featuredPlaylists.length).fill(null);
  }

  // State to track hover for each playlist row
  const [hoveredPlaylist, setHoveredPlaylist] = useState<number | null>(null);
  const [playButtonHover, setPlayButtonHover] = useState<string | null>(null);

  const scrollLeft = (index: number) => {
    const container = scrollContainerRefs.current[index];
    if (container) {
      container.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = (index: number) => {
    const container = scrollContainerRefs.current[index];
    if (container) {
      container.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  const handleViewAll = () => {
    router.push('/playlists');
  };

  const handlePlayAll = (playlistId: string) => {
    // Add logic to play all videos in the playlist
    console.log(`Playing all videos in playlist: ${playlistId}`);
  };

  // Function to set ref correctly with TypeScript
  const setScrollContainerRef = (el: HTMLDivElement | null, index: number) => {
    scrollContainerRefs.current[index] = el;
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

        {featuredPlaylists.map((playlist, playlistIndex) => (
          <div 
            key={playlist.id} 
            className="mb-8"
            onMouseEnter={() => setHoveredPlaylist(playlistIndex)}
            onMouseLeave={() => setHoveredPlaylist(null)}
          >
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
            
            <div className="relative">
              {/* Left scroll button */}
              <button
                onClick={() => scrollLeft(playlistIndex)}
                className={`absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full w-8 h-8 shadow-md flex items-center justify-center focus:outline-none transition-opacity duration-300 ${
                  hoveredPlaylist === playlistIndex ? "opacity-80" : "opacity-0"
                }`}
                aria-label="Scroll left"
              >
                <FaArrowLeft className="text-orange-500" />
              </button>
              
              {/* Scrollable container for videos */}
              <div
                ref={(el) => setScrollContainerRef(el, playlistIndex)}
                className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 scroll-smooth"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {playlist.videos.map((video) => (
                  <div key={video.id} className="flex-shrink-0 w-44">
                    <div className="aspect-[9/16] w-full rounded-lg overflow-hidden mb-2 bg-gray-100 relative">
                      {/* Replace the problematic image tag with our custom component */}
                      <PlaceholderBox text={video.title} color={video.color} />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-medium text-black truncate">{video.title}</p>
                      <p className="text-xs text-gray-500">{video.duration}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Right scroll button */}
              <button
                onClick={() => scrollRight(playlistIndex)}
                className={`absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full w-8 h-8 shadow-md flex items-center justify-center focus:outline-none transition-opacity duration-300 ${
                  hoveredPlaylist === playlistIndex ? "opacity-80" : "opacity-0"
                }`}
                aria-label="Scroll right"
              >
                <FaArrowRight className="text-orange-500" />
              </button>
              
              {/* Orange line under each playlist - only for first and second playlists */}
              {playlistIndex < 2 && (
                <div className="h-1 w-full mt-2 bg-orange-500 rounded-full"></div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedPlaylists;