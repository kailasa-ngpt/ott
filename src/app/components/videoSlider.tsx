"use client";

import React, { useEffect, useState } from "react";
import { getThumbnails } from "../../services/videoSliderService";
import Thumbnail from "./thumbnail";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const VideoSlider = () => {
  const [videos, setVideos] = useState<{ thumbnailPath: string; videoTitle: string; videoLink: string; views: number; createdDate: string }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getThumbnails() as { thumbnailPath: string; videoTitle: string; videoLink: string; views: number; createdDate: string }[];
      setVideos(data);
    };
    fetchData();
  }, []);

  const scrollLeft = () => {
    const slider = document.querySelector(".video-slider");
    if (slider) {
      slider.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    const slider = document.querySelector(".video-slider");
    if (slider) {
      slider.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <div className="relative">
      {/* Left Scroll Button */}
      <button
        onClick={scrollLeft}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 w-10 h-10 rounded-full hover:bg-gray-700 z-10"
      >
        <FaArrowLeft />
      </button>

      {/* Video Slider */}
      <div className="video-slider flex gap-4 overflow-x-auto scroll-smooth py-4 px-6 w-full">
        {videos.map((video, index) => (
          <div key={index} className="flex-shrink-0 w-80">
            <Thumbnail
              thumbnailPath={video.thumbnailPath}
              videoTitle={video.videoTitle}
              videoLink={video.videoLink}
              createdDate={video.createdDate}
              views={video.views}/>
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
  );
};

export default VideoSlider;
