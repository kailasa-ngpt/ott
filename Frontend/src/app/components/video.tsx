"use client";

import React from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import { useRouter } from "next/navigation";
import PlaceholderImage from "../../components/PlaceholderImage";

interface VideoProps {
  thumbnailPath: string;
  videoTitle: string;
  videoLink: string;
  deliveredDate: string | null;
  description: string;
  isLive: boolean | null;
}

const Video: React.FC<VideoProps> = ({ 
  thumbnailPath, 
  videoTitle, 
  videoLink, 
  deliveredDate, 
  description, 
  isLive 
}) => {
  const router = useRouter();

  const handleVideoClick = () => {
    const url = new URL('/play', window.location.origin);
    url.searchParams.append('thumbnailPath', thumbnailPath);
    url.searchParams.append('videoTitle', videoTitle);
    url.searchParams.append('videoLink', videoLink);
    url.searchParams.append('description', description);
    url.searchParams.append('isLive', isLive ? 'true' : 'false');
    if(deliveredDate) url.searchParams.append('deliveredDate', deliveredDate);

    router.push(url.toString());
  };

  // Check if thumbnailPath starts with http or https for external images
  const isExternalImage = thumbnailPath.startsWith('http://') || thumbnailPath.startsWith('https://');
  
  // Generate random background color for placeholders
  const getRandomColor = () => {
    const colors = ['#e57373', '#81c784', '#64b5f6', '#ffb74d', '#ba68c8', '#4fc3f7', '#aed581'];
    return colors[Math.floor(Math.random() * colors.length)];
  };
  
  return (
    <div onClick={handleVideoClick} className="relative w-40 sm:w-52 lg:w-72 h-auto cursor-pointer group">
      <div className="relative w-40 sm:w-52 lg:w-72 h-auto cursor-pointer group">
        {/* Image */}
        <div className="relative w-full h-24 sm:h-32 lg:h-48">
          {isExternalImage ? (
            <Image
              src={thumbnailPath}
              alt={videoTitle}
              layout="fill"
              objectFit="cover"
              className="rounded-xl"
            />
          ) : (
            <div className="w-full h-full rounded-xl overflow-hidden">
              <PlaceholderImage 
                width={280} 
                height={160} 
                text={videoTitle.substring(0, 20)}
                bgColor={getRandomColor()}
                textColor="#ffffff" 
              />
            </div>
          )}
        </div>

        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity">
          <Play className="text-white w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12" />
        </div>

        {/* Video Info */}
        <div className="mt-1 p-1 text-white rounded-lg">
          <div className="text-sm sm:text-base lg:text-lg font-bold">{videoTitle}</div>
          <div className="text-xs sm:text-sm">{deliveredDate}</div>
        </div>
      </div>
    </div>
  );
};

export default Video;