"use client";

import Footer from "../shared/footer";
import Header from "../shared/header";
import Player from "../components/player";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import LiveChat from "../components/livechat";

interface IVideoData {
  videoLink: string;
  thumbnailPath: string;
  videoTitle: string;
  isLive?: boolean;
  deliveredDate?: string;
  description?: string;
}

const Play = () => {

  const searchParams = useSearchParams();
  const thumbnailPath = searchParams.get('thumbnailPath');
  const videoTitle = searchParams.get('videoTitle');
  const videoLink = searchParams.get('videoLink');
  const description = searchParams.get('description');
  const deliveredDate = searchParams.get('deliveredDate');
  const isLive = searchParams.get('isLive') === 'true';
  const [videoData, setVideoData] = useState<IVideoData | null>();
  
  useEffect(() => {
    if (thumbnailPath && videoTitle && videoLink) {
      setVideoData({
        thumbnailPath: thumbnailPath as string,
        videoTitle: videoTitle as string,
        videoLink: videoLink as string,
        description: description as string,
        deliveredDate: deliveredDate as string,
        isLive: true, //TEMPORARILY HARDCODED. Replace with isLive later.
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
        <div className="p-4  w-full flex">
          <div className="w-3/5 flex flex-col">
            <Player 
              videoSrc={videoData.videoLink} 
              thumbnail={videoData.thumbnailPath} 
              autoLoop={false} 
              autoPlay={true} 
              controls={true} 
              preload="auto" 
              className="flex-grow flex-shrink"
            />
            <h1 className="text-4xl font-bold mt-4">{videoData.videoTitle}</h1>
            <h3 className="text-2xl mt-2">{videoData.description}</h3>
            {videoData.deliveredDate && (
              <h5 className="text-lg mt-2">Delivered Date: {videoData.deliveredDate}</h5>
            )}
          </div>
          {videoData.isLive && (
            <div className="w-2/5 ml-4 flex-grow flex-shrink flex-col max-h-200px">
              <LiveChat />
            </div>
          )}
        </div>
      </div>
      <Footer /> 
    </div>
  );
};

export default Play;