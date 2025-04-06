"use client";
import { useState, useEffect, JSX } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

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
    title: "Featured Content 4",
    description: "Discover the secrets of the universe through this documentary series that explores cosmic phenomena and spiritual understanding.",
    color: '#8B3A3A' 
  },
];

export default function Carousel(): JSX.Element {
  // State to keep track of the current item index
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // State to determine if the carousel is being hovered over
  const [isHovered, setIsHovered] = useState<boolean>(false);

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
        className="w-full h-[800px] flex items-center justify-center"
        style={{ backgroundColor: currentItem.color }}
      >
        <div className="container mx-auto px-4 md:px-8 flex items-center">
          {/* Poster/Rectangle on the left */}
          <div className="h-[350px] w-[250px] bg-gray-100 flex-shrink-0 shadow-lg">
            {/* This would be your poster image */}
            <div className="w-full h-full bg-gradient-to-b from-gray-300 to-gray-400 flex items-center justify-center text-gray-700 font-bold text-xl">
              Poster
            </div>
          </div>
          
          {/* Content on the right */}
          <div className="ml-8 text-white max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{currentItem.title}</h1>
            <p className="text-lg mb-6 opacity-90">{currentItem.description}</p>
            <button className="px-8 py-3 bg-gradient-to-r from-[#ff9901] to-[#ff7801] text-white font-bold rounded-md text-lg">
              Watch Now
            </button>
          </div>
        </div>
      </div>

      {/* Navigation arrows */}
      <button
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-transparent text-white p-2 z-10"
        onClick={prevSlide}
      >
        <FaChevronLeft size={32} />
      </button>
      <button
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-transparent text-white p-2 z-10"
        onClick={nextSlide}
      >
        <FaChevronRight size={32} />
      </button>
      
      {/* Pagination indicators */}
      <div className="flex justify-center mt-4">
        {contentItems.map((_, index) => (
          <div
            key={index}
            className={`h-1 w-10 mx-1 ${
              index === currentIndex
                ? "bg-gradient-to-r from-[#ff9901] to-[#ff7801] rounded-xl"
                : "bg-gray-300 rounded-xl"
            } transition-all duration-500 ease-in-out`}
          ></div>
        ))}
      </div>
    </div>
  );
}