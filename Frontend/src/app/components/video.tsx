"use client";

import React from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import { useRouter } from "next/navigation";

interface VideoProps {
  id: string;            // Video ID
  videoTitle: string;
  deliveredDate: string | null;
  description: string;
  isLive: boolean | null;
}

const Video: React.FC<VideoProps> = ({
  id = '',
  videoTitle = 'Untitled Video',
  deliveredDate = null,
  description = '',
  isLive = false
}) => {
  const router = useRouter();
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

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

  // Construct thumbnail URL using the media proxy
  const thumbnailUrl = `${API_URL}/media/${id}/thumbnail.webp`;

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