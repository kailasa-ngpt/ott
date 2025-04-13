"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import PlaceholderImage from './PlaceholderImage';

// CSV data (first 20 records)
const videoData = [
  { id: "-23ixHuyjtE", title: "The Paramasatyas of KAILASA: Glimpse of KAILASA Manifestating | Nithyananda Day 2025", category: "General" },
  { id: "EjOfOIwpVMA", title: "Paramashiva Sena: Manifest Paramadvaita In And Around You", category: "General" },
  { id: "jOr2zm932_4", title: "Paramashiva's Ultimate Truths About Various Dimensions Of Cosmos", category: "General" },
  { id: "KEqxVh8hk0A", title: "Break Free From Overwhelm: The Path to Paramashiva!", category: "General" },
  { id: "SV99gDR2rSM", title: "The 6 Levels of Paramadvaita To Fulfill Your Purpose Of Existence | KAILASA's Makara Sankranti 2025", category: "General" },
  { id: "vV8xOGk5xqU", title: "Paramadvaita & The Social Dimension of Spirituality", category: "General" },
  { id: "0Hg7wA_C6YM", title: "Build A Powerful Devotion ConsciouslyFrom The Sacred Ecosystem || Nithyananda Satsang || 17 Dec 2024", category: "General" },
  { id: "0q-hvHPUmkI", title: "#Bhakti: Your Ultimate #Life Insurance", category: "General" },
  { id: "5vQ1WR7qIzA", title: "Shiva Sankalpa Upanishad: Revealing Ancient Vedic Wisdom", category: "General" },
  { id: "76SlETUsTXU", title: "The Science of Manifesting Paramashiva Through Your Mind", category: "General" },
  { id: "CH06_1r6HNY", title: "The Root of All Patterns: Your First Fake Response", category: "General" },
  { id: "KfMpXoAelrQ", title: "The #Science of Building #Bhakti", category: "General" },
  { id: "oYmvgHbIHJk", title: "One Decision That Changes Everything: The Power of Guru", category: "General" },
  { id: "bxC_wzAvz9s", title: "Experience the Guru's Grace: The Dance of Paramashiva | Narada Bhakthi Sutra - Satsang Series", category: "General" },
  { id: "I_P5l7lEaO0", title: "Unlock the Mystical Secrets of Guru Puja! | Narada Bhakti Sutras - Satsang Series", category: "General" },
  { id: "jYUpPyf_BM4", title: "Experience Liberation Through Initiation | Narada Bhakthi Sutra - Satsang Series", category: "General" },
  { id: "p0_RZOfZn1A", title: "Illuminate with the Divine Blessings of Guru - Narada Bhakti Sutras Satsang series", category: "General" },
  { id: "RNFRZFJ1ek8", title: "Bhakti - When Your Supreme Love turns Towards God (Narada Bhakti Sutra 2) | 11 July 2007", category: "General" }
];

const VideoGridSection = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const videosToDisplay = isMobile ? videoData.slice(0, 12) : videoData.slice(0,20);

  return (
    <div className="w-full bg-white text-black py-8">
      <div className="container mx-auto px-4">
        {/* Videos Grid - Responsive grid with proper breakpoints */}
        <div className={`grid ${
          isMobile 
            ? 'grid-cols-3 gap-2' // 3 columns on mobile
            : 'grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-3 md:gap-4'
          } mb-6`}
        >
          {videosToDisplay.map(video => (
            <div key={video.id} className="flex flex-col">
              <a href={`https://ott-backend.koogle.sk/media/${video.id}/master.m3u8`} target="_blank" rel="noopener noreferrer">
                <div 
                  className="aspect-[9/16] w-full rounded overflow-hidden mb-1 bg-gray-100"
                >
                  <img
                    src={`https://ott-backend.koogle.sk/media/${video.id}/thumbnail.webp`}
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </a>
              <h3 className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium text-center truncate px-1`}>
                {video.title}
              </h3>
              <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-gray-500 text-center`}>
                {video.category}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoGridSection;
