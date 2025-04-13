"use client";
import React, { useEffect, useRef } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

// Import HLS tech
if (typeof window !== 'undefined') {
  require('@videojs/http-streaming');
}

interface PlayerProps {
  videoId: string;     // Using videoId instead of direct URL
  autoLoop?: boolean;
  autoPlay?: boolean;
  controls?: boolean;
  preload?: 'auto' | 'metadata' | 'none';
  className?: string;
  isLive?: boolean;
  title?: string;      // Title to display in overlay
}

const Player: React.FC<PlayerProps> = ({
  videoId,
  autoLoop = false,
  autoPlay = false,
  controls = true,
  preload = 'auto',
  className = '',
  isLive,
  title,
}) => {
  const videoNode = useRef<HTMLVideoElement | null>(null);
  const playerInstance = useRef<typeof videojs.players | null>(null);

  // Get API URL from environment or use default
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

  // Construct media URLs - using the streaming proxy
  const videoSrc = `${API_URL}/media/${videoId}/master.m3u8`;
  const thumbnailSrc = `${API_URL}/media/${videoId}/thumbnail.webp`;

  console.log("Video ID:", videoId);
  console.log("Video URL:", videoSrc);
  console.log("Thumbnail URL:", thumbnailSrc);
  console.log("Video Title:", title);

  useEffect(() => {
    if (videoNode.current && !playerInstance.current) {
      // Test URL accessibility for debugging
      fetch(videoSrc, {
        method: 'HEAD',
        headers: {
          'Accept': 'application/x-mpegURL',
        },
      })
        .then(response => {
          console.log('M3U8 response status:', response.status);
        })
        .catch(error => console.error('Failed to fetch M3U8:', error));

      const options = {
        autoplay: autoPlay,
        controls,
        loop: autoLoop,
        preload,
        poster: thumbnailSrc,
        sources: [{
          src: videoSrc,
          type: 'application/x-mpegURL',
          withCredentials: false
        }],
        html5: {
          vhs: {
            overrideNative: true,
            enableLowInitialPlaylist: true,
            smoothQualityChange: true
          },
          nativeAudioTracks: false,
          nativeVideoTracks: false
        },
        // YouTube-like UI customizations
        fluid: true,
        playbackRates: [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2],
        userActions: {
          doubleClick: true,
        },
        controlBar: {
          children: [
            'playToggle',
            'volumePanel',
            'currentTimeDisplay',
            'timeDivider',
            'durationDisplay',
            'progressControl',
            'playbackRateMenuButton',
            'fullscreenToggle',
          ],
          volumePanel: {
            inline: false,
            vertical: true
          }
        },
      };

      playerInstance.current = videojs(videoNode.current, options);

      playerInstance.current.ready(() => {
        console.log('Player is ready');
        const player = playerInstance.current;
        if (player) {
          // Add YouTube-like appearance
          player.addClass('vjs-youtube-like');
          
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
  }, [videoId, thumbnailSrc, videoSrc, autoLoop, autoPlay, controls, preload, title]);

  return (
    <div data-vjs-player className="video-container">
      <video
        ref={videoNode}
        className={`video-js vjs-big-play-centered vjs-default-skin vjs-youtube-skin ${className}`}
        playsInline
      />
    </div>
  );
};

export default Player;