"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import PlaceholderImage from './PlaceholderImage';

// Sample movie/video data
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
  { id: 13, title: 'Spiritual Awakening', category: 'Discourse', year: '2022', color: '#7986cb' },
  { id: 14, title: 'The Eternal Self', category: 'Satsang', year: '2022', color: '#a1887f' },
];

// Filter tags
const tags = [
  { id: 'all', name: 'All' },
  { id: 'discourses', name: 'Discourses' },
  { id: 'satsangs', name: 'Satsangs' },
  { id: 'meditations', name: 'Meditations' },
  { id: 'kriya', name: 'Kriyas' },
];

// Section tabs
const sections = [
  { id: 'new', name: 'New Releases' },
  { id: 'trending', name: 'Top Trending' },
];

const VideoGridSection: React.FC = () => {
  const [activeSection, setActiveSection] = useState('new');
  const [activeTag, setActiveTag] = useState('all');

  return (
    <div className="w-full bg-white text-black py-8">
      <div className="container mx-auto px-4">
        {/* Section Tabs */}
        <div className="flex space-x-6 mb-6">
          {sections.map(section => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`text-lg ${
                activeSection === section.id
                  ? 'text-black font-bold'
                  : 'text-gray-500'
              }`}
            >
              {section.name}
            </button>
          ))}
        </div>

        {/* Filter Tags */}
        <div className="flex space-x-4 mb-8 overflow-x-auto pb-2">
          {tags.map(tag => (
            <button
              key={tag.id}
              onClick={() => setActiveTag(tag.id)}
              className={`px-6 py-2 rounded-full whitespace-nowrap ${
                activeTag === tag.id
                  ? 'bg-gradient-to-r from-[#ff9901] to-[#ff7801] text-white font-bold'
                  : 'border border-[#ff9901] text-[#ff9901]'
              }`}
            >
              {tag.name}
            </button>
          ))}
        </div>

        {/* Videos Grid - First Row */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7 gap-4 mb-8">
          {sampleVideos.slice(0, 7).map(video => (
            <div key={video.id} className="flex flex-col">
              <div className="aspect-[9/16] w-full rounded overflow-hidden mb-2 bg-gray-100">
                <PlaceholderImage
                  width={200}
                  height={355}
                  text=""
                  bgColor={video.color}
                  textColor="#ffffff"
                />
              </div>
              <h3 className="text-sm font-medium">{video.title}</h3>
            </div>
          ))}
        </div>

        {/* Videos Grid - Second Row */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7 gap-4">
          {sampleVideos.slice(7, 14).map(video => (
            <div key={video.id} className="flex flex-col">
              <div className="aspect-[9/16] w-full rounded overflow-hidden mb-2 bg-gray-100">
                <PlaceholderImage
                  width={200}
                  height={355}
                  text=""
                  bgColor={video.color}
                  textColor="#ffffff"
                />
              </div>
              <h3 className="text-sm font-medium">{video.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoGridSection;