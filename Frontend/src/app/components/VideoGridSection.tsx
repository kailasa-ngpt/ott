"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import PlaceholderImage from './PlaceholderImage';

// Sample movie/video data - expanded to 12 videos to fill 4 rows of 3 videos
const sampleVideos = [
  { id: 1, title: 'Yogic Powers 1', category: 'Spiritual', year: '2023', color: '#e57373' },
  { id: 2, title: 'Yogic Powers 2', category: 'Spiritual', year: '2023', color: '#81c784' },
  { id: 3, title: 'Yogic Powers 3', category: 'Spiritual', year: '2023', color: '#64b5f6' },
  { id: 4, title: 'Meditation Session', category: 'Meditation', year: '2023', color: '#ffb74d' },
  { id: 5, title: 'Inner Consciousness', category: 'Discourse', year: '2023', color: '#ba68c8' },
  { id: 6, title: 'Divine Wisdom', category: 'Satsang', year: '2023', color: '#4fc3f7' },
  { id: 7, title: 'Path to Enlightenment', category: 'Spiritual', year: '2023', color: '#aed581' },
  { id: 8, title: 'Life Energy', category: 'Meditation', year: '2022', color: '#ffd54f' },
  { id: 9, title: 'The Power of Now', category: 'Discourse', year: '2022', color: '#ff8a65' },
  { id: 10, title: 'Living Consciously', category: 'Satsang', year: '2022', color: '#4db6ac' },
  { id: 11, title: 'Ancient Wisdom', category: 'Spiritual', year: '2022', color: '#9575cd' },
  { id: 12, title: 'Daily Practice', category: 'Meditation', year: '2022', color: '#f06292' },
];

// Filter tags - simplified for mobile view
const tags = [
  { id: 'all', name: 'All' },
  { id: 'courses', name: 'Courses' },
  { id: 'discourses', name: 'Discourses' },
  { id: 'satsangs', name: 'Satsangs' },
  { id: 'meditations', name: 'Meditations' },
  { id: 'kriyas', name: 'Kriyas' },
  { id: 'weekly', name: 'Weekly Satsangs' },
  { id: 'practices', name: 'Daily Practices' },
  { id: 'series', name: 'Video Series' },
  { id: 'workshops', name: 'Workshops' },
];

// Section tabs
const sections = [
  { id: 'new', name: 'New Releases' },
  { id: 'trending', name: 'Top Trending' },
];

const VideoGridSection: React.FC = () => {
  const [activeSection, setActiveSection] = useState('new');
  const [activeTag, setActiveTag] = useState('all');
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile devices
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Check on initial load
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="w-full bg-white text-black py-8">
      <div className="container mx-auto px-4">
        {/* Section Tabs */}
        <div className="flex justify-center space-x-6 mb-6">
          {sections.map(section => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`${isMobile ? 'text-base' : 'text-lg'} ${
                activeSection === section.id
                  ? 'text-black font-bold border-b-2 border-[#ff9901]'
                  : 'text-gray-500'
              }`}
            >
              {section.name}
            </button>
          ))}
        </div>

        {/* Filter Tags - scrollable */}
        <div className="relative w-full max-w-full mb-8">
          <div className="flex justify-start space-x-4 overflow-x-auto pb-2 px-1 scrollbar-thin">
            {tags.map(tag => (
              <button
                key={tag.id}
                onClick={() => setActiveTag(tag.id)}
                className={`px-4 py-2 rounded-full whitespace-nowrap flex-shrink-0 ${isMobile ? 'text-sm' : 'text-base'} ${
                  activeTag === tag.id
                    ? 'bg-gradient-to-r from-[#ff9901] to-[#ff7801] text-white font-bold'
                    : 'border border-[#ff9901] text-[#ff9901]'
                }`}
              >
                {tag.name}
              </button>
            ))}
          </div>
        </div>

        {/* Videos Grid - Always 3 per row on mobile, 4 rows total */}
        <div className="grid grid-cols-3 gap-2 mb-6">
          {sampleVideos.slice(0, 12).map(video => (
            <div key={video.id} className="flex flex-col">
              <div 
                className="aspect-[9/16] w-full rounded overflow-hidden mb-1 bg-gray-100" 
                style={{ backgroundColor: video.color }}
              >
                {/* This could be an actual image in production */}
              </div>
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