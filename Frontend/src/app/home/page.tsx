"use client"

import { useEffect, useState } from "react";
import Header from "../shared/header";
import Footer from "../shared/footer";
import Carousel from "../components/carousel";
import VideoGridSection from "../components/VideoGridSection";
import { getSliderData } from "@/services/videoSliderService";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);

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
      <main className="flex-grow">
        {isLoading ? (
          <div className="flex justify-center items-center h-96">
            <div className="animate-pulse text-orange-500">Loading...</div>
          </div>
        ) : (
          <>
            {/* Hero Carousel Section */}
            <section className="w-full">
              <Carousel />
            </section>
            
            {/* Video Grid Sections */}
            <section className="w-full mt-8">
              <VideoGridSection />
            </section>
            
            {/* Trending Section Placeholder */}
            <section className="container mx-auto px-4 py-8">
              <h2 className="text-2xl font-bold mb-4">Recommended For You</h2>
              <div className="bg-gray-100 p-8 rounded-lg text-center">
                <p className="text-gray-500">Personalized recommendations will appear here</p>
              </div>
            </section>
            
            {/* Continue Watching Section Placeholder */}
            <section className="container mx-auto px-4 py-8">
              <h2 className="text-2xl font-bold mb-4">Continue Watching</h2>
              <div className="bg-gray-100 p-8 rounded-lg text-center">
                <p className="text-gray-500">Your in-progress videos will appear here</p>
              </div>
            </section>
          </>
        )}
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Home;