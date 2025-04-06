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
    title: "Featured Content 1",
    description: "An astronaut finds himself stranded on a hostile planet. With only meager supplies, he must draw upon his ingenuity to survive and find a way to signal Earth.",
    color: '#862e24'
  },
  { 
    id: 2, 
    title: "Featured Content 2",
    description: "Join this spiritual journey as we explore ancient wisdom and practices that can transform your life and connect you with higher consciousness.",
    color: '#8B3A3A'
  },
  { 
    id: 3, 
    title: "Featured Content 3",
    description: "Experience guided meditation sessions designed to help you reduce stress, find inner peace, and develop mindfulness in your daily life.",
    color: '#862e24' 
  },
  { 
    id: 4, 
    title: "Manifesting Powers",
    description: "Explore ancient yogic techniques and spiritual practices to awaken the divine powers (shaktis) within you through Paramashiva's sacred knowledge.",
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
        className={`w-full flex items-center justify-center ${isMobile ? 'h-[500px] pt-0' : 'h-[450px]'}`}
        style={{ backgroundColor: currentItem.color }}
      >
        <div className={`container mx-auto px-4 md:px-8 flex ${isMobile ? 'flex-col items-center text-center' : 'items-center'}`}>
          {/* Poster/Rectangle - 9:16 aspect ratio on mobile */}
          <div 
            className={`${isMobile ? 'w-[180px] mb-4 mt-6' : 'h-[350px] w-[250px]'} bg-gray-100 flex-shrink-0 shadow-lg`}
            style={{ 
              aspectRatio: isMobile ? '9/16' : 'auto',
              height: isMobile ? 'auto' : '350px' 
            }}
          >
            {/* This would be your poster image */}
            <div className="w-full h-full bg-gradient-to-b from-gray-300 to-gray-400 flex items-center justify-center text-gray-700 font-bold text-xl">
              Poster
            </div>
          </div>
          
          {/* Content - adjusted for mobile */}
          <div className={`${isMobile ? 'w-full px-2' : 'ml-8'} text-white ${isMobile ? 'max-w-xs' : 'max-w-2xl'}`}>
            <h1 className={`${isMobile ? 'text-2xl' : 'text-4xl md:text-5xl'} font-bold mb-2 md:mb-4`}>
              {currentItem.title}
            </h1>
            <p className={`${isMobile ? 'text-sm line-clamp-3' : 'text-lg'} mb-4 md:mb-6 opacity-90`}>
              {currentItem.description}
            </p>
            <button className={`${isMobile ? 'px-6 py-2 text-base mb-4' : 'px-8 py-3 text-lg'} bg-gradient-to-r from-[#ff9901] to-[#ff7801] text-white font-bold rounded-md flex items-center justify-center mx-auto md:mx-0`}>
              <BiPlay className="mr-2" size={isMobile ? 18 : 24} />
              Watch Now
            </button>
          </div>
        </div>
      </div>

      {/* Navigation arrows - adjusted for mobile */}
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
      
      {/* Pagination indicators - styled like in the second image */}
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