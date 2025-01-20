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
  className = '', 
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
            //src: videoSrc,
            src: "https://pub-67940a2fbfa149ebb363693bbb5df7f0.r2.dev/a1507a17-b5b3-4cab-af09-31b69df46272/master.m3u8",
            type: getMimeType(videoSrc),
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

const getMimeType = (videoSrc: string) => {
  const extension = videoSrc.split('.').pop();
  switch (extension) {
    case 'mp4':
      return 'video/mp4';
    case 'webm':
      return 'video/webm';
    case 'ogg':
      return 'video/ogg';
    case 'm3u8':
      return 'application/x-mpegURL';
    default:
      return 'video/mp4'; // Default to MP4 if the extension is unknown
  }
};

export default Player;
