import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Play } from "lucide-react";

interface ThumbnailProps {
  thumbnailPath: string;
  videoTitle: string;
  videoLink: string;
  createdDate: string;
  views: number;
}

const Thumbnail: React.FC<ThumbnailProps> = ({ thumbnailPath, videoTitle, videoLink, createdDate, views }) => {
  return (
    <Link href={videoLink}>
      <div className="relative w-40 sm:w-52 lg:w-72 h-auto cursor-pointer group">
        {/* Image */}
        <div className="relative w-full h-24 sm:h-32 lg:h-48">
          <Image
            src={thumbnailPath}
            alt={videoTitle}
            layout="fill"
            objectFit="cover"
            className="rounded-xl"
          />
        </div>

        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity">
          <Play className="text-white w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12" />
        </div>

        {/* Video Info */}
        <div className="mt-1 p-1 text-white rounded-lg">
          <div className="text-sm sm:text-base lg:text-lg font-bold">{videoTitle}</div>
          <div className="text-xs sm:text-sm">{createdDate}</div>
          <div className="text-xs sm:text-sm">{views} views</div>
        </div>
      </div>
    </Link>
  );
};

export default Thumbnail;
