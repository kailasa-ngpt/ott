"use client";
import React, { useEffect, useRef } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

interface PlayerProps {
  videoSrc: string;
  thumbnail?: string;
  autoLoop?: boolean;
  autoPlay?: boolean;
  controls?: boolean;
  preload?: 'auto' | 'metadata' | 'none';
  className?: string;
}

const Player: React.FC<PlayerProps> = ({
  videoSrc,
  thumbnail = '',
  autoLoop = false,
  autoPlay = false,
  controls = true,
  preload = 'auto',
  className = '', 
}) => {
  const videoNode = useRef<HTMLVideoElement | null>(null);
  const playerInstance = useRef<typeof videojs.players | null>(null);
  console.log("videoSrc at player.tsx:");
  console.log(videoSrc);
  
  useEffect(() => {
    if (videoNode.current && !playerInstance.current) {
      playerInstance.current = videojs(videoNode.current, {
        autoplay: autoPlay,
        controls,
        loop: autoLoop,
        preload,
        poster: thumbnail,
        sources: [
          {
            src: videoSrc,
            type: videoSrc.endsWith('.m3u8') ? 'application/x-mpegURL' : 'video/mp4',          
          },
        ],
      });
      playerInstance.current.ready(() => {
        const player = playerInstance.current;
        if (player) {
          // Adding a playback speed control
          player.controlBar.addChild('PlaybackRateMenuButton', {});

          // Custom event listener
          player.on('ended', () => {
            console.log('Video has ended');
          });

          // Error handling
          player.on('error', () => {
            console.error('Error occurred while loading the video:', player.error());
          });
        }
      });

    }

    // Cleanup function to dispose of the player instance when the component unmounts or videoSrc changes:
    return () => {
      if (playerInstance.current) {
        playerInstance.current.dispose();
        playerInstance.current = null;
      }
    };
  }, [videoSrc, thumbnail, autoLoop, autoPlay, controls, preload]);

  return (
      <div data-vjs-player>
        <video
          height="452" width="768"
          ref={videoNode}
          className={`video-js  ${className}`}
          playsInline
          src = {videoSrc}
        ></video>
      </div>
  );
};

export default Player;
