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
  className?: string; // Add className to the interface
}

const Player: React.FC<PlayerProps> = ({
  videoSrc,
  thumbnail = '',
  autoLoop = false,
  autoPlay = false,
  controls = true,
  preload = 'auto',
  className = '', // Add className to the props
}) => {
  const videoNode = useRef<HTMLVideoElement | null>(null);
  const playerInstance = useRef<typeof videojs.players | null>(null);

  useEffect(() => {
    if (videoNode.current) {
      playerInstance.current = videojs(videoNode.current, {
        autoplay: autoPlay,
        controls,
        loop: autoLoop,
        preload,
        poster: thumbnail,
        sources: [
          {
            src: videoSrc,
            type: 'video/mp4',
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
        }
      });
    }

    return () => {
      if (playerInstance.current) {
        playerInstance.current.dispose();
      }
    };
  }, [videoSrc, thumbnail, autoLoop, autoPlay, controls, preload]);

  return (
    <div>
      <div data-vjs-player>
        <video
          ref={videoNode}
          className={`video-js  ${className}`}
          playsInline
        ></video>
      </div>
    </div>
  );
};

export default Player;
