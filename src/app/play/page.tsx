"use client";

import Footer from "../shared/footer";
import Header from "../shared/header";
import Player from "../components/player";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface IVideoData {
  videoLink: string;
  thumbnailPath: string;
  videoTitle: string;
}

const Play = () => {

  const searchParams = useSearchParams();
  const thumbnailPath = searchParams.get('thumbnailPath');
  const videoTitle = searchParams.get('videoTitle');
  const videoLink = searchParams.get('videoLink');
  const [videoData, setVideoData] = useState<IVideoData | null>();
  console.log("videoLink:");
  console.log(videoLink);
  
  useEffect(() => {
    if (thumbnailPath && videoTitle && videoLink) {
      setVideoData({
        thumbnailPath: thumbnailPath as string,
        videoTitle: videoTitle as string,
        videoLink: videoLink as string,
      });
    }
  }, [thumbnailPath, videoTitle, videoLink]);

  if (!videoData) {
    return <div>Loading...</div>;
  }

  if (!videoData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-[#220E0E] text-white font-sans flex flex-col min-h-screen">
      <Header />
      <div className="mx-auto flex-grow flex flex-col justify-center items-center">
        <div className="p-4  w-full">
        <div className="relative"> 
            <Player 
              videoSrc={videoData.videoLink} 
              thumbnail={videoData.thumbnailPath} 
              autoLoop={false} 
              autoPlay={true} 
              controls={true} 
              preload="auto" 
            />
          </div>
        </div>
      </div>
      <Footer /> 
    </div>
  );
};

export default Play;