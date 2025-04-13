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
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // const nextSlide = () => {
  //   if (isAnimating) return;

  //   setDirection('right');
  //   setIsAnimating(true);

  //   // After animation duration, change the slide
  //   setTimeout(() => {
  //     setActiveIndex((prev) => (prev + 1) % contentItems.length);
  //     // Allow a little time for the state to update before resetting animation flag
  //     setTimeout(() => {
  //       setIsAnimating(false);
  //     }, 50);
  //   }, 300);
  // };

  // const prevSlide = () => {
  //   if (isAnimating) return;

  //   setDirection('left');
  //   setIsAnimating(true);

  //   // After animation duration, change the slide
  //   setTimeout(() => {
  //     setActiveIndex((prev) => (prev - 1 + contentItems.length) % contentItems.length);
  //     // Allow a little time for the state to update before resetting animation flag
  //     setTimeout(() => {
  //       setIsAnimating(false);
  //     }, 50);
  //   }, 300);
  // };

  // useEffect(() => {
  //   if (!isHovered && !isAnimating) {
  //     const interval = setInterval(() => {
  //       nextSlide();
  //     }, 5000);

  //     return () => clearInterval(interval);
  //   }
  // }, [isHovered, isAnimating]);

  // const handleMouseOver = () => {
  //   setIsHovered(true);
  // };

  // const handleMouseLeave = () => {
  //   setIsHovered(false);
  // };

  // const handleDotClick = (index: number) => {
  //   if (isAnimating) return;

  //   if (index === activeIndex) return;

  //   setDirection(index > activeIndex ? 'right' : 'left');
  //   setIsAnimating(true);

  //   // After animation duration, change the slide
  //   setTimeout(() => {
  //     setActiveIndex(index);
  //     // Allow a little time for the state to update before resetting animation flag
  //     setTimeout(() => {
  //       setIsAnimating(false);
  //     }, 50);
  //   }, 300);
  // };

  // // Get the current slide and next/prev slide based on direction
  const currentItem = contentItems[activeIndex];
  // const nextIndex = direction === 'right'
  //   ? (activeIndex + 1) % contentItems.length
  //   : (activeIndex - 1 + contentItems.length) % contentItems.length;
  // const nextItem = contentItems[nextIndex];

  return (
    <div
      className="relative w-full overflow-hidden"
      // onMouseOver={handleMouseOver}
      // onMouseLeave={handleMouseLeave}
      style={{ backgroundColor: currentItem.color }}
    >
      {/* Main slider container */}
      <div className={`relative w-full ${isMobile ? 'h-[520px]' : 'h-[450px]'}`}>
        {/* Current Slide */}
        <div
          className={`absolute inset-0 w-full h-full transition-transform duration-300 ease-in-out ${
            isAnimating
              ? direction === 'right' ? '-translate-x-full' : 'translate-x-full'
              : 'translate-x-0'
          }`}
          style={{ backgroundColor: currentItem.color }}
        >
          {isMobile ? (
            // Mobile Layout
            <div className="container mx-auto px-4 flex flex-col items-center text-center h-full justify-center">
              {/* <div
                className="w-[180px] mb-4 mt-8 bg-gray-100 flex-shrink-0 shadow-lg"
                style={{ aspectRatio: '9/16' }}
              >
                <div className="w-full h-full bg-gradient-to-b from-gray-300 to-gray-400 flex items-center justify-center text-gray-700 font-bold text-xl">
                  Poster
                </div>
              </div> */}
              <div
  className="w-full mb-4 mt-8 bg-gray-100 flex-shrink-0 shadow-lg overflow-hidden"
>
                <img
    src="/SliderImages/Ott.png" // Replace with your image path
    alt={currentItem.title}
    className="w-full h-full object-cover"
  />
  </div>

              {/* <div className="w-full px-2 text-white max-w-xs">
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
              </div> */}
            </div>
          ) : (
            // Desktop Layout
            <div className="container mx-auto px-4 flex justify-center items-center h-full">
              {/* <div className="flex items-center max-w-4xl"> */}
              <div className="w-full bg-gray-100 flex-shrink-0 shadow-lg overflow-hidden">
              <img
    src="/SliderImages/Ott1.png"
    alt={currentItem.title}
    className="w-full h-full object-cover"
  />
  </div>
                {/* <div className="h-[350px] w-[250px] bg-gray-100 flex-shrink-0 shadow-lg">
                  <div className="w-full h-full bg-gradient-to-b from-gray-300 to-gray-400 flex items-center justify-center text-gray-700 font-bold text-xl">
                    Poster
                  </div>
                </div> */}

                 {/*  <div className="ml-8 text-white max-w-2xl">
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
                </div> */}
              {/* </div> */}
            </div>
          )}
        </div>

        {/* Next Slide (for animation) */}
       {/* {isAnimating && (
          <div
            className={`absolute inset-0 w-full h-full transition-transform duration-300 ease-in-out ${
              direction === 'right' ? 'translate-x-full' : '-translate-x-full'
            }`}
            style={{ backgroundColor: nextItem.color }}
          >*/}
            {/* {isMobile ? (
              // Mobile Layout for next slide
              <div className="container mx-auto px-4 flex flex-col items-center text-center h-full justify-center">
                <div
                  className="w-[180px] mb-4 mt-8 bg-gray-100 flex-shrink-0 shadow-lg"
                  style={{ aspectRatio: '9/16' }}
                >
                  <div className="w-full h-full bg-gradient-to-b from-gray-300 to-gray-400 flex items-center justify-center text-gray-700 font-bold text-xl">
                    Poster
                  </div>
                </div>

                <div className="w-full px-2 text-white max-w-xs">
                  <h1 className="text-2xl font-bold mb-2">
                    {nextItem.title}
                  </h1>
                  <p className="text-sm line-clamp-3 mb-6 opacity-90">
                    {nextItem.description}
                  </p>
                  <button className="px-6 py-2 text-base mb-8 bg-gradient-to-r from-[#ff9901] to-[#ff7801] text-white font-bold rounded-md flex items-center justify-center mx-auto">
                    <BiPlay className="mr-2" size={18} />
                    Watch Now
                  </button>
                </div>
              </div>
            ) : (
              // Desktop Layout for next slide
              <div className="container mx-auto px-4 flex justify-center items-center h-full">
                <div className="flex items-center max-w-4xl">
                  <div className="h-[350px] w-[250px] bg-gray-100 flex-shrink-0 shadow-lg">
                    <div className="w-full h-full bg-gradient-to-b from-gray-300 to-gray-400 flex items-center justify-center text-gray-700 font-bold text-xl">
                      Poster
                    </div>
                  </div>

                  <div className="ml-8 text-white max-w-2xl">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                      {nextItem.title}
                    </h1>
                    <p className="text-lg mb-6 opacity-90">
                      {nextItem.description}
                    </p>
                    <button className="px-8 py-3 text-lg bg-gradient-to-r from-[#ff9901] to-[#ff7801] text-white font-bold rounded-md flex items-center">
                      <BiPlay className="mr-2" size={24} />
                      Watch Now
                    </button>
                  </div>
                </div>
              </div>
            )} */}
          {/* </div> */}
        {/* )} */}
      </div>

      {/* Navigation arrows */}
      {/* <button
        className={`absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 rounded-full text-white ${isMobile ? 'p-1' : 'p-2'} z-20`}
        onClick={prevSlide}
        disabled={isAnimating}
      >
        <FaChevronLeft size={isMobile ? 16 : 32} />
      </button>
      <button
        className={`absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 rounded-full text-white ${isMobile ? 'p-1' : 'p-2'} z-20`}
        onClick={nextSlide}
        disabled={isAnimating}
      >
        <FaChevronRight size={isMobile ? 16 : 32} />
      </button> */}

      {/* Pagination indicators */}
      {/* <div className="flex justify-center mt-2 md:mt-4">
        {contentItems.map((_, index) => (
          <div
            key={index}
            onClick={() => handleDotClick(index)}
            className={`${
              index === activeIndex
                ? "bg-[#ff9901] h-2 w-2 md:h-3 md:w-3 rounded-full"
                : "bg-gray-300 h-2 w-2 md:h-3 md:w-3 rounded-full"
            } mx-1 transition-all duration-500 ease-in-out cursor-pointer`}
          ></div>
        ))}
      </div> */}
    </div>
  );
}