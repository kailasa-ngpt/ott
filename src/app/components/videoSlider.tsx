"use client";

import React, { useEffect, useRef, useState } from "react";
import Video from "./video";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

interface VideoSliderProps {
  category: string;
  videos: IVideo[]; // Data is passed as a prop
}

interface IVideo {
  Id: number;
  video_id: string;
  CreatedAt: string;
  UpdatedAt: string;
  title: string;
  description: string;
  thumbnail_id: string;
  video_m3u8_id: string;
  duration_secs: number | null;
  delivered_date: string | null;
  uploaded_date: string | null;
}

const VideoSlider: React.FC<VideoSliderProps> = ({category, videos: videos}) => {
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
          {videos.map((video, index) => (
            <div key={index} className="flex-shrink-0 w-80">
              <Video
                thumbnailPath={video.thumbnail_id}
                videoTitle={video.title}
                videoLink={video.video_m3u8_id}
                deliveredDate={video.delivered_date}
                description={video.description}
                isLive={false}
                />
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
  if (str.includes('-') || str.includes(' ')) 
  {
    return str
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  }
  else
  {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
};

export default VideoSlider;
