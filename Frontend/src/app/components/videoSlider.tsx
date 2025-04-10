"use client";
import React, { useEffect, useRef, useState } from "react";
import Video from "./video";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

interface VideoSliderProps {
  category: string;
  videos?: {
    id: string;
    thumbnail: string;
    videoTitle: string;
    videoLink: string;
    createdDate: string;
    views: number;
  }[];
}

const VideoSlider: React.FC<VideoSliderProps> = ({category, videos = []}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -300,
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 300,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
        setShowLeftArrow(scrollLeft > 0);
        setShowRightArrow(scrollLeft < scrollWidth - clientWidth);
      }
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      handleScroll(); // Initial check
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">{convertToTitleCase(category)}</h2>
      <div className="relative">
        {showLeftArrow && (
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full z-10"
          >
            <FaArrowLeft />
          </button>
        )}
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto space-x-4 scrollbar-hide"
        >
          {videos.map((video) => (
            <div key={video.id} className="flex-none w-64">
              <Video 
                thumbnailPath={video.thumbnail}
                videoTitle={video.videoTitle}
                videoLink={video.videoLink}
                deliveredDate={video.createdDate}
                description={`${video.views} views`}
                isLive={false}
              />
            </div>
          ))}
        </div>
        {showRightArrow && (
          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full z-10"
          >
            <FaArrowRight />
          </button>
        )}
      </div>
    </div>
  );
};

const convertToTitleCase = (str: string | undefined | null): string => {
  if (!str) return '';
  return str
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export default VideoSlider;