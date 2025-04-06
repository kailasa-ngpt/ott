import React, { useRef, useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

// Sample data - Replace with your actual data
const featuredPlaylists = [
  {
    id: "playlist1",
    title: "Guided Meditations",
    videos: [
      { id: "m1", title: "Morning Meditation", color: "#e57373" },
      { id: "m2", title: "Evening Peace", color: "#81c784" },
      { id: "m3", title: "Mindfulness Practice", color: "#64b5f6" },
      { id: "m4", title: "Chakra Alignment", color: "#ffb74d" }
    ]
  },
  {
    id: "playlist2",
    title: "Spiritual Teachings",
    videos: [
      { id: "s1", title: "Path to Enlightenment", color: "#ba68c8" },
      { id: "s2", title: "Divine Consciousness", color: "#4fc3f7" },
      { id: "s3", title: "Sacred Wisdom", color: "#aed581" },
      { id: "s4", title: "Inner Journey", color: "#ffd54f" }
    ]
  },
  {
    id: "playlist3",
    title: "Yogic Powers",
    videos: [
      { id: "y1", title: "Advanced Techniques", color: "#ff8a65" },
      { id: "y2", title: "Energy Mastery", color: "#4db6ac" },
      { id: "y3", title: "Body Transformation", color: "#9575cd" },
      { id: "y4", title: "Healing Practices", color: "#f06292" }
    ]
  }
];

const FeaturedPlaylists = () => {
  const router = useRouter();
  const scrollContainerRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Initialize refs array with null values
  if (scrollContainerRefs.current.length !== featuredPlaylists.length) {
    scrollContainerRefs.current = Array(featuredPlaylists.length).fill(null);
  }

  // State to track hover for each playlist row
  const [hoveredPlaylist, setHoveredPlaylist] = useState<number | null>(null);

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

  // This function is no longer needed as we're using direct placeholders with colors from the data

  return (
    <section className="w-full py-8 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-black">Featured Playlists</h2>
          <button 
            onClick={handleViewAll}
            className="text-orange-500 font-medium hover:underline flex items-center"
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
            <h3 className="text-xl font-semibold mb-3 text-black">{playlist.title}</h3>
            
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
                ref={el => scrollContainerRefs.current[playlistIndex] = el}
                className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 scroll-smooth"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {playlist.videos.map((video, videoIndex) => (
                  <div key={video.id} className="flex-shrink-0 w-48">
                    <div className="aspect-[16/9] w-full rounded-lg overflow-hidden mb-2">
                      <div 
                        className="w-full h-full flex items-center justify-center" 
                        style={{ backgroundColor: video.color }}
                      >
                        <div className="text-white text-sm font-medium text-center p-2">
                          {video.title}
                        </div>
                      </div>
                    </div>
                    <p className="text-sm font-medium text-black truncate">{video.title}</p>
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
              
              {/* Gradient line under each playlist */}
              <div className="h-1 w-full mt-2 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full"></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedPlaylists;