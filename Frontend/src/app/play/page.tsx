"use client";

import React, { Suspense, useEffect, useState } from "react";
import Footer from "../shared/footer";
import Header from "../shared/header";
import Player from "../components/player";
import { useSearchParams } from "next/navigation";
// import LiveChat from "../components/livechat";

interface IVideoData {
  id: string;           
  title: string;
  description?: string;
  uploadDate?: string;
  videoLength?: number; // Duration in seconds
  categories?: string[];
  tags?: string[];
  streamUrl?: string;
  thumbnailUrl?: string;
  isLive?: boolean;
}

// Format seconds to MM:SS or HH:MM:SS
const formatDuration = (seconds: number): string => {
  if (!seconds) return "0:00";
  
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
};

// Format date to readable format
const formatDate = (dateString: string): string => {
  if (!dateString) return "";
  
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
};

// This component will use useSearchParams
function PlayContent() {
  const searchParams = useSearchParams();
  const videoId = searchParams.get('id');
  const [videoData, setVideoData] = useState<IVideoData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!videoId) {
      setError("No video ID provided");
      setIsLoading(false);
      return;
    }

    // Fetch video metadata from your API
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
    
    fetch(`${API_URL}/api/videos/${videoId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to fetch video data: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setVideoData({
          id: data.id,
          title: data.title || 'Untitled Video',
          description: data.description || '',
          uploadDate: data.uploadDate || '',
          videoLength: data.videoLength || 0,
          categories: data.categories || [],
          tags: data.tags || [],
          streamUrl: data.streamUrl,
          thumbnailUrl: data.thumbnailUrl,
          isLive: data.isLive || false,
        });
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching video:', error);
        setError(error.message);
        setIsLoading(false);
      });
  }, [videoId]);

  if (isLoading) {
    return <div className="flex justify-center items-center h-64">Loading video details...</div>;
  }

  if (error || !videoData) {
    return <div className="flex justify-center items-center h-64 text-red-500">{error || "Failed to load video"}</div>;
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
              title={videoData.title}
            />
          </div>
        </div>
      </div>
      
      <div className="px-4 py-3 bg-white">
        <h1 className="text-xl font-bold text-black mb-1">{videoData.title}</h1>
        
        <div className="mb-4">
          <div className="text-sm text-gray-500 flex items-center">
            {videoData.uploadDate && (
              <span className="mr-3">Published on {formatDate(videoData.uploadDate)}</span>
            )}
            {videoData.videoLength !== undefined && videoData.videoLength > 0 && (
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-0.5-13H13v5.25l4.5 2.67-0.75 1.23L11 13V7z"></path>
                </svg>
                {formatDuration(videoData.videoLength)}
              </span>
            )}
          </div>
        </div>
        
        {videoData.categories && videoData.categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {videoData.categories.map((category: string, index: number) => (
              <span key={index} className="px-2 py-1 text-xs bg-gray-100 rounded-full text-gray-700">
                {category}
              </span>
            ))}
          </div>
        )}
        
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