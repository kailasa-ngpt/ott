"use client";
import React, { useEffect, useRef } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

// Import HLS tech
if (typeof window !== 'undefined') {
  require('@videojs/http-streaming');
}

interface PlayerProps {
  videoSrc: string;
  thumbnail?: string;
  autoLoop?: boolean;
  autoPlay?: boolean;
  controls?: boolean;
  preload?: 'auto' | 'metadata' | 'none';
  className?: string;
  isLive?: boolean;
}

const Player: React.FC<PlayerProps> = ({
  videoSrc,
  thumbnail = '',
  autoLoop = false,
  autoPlay = false,
  controls = true,
  preload = 'auto',
  className = '', 
  isLive,
}) => {
  const videoNode = useRef<HTMLVideoElement | null>(null);
  const playerInstance = useRef<typeof videojs.players | null>(null);
  console.log("videoSrc at player.tsx:", videoSrc);
  
  useEffect(() => {
    if (videoNode.current && !playerInstance.current) {
      // Add detailed logging
      console.log('Attempting to load video with URL:', videoSrc);
      
      // Test URL accessibility
      fetch(videoSrc, {
        method: 'GET',
        headers: {
          'Accept': 'application/x-mpegURL',
          'Range': 'bytes=0-',
        },
        mode: 'cors',
        credentials: 'omit'
      })
        .then(response => {
          console.log('M3U8 response status:', response.status);
          console.log('M3U8 response headers:', response.headers);
          return response.text();
        })
        .then(content => console.log('M3U8 content:', content))
        .catch(error => console.error('Failed to fetch M3U8:', error));

      const options = {
        autoplay: autoPlay,
        controls,
        loop: autoLoop,
        preload,
        poster: thumbnail,
        sources: [{
          src: videoSrc,
          type: 'application/x-mpegURL',
          withCredentials: false // Explicitly disable credentials
        }],
        html5: {
          vhs: {
            overrideNative: true,
            enableLowInitialPlaylist: true,
            smoothQualityChange: true
          },
          nativeAudioTracks: false,
          nativeVideoTracks: false
        }
      };

      playerInstance.current = videojs(videoNode.current, options);
      
      playerInstance.current.ready(() => {
        console.log('Player is ready');
        const player = playerInstance.current;
        if (player) {
          player.controlBar.addChild('PlaybackRateMenuButton', {});

          player.on('error', (error: Error) => {
            console.error('Player error:', error);
            console.error('Error details:', player.error());
          });

          // Log when metadata is loaded
          player.on('loadedmetadata', () => {
            console.log('Video metadata loaded');
          });

          // Log when playback starts
          player.on('playing', () => {
            console.log('Video playback started');
          });
        }
      });
    }

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
        ref={videoNode}
        className={`video-js vjs-big-play-centered ${className}`}
        playsInline
      />
    </div>
  );
};

export default Player;
