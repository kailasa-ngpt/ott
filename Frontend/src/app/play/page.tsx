"use client";

import React, { Suspense, useEffect, useState } from "react";
import Footer from "../shared/footer";
import Header from "../shared/header";
import Player from "../components/player";
import { useSearchParams } from "next/navigation";
// import LiveChat from "../components/livechat";

interface IVideoData {
  id: string;           // Video ID - this becomes the key field
  videoTitle: string;
  description?: string;
  deliveredDate?: string;
  isLive?: boolean;
}

// This component will use useSearchParams
function PlayContent() {
  const searchParams = useSearchParams();
  const thumbnailPath = searchParams.get('thumbnailPath');
  const videoTitle = searchParams.get('videoTitle');
  const videoLink = searchParams.get('videoLink');
  const description = searchParams.get('description');
  const deliveredDate = searchParams.get('deliveredDate');
  const isLive = searchParams.get('isLive') === 'true';
  const [videoData, setVideoData] = useState<IVideoData | null>();

  useEffect(() => {
    const videoId = searchParams.get('id');
    if (videoId) {
      // Fetch video metadata from your API
      fetch(`/api/videos/${videoId}`)
        .then(response => response.json())
        .then(data => {
          setVideoData({
            id: videoId,
            videoTitle: data.title || searchParams.get('videoTitle') || 'Untitled Video',
            description: data.description || searchParams.get('description') || '',
            deliveredDate: data.deliveredDate || searchParams.get('deliveredDate') || '',
            isLive: data.isLive || searchParams.get('isLive') === 'true' || false,
          });
        })
        .catch(error => {
          console.error('Error fetching video:', error);
          // Fallback to URL parameters if API fails
          setVideoData({
            id: videoId,
            videoTitle: searchParams.get('videoTitle') || 'Untitled Video',
            description: searchParams.get('description') || '',
            deliveredDate: searchParams.get('deliveredDate') || '',
            isLive: searchParams.get('isLive') === 'true' || false,
          });
        });
    }
  }, [searchParams]);

  if (!videoData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mx-auto flex-grow w-full max-w-screen-xl">
      <div className="bg-black">
        <div className="player-wrapper w-full relative pt-[56.25%]">
          <div className="absolute top-0 left-0 right-0 bottom-0">
            <Player
              videoId={videoData.id}
              autoLoop={false}
              autoPlay={true}
              controls={true}
              preload="auto"
              className="w-full h-full"
              title={videoData.videoTitle}
            />
          </div>
        </div>
      </div>
      
      <div className="px-4 py-3 bg-white">
        <h1 className="text-xl font-bold text-black mb-1">{videoData.videoTitle}</h1>
        
        <div className="flex justify-between items-center mb-4">
          <div className="text-sm text-gray-500">
            {videoData.deliveredDate && (
              <span>Published on {videoData.deliveredDate}</span>
            )}
          </div>
          
          <div className="flex space-x-4">
            <button className="flex items-center text-gray-700">
              <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-1.91l-.01-.01L23 10z"></path>
              </svg>
              Like
            </button>
            <button className="flex items-center text-gray-700">
              <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 3H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v1.91l.01.01L1 14c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L9.83 23l6.59-6.59c.36-.36.58-.86.58-1.41V5c0-1.1-.9-2-2-2zm4 0v12h4V3h-4z"></path>
              </svg>
              Dislike
            </button>
            <button className="flex items-center text-gray-700">
              <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 9V5l7 7-7 7v-4.1c-5 0-8.5 1.6-11 5.1 1-5 4-10 11-11z"></path>
              </svg>
              Share
            </button>
          </div>
        </div>
        
        <div className="pt-3 border-t border-gray-200">
          <div className="text-sm text-gray-800 whitespace-pre-line">
            {videoData.description}
          </div>
        </div>
      </div>
      
      {videoData.isLive && (
        <div className="mt-4 bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-2">Live Chat</h3>
          <div className="bg-gray-100 h-64 rounded overflow-y-auto">
            {/* LiveChat component would go here */}
            <div className="p-4 text-center text-gray-500">
              Live chat is currently disabled
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const Play = () => {
  return (
    <div className="bg-gray-100 text-gray-800 font-sans flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Suspense fallback={<div>Loading video details...</div>}>
          <PlayContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

export default Play;