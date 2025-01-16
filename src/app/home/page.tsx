"use client"

import Footer from "../shared/footer";
import Header from "../shared/header";
import Carousel from "../components/carousel";
import VideoSlider from "../components/videoSlider";
import { useEffect, useState } from "react";
import { getSliderData } from "@/services/videoSliderService";

const categories: string[] = ["trending-now", "popular", "guided-meditation", "four-powers"];

interface IVideo {
  thumbnailPath: string;
  videoTitle: string;
  videoLink: string;
  views: number;
  createdDate: string;
}

interface ISlider {
  category: string;
  videos: IVideo[];
}

const Home = () => {
  const [slidersData, setSlidersData] = useState<ISlider[]>([]);

  useEffect(() => {
    const fetchSliderData = async () => {
      let sliders: ISlider[] = [];
      for (const category of categories) {
        const slider = await getSliderData(category);
        sliders = [...sliders, slider];
      }
      setSlidersData(sliders);
    };

    fetchSliderData();
  }, []);

  return (
    <div className="bg-[#220E0E] text-white font-sans min-h-screen flex flex-col">
      <Header />
      <div className="container mx-auto px-4 flex-grow">
        <div className="flex flex-col items-center mt-1">
          <Carousel />
        </div>
        {slidersData.length > 0 && (
          <VideoSlider category={slidersData[0].category} videos={slidersData[0].videos} />
        )}
        {/* Placeholder for livestreams */}
        <div className="mt-4">
          <div className="w-full flex flex-col items-start">
            <h2 className="text-xl font-bold mt-1">Live Streams</h2>
            <hr className="w-full border-gray-500 my-2" />
          </div>
          <div className="w-full bg-gray-800 flex items-center justify-center text-white text-xl">
            Placeholder for Live Streams
          </div>
        </div>
        {slidersData.length > 0 && (
          <VideoSlider category={slidersData[1].category} videos={slidersData[1].videos} />
        )}
        {slidersData.length > 0 && (
          <VideoSlider category={slidersData[2].category} videos={slidersData[2].videos} />
        )}
        {slidersData.length > 0 && (
          <VideoSlider category={slidersData[3].category} videos={slidersData[3].videos} />
        )}
      </div>
      <Footer /> 
    </div>
  );
}

export default Home;