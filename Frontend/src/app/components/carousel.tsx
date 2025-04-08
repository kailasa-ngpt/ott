"use client";
import { useState, useEffect, JSX } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { BiPlay } from "react-icons/bi";

// Interface for content data
interface ContentData {
  id: number;
  title: string;
  description: string;
  color: string;
}

// Sample content items
const contentItems: ContentData[] = [
  { 
    id: 1, 
    title: "Manifesting Powers",
    description: "Explore ancient yogic techniques and spiritual practices to awaken the divine powers (shaktis) within you through Paramashiva's sacred knowledge.",
    color: '#862e24'
  },
  { 
    id: 2, 
    title: "Divine Consciousness",
    description: "Join this spiritual journey as we explore ancient wisdom and practices that can transform your life and connect you with higher consciousness.",
    color: '#8B3A3A'
  },
  { 
    id: 3, 
    title: "Meditation Mastery",
    description: "Experience guided meditation sessions designed to help you reduce stress, find inner peace, and develop mindfulness in your daily life.",
    color: '#862e24' 
  },
  { 
    id: 4, 
    title: "Sacred Teachings",
    description: "Discover the secrets of the universe through sacred teachings that explore cosmic phenomena and spiritual understanding.",
    color: '#8B3A3A' 
  },
];

export default function Carousel(): JSX.Element {
  // State to keep track of the current item index
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // State to determine if the carousel is being hovered over
  const [isHovered, setIsHovered] = useState<boolean>(false);
  
  // State to track if we're on mobile view
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // Function to check and update screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkScreenSize();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkScreenSize);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Function to show the previous slide
  const prevSlide = (): void => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + contentItems.length) % contentItems.length
    );
  };

  // Function to show the next slide
  const nextSlide = (): void => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % contentItems.length);
  };

  // useEffect hook to handle automatic slide transition
  useEffect(() => {
    // Start interval for automatic slide change if not hovered
    if (!isHovered) {
      const interval = setInterval(() => {
        nextSlide();
      }, 5000);

      // Cleanup the interval on component unmount
      return () => {
        clearInterval(interval);
      };
    }
  }, [isHovered]);

  // Handle mouse over event
  const handleMouseOver = (): void => {
    setIsHovered(true);
  };

  // Handle mouse leave event
  const handleMouseLeave = (): void => {
    setIsHovered(false);
  };

  const currentItem = contentItems[currentIndex];

  return (
    <div 
      className="relative w-full" 
      onMouseOver={handleMouseOver} 
      onMouseLeave={handleMouseLeave}
    >
      <div 
        className={`w-full flex items-center justify-center ${isMobile ? 'h-[520px] pt-0' : 'h-[450px]'}`}
        style={{ backgroundColor: currentItem.color }}
      >
        {isMobile ? (
          // Mobile Layout - stacked vertically with improved spacing
          <div className="container mx-auto px-4 flex flex-col items-center text-center">
            {/* Poster - 9:16 aspect ratio on mobile with improved top spacing */}
            <div 
              className="w-[180px] mb-4 mt-8 bg-gray-100 flex-shrink-0 shadow-lg"
              style={{ aspectRatio: '9/16' }}
            >
              <div className="w-full h-full bg-gradient-to-b from-gray-300 to-gray-400 flex items-center justify-center text-gray-700 font-bold text-xl">
                Poster
              </div>
            </div>
            
            {/* Content with improved spacing */}
            <div className="w-full px-2 text-white max-w-xs">
              <h1 className="text-2xl font-bold mb-2">
                {currentItem.title}
              </h1>
              <p className="text-sm line-clamp-3 mb-6 opacity-90">
                {currentItem.description}
              </p>
              <button className="px-6 py-2 text-base mb-8 bg-gradient-to-r from-[#ff9901] to-[#ff7801] text-white font-bold rounded-md flex items-center justify-center mx-auto">
                <BiPlay className="mr-2" size={18} />
                Watch Now
              </button>
            </div>
          </div>
        ) : (
          // Desktop Layout - side-by-side, centered in section
          <div className="container mx-auto px-4 flex justify-center">
            <div className="flex items-center max-w-4xl">
              {/* Poster */}
              <div className="h-[350px] w-[250px] bg-gray-100 flex-shrink-0 shadow-lg">
                <div className="w-full h-full bg-gradient-to-b from-gray-300 to-gray-400 flex items-center justify-center text-gray-700 font-bold text-xl">
                  Poster
                </div>
              </div>
              
              {/* Content */}
              <div className="ml-8 text-white max-w-2xl">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  {currentItem.title}
                </h1>
                <p className="text-lg mb-6 opacity-90">
                  {currentItem.description}
                </p>
                <button className="px-8 py-3 text-lg bg-gradient-to-r from-[#ff9901] to-[#ff7801] text-white font-bold rounded-md flex items-center">
                  <BiPlay className="mr-2" size={24} />
                  Watch Now
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation arrows */}
      <button
        className={`absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 rounded-full text-white ${isMobile ? 'p-1' : 'p-2'} z-10`}
        onClick={prevSlide}
      >
        <FaChevronLeft size={isMobile ? 16 : 32} />
      </button>
      <button
        className={`absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 rounded-full text-white ${isMobile ? 'p-1' : 'p-2'} z-10`}
        onClick={nextSlide}
      >
        <FaChevronRight size={isMobile ? 16 : 32} />
      </button>
      
      {/* Pagination indicators */}
      <div className="flex justify-center mt-2 md:mt-4">
        {contentItems.map((_, index) => (
          <div
            key={index}
            className={`${
              index === currentIndex
                ? "bg-[#ff9901] h-2 w-2 md:h-3 md:w-3 rounded-full"
                : "bg-gray-300 h-2 w-2 md:h-3 md:w-3 rounded-full"
            } mx-1 transition-all duration-500 ease-in-out cursor-pointer`}
            onClick={() => setCurrentIndex(index)}
          ></div>
        ))}
      </div>
    </div>
  );
}