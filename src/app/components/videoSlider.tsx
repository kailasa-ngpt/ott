"use client";

import React, { useEffect, useRef, useState } from "react";
import Thumbnail from "./thumbnail";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

interface VideoSliderProps {
  category: string;
  thumbnails: Thumbnail[]; // Data is passed as a prop
}

interface Thumbnail {
  thumbnailPath: string;
  videoTitle: string;
  videoLink: string;
  views: number;
  createdDate: string;
}

const VideoSlider: React.FC<VideoSliderProps> = ({category, thumbnails}) => {
  //const [videos, setVideos] = useState<{ thumbnailPath: string; videoTitle: string; videoLink: string; views: number; createdDate: string }[]>([]);
  const sliderRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const data = await getThumbnails(category) as { thumbnailPath: string; videoTitle: string; videoLink: string; views: number; createdDate: string }[];
  //     setVideos(data);
  //   };
  //   fetchData();
  // }, [category]);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <div className="mt-4">
            <div className="w-full flex flex-col items-start">
              <h2 className="text-xl font-bold mt-1">{convertToTitleCase(category)}</h2>
              <hr className="w-full border-gray-500 my-2" />
            </div>
            <div className="relative">
        {/* Left Scroll Button */}
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 w-10 h-10 rounded-full hover:bg-gray-700 z-10"
        >
          <FaArrowLeft />
        </button>

        {/* Video Slider */}
        <div ref={sliderRef} className="video-slider flex gap-4 overflow-x-auto scroll-smooth py-4 px-6 w-full">
          {thumbnails.map((thumbnail, index) => (
            <div key={index} className="flex-shrink-0 w-80">
              <Thumbnail
                thumbnailPath={thumbnail.thumbnailPath}
                videoTitle={thumbnail.videoTitle}
                videoLink={thumbnail.videoLink}
                createdDate={thumbnail.createdDate}
                views={thumbnail.views}/>
            </div>
          ))}
        </div>

        {/* Right Scroll Button */}
        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 w-10 h-10 rounded-full hover:bg-gray-700 z-10"
        >
          <FaArrowRight />
        </button>
      </div>
    </div>
    
  );
};

const convertToTitleCase = (str: string): string => {
  if (str.includes('-')) 
  {
    return str
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  }
  return str;
};

export default VideoSlider;
