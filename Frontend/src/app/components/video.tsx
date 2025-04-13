"use client";

import React from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import { useRouter } from "next/navigation";
import PlaceholderImage from "./PlaceholderImage";

interface VideoProps {
  id: string;            // Using id instead of thumbnailPath/videoLink
  videoTitle: string;
  deliveredDate: string | null;
  description: string;
  isLive: boolean | null;
}

const Video: React.FC<VideoProps> = ({
  id = '',              // This is now the key identifier
  videoTitle = 'Untitled Video',
  deliveredDate = null,
  description = '',
  isLive = false
}) => {
  const router = useRouter();

  const handleVideoClick = () => {
    // Use video ID in the URL instead of direct links
    const url = new URL('/play', window.location.origin);
    url.searchParams.append('id', id);
    url.searchParams.append('videoTitle', videoTitle);
    if(description) url.searchParams.append('description', description);
    url.searchParams.append('isLive', isLive ? 'true' : 'false');
    if(deliveredDate) url.searchParams.append('deliveredDate', deliveredDate);

    router.push(url.toString());
  };

  // ✅ Add null check before using startsWith
  const thumbnailUrl = `/media/${id}/thumbnail.webp`;

  // Generate random background color for placeholders
  const getRandomColor = () => {
    const colors = ['#e57373', '#81c784', '#64b5f6', '#ffb74d', '#ba68c8', '#4fc3f7', '#aed581'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div onClick={handleVideoClick} className="relative w-40 sm:w-52 lg:w-72 h-auto cursor-pointer group">
      <div className="relative w-full h-24 sm:h-32 lg:h-48">
        {/* Use Next.js Image component with the thumbnail URL */}
        <Image
          src={thumbnailUrl}
          alt={videoTitle}
          layout="fill"
          objectFit="cover"
          className="rounded-xl"
          onError={(e) => {
            // If thumbnail fails to load, use a placeholder
            const target = e.target as HTMLImageElement;
            target.onerror = null; // Prevent infinite loop
            target.src = `/placeholder.webp`; // use a static placeholder image
          }}
        />

        {/* Play Button Overlay - Rest of component unchanged */}
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