"use client";

import { useEffect, useState } from "react";
import Header from "../shared/header";
import Footer from "../shared/footer";
import Carousel from "../components/carousel";
import VideoGridSection from "../components/VideoGridSection";
import FeaturedPlaylists from "../components/FeaturedPlaylists";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if we're on mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-white text-black font-sans min-h-screen flex flex-col">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className={`flex-grow ${isMobile ? 'pb-16' : ''}`}>
        {isLoading ? (
          <div className="flex justify-center items-center h-96">
            <div className="animate-pulse text-orange-500">Loading...</div>
          </div>
        ) : (
          <>
            {/* Hero Carousel Section */}
            <section className="w-full mb-8">
              <Carousel />
            </section>

            {/* Video Grid Sections */}
            <section className="w-full container mx-auto px-4">
              <VideoGridSection />
            </section>

            {/* Featured Playlists Section */}
            <FeaturedPlaylists />

            {/* Additional sections - Include the proper padding on mobile */}
            <section className="container mx-auto px-4 py-8">
              <h2 className="text-2xl font-bold mb-4">Recommended For You</h2>
              <div className="bg-gray-100 p-8 rounded-lg text-center">
                <p className="text-gray-500">Personalized recommendations will appear here</p>
              </div>
            </section>
          </>
        )}
      </main>

      {/* Footer - Add bottom padding on mobile to prevent content from being hidden behind the bottom nav */}
      <Footer />
    </div>
  );
};

export default Home;