"use client";

import React, { useState, useEffect } from "react";
import { FaPlay } from "react-icons/fa";
import Footer from "../shared/footer";
import Header from "../shared/header";

interface Video {
  id: string;
  title?: string; // Video title (optional, can be dynamically fetched)
  duration?: string; // Duration (optional)
}

interface Playlist {
  id: string;
  title: string;
  videos: Video[];
}

// Full playlist data extracted from the image
const playlists: Playlist[] = [
  {
    id: "nithyananda-satsang-2025",
    title: "Nithyananda Satsang 2025",
    videos: [
      { id: "-23ixHuyjtE" },
      { id: "EjOfOIwpVMA" },
      { id: "jOr2zm932_4" },
      { id: "KEqxVh8hk0A" },
      { id: "SV99gDR2rSM" },
      { id: "vV8xOGk5xqU" },
    ],
  },
  {
    id: "shiva-sankalpa-upanishads",
    title: "Shiva Sankalpa Upanishads",
    videos: [
      { id: "0Hg7wA_C6YM" },
      { id: "0q-hvHPUmkI" },
      { id: "5vQ1WR7qIzA" },
      { id: "76SlETUsTXU" },
      { id: "CH06_1r6HNY" },
      { id: "KfMpXoAelrQ" },
      { id: "oYmvgHbIHJk" },
    ],
  },
  {
    id: "narada-bhakti-sutras",
    title: "Narada Bhakti Sutras",
    videos: [
      { id: "bxC_wzAvz9s" },
      { id: "I_P5l7lEaO0" },
      { id: "jYUpPyf_BM4" },
      { id: "p0_RZOfZn1A" },
      { id: "RNFRZFJ1ek8" },
      { id: "RyAKjC3zzHk" },
    ],
  },
  {
    id: "navatattvam",
    title: "Navatattvam (Nine Forms of Paramashiva)",
    videos: [
      { id: "9_vVpuHgSyQ" },
      { id: "c5K92ewEISQ" },
      { id: "GCkeFfd4GHg" },
      { id: "JRF32cQ2Lxk" },
      { id: "juU4YKkY3yU" },
      { id: "LdS5D0mtSwY" },
      { id: "mJgfp8fJ1Cc" },
      { id: "N4mS6KyqL1I" },
      { id: "N7TuH1-q5BY" },
      { id: "Qz2SpugMIS4" },
      { id: "uAd1SOVbwQ4" },
      { id: "z6zAmTD8-yQ" },
      { id: "ZicuC1r3tg8" },
    ],
  },
  {
    id: "experience-paramashiva",
    title: "Experience Paramashiva as Your First Person!",
    videos: [
      { id: "0Ns27YiS6XA" },
      { id: "8B7OMm3Uy5o" },
      { id: "dpQjeZjhBB4" },
      { id: "FQp3YtvFN5g" },
      { id: "GLWFGySLh1Y" },
      { id: "IOi6iZ-_Ayo" },
      { id: "J2zB7Kx8aFg" },
      { id: "Jo6gZ31yTs4" },
      { id: "KiCXBCCizKI" },
      { id: "NDjtZOk9vqk" },
      { id: "oNwuJr50PIc" },
      { id: "sc8bwopEzro" },
      { id: "TcDAv8swodU" },
      { id: "XIf_rdAlFVk" },
      { id: "Xnpv1Hd6ziI" },
      { id: "xRRQvQGenT0" },
    ],
  },
  {
    id: "be-unclutched",
    title: "Be Unclutched",
    videos: [
      { id: "Z5_Pn9ggtP0" },
      { id: "ylt6a4h8JOM" },
      { id: "XYyoBtJYh-M" },
      { id: "Xq7woIeav8Y" },
      { id: "XBGuOcZ6HSc" },
      { id: "WlSk4Q7WbXQ" },
      { id: "vs7pHhSVD3A" },
      { id: "VGrr_xMG76Q" },
      { id: "vCQp1N9EI2o" },
      { id: "V_Z-VWeestE" },
      { id: "T9_4TR4HqmU" },
    ],
  },
  {
    id: "en-wealth",
    title: "eN Wealth",
    videos: [
      { id: "Zup2iKTBPaA" },
      { id: "ZPj8e5T8Og0" },
      { id: "YL1xzoSaFhY" },
      { id: "vBXiFSwO0XY" },
      { id: "upnxzu43oDg" },
      { id: "UA27FKA882o" },
      { id: "tPqXUOObvqk" },
      { id: "sSGAva8U0p0" },
    ],
  },
  {
    id: "nithya-kriya",
    title: "Nithya Kriya: Care & Cure",
    videos: [
      { id: "0iMvHH9JJd8" },
      { id: "47_0RLvOOGs" },
      { id: "4VQHhMADrSU" },
      { id: "7kyP63nUWhg" },
    ],
  },
  {
    id: "webinars",
    title: "Webinars",
    videos: [
      { id: "2Mivy4A-Xmc" },
      { id: "bQVdF_AY2QI" },
      { id: "FAqIPRuAE0s" },
      { id: "GI_SN7AHFwo" },
    ],
  },
];

const Playlists = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="bg-white text-gray-800 font-sans">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Custom Scrollbar CSS */}
        <style jsx global>{`
          .orange-scrollbar::-webkit-scrollbar {
            height: 4px;
            background-color: transparent;
          }

          .orange-scrollbar::-webkit-scrollbar-thumb {
            background: linear-gradient(to right, #ff9901, #ff7801);
            border-radius: 4px;
          }

          .orange-scrollbar::-webkit-scrollbar-track {
            background: #f1f1f1;
            border-radius: 4px;
          }

          .orange-scrollbar {
            scrollbar-width: thin;
            scrollbar-color: #ff9901 #f1f1f1;
          }
        `}</style>

        {/* Render playlists */}
        {playlists.map((playlist) => (
          <div key={playlist.id} className="mb-8">
            <div className="flex items-center mb-4">
              <h2 className="text-xl font-bold text-black mr-4">{playlist.title}</h2>
              <button className="flex items-center text-black hover:text-orange-500 transition-colors duration-300">
                <FaPlay className="mr-2" size={14} />
                <span>Play all</span>
              </button>
            </div>

            <div className="orange-scrollbar overflow-x-auto pb-2 mb-2">
              <div className="flex space-x-4">
                {(isMobile ? playlist.videos.slice(0, 12) : playlist.videos).map((video) => (
                  <div key={video.id} className="flex-shrink-0 w-44">
                    <a
                      href={`https://ott-ui.koogle.sk/play?id=${video.id}`}
                      className="block aspect-[9/16] w-full rounded-lg overflow-hidden mb-2 bg-gray-100 relative"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={`https://ott-backend.koogle.sk/media/${video.id}/thumbnail.webp`}
                        alt={`Thumbnail for ${video.id}`}
                        className="w-full h-full object-cover"
                      />
                    </a>
                    <div className="text-left">
                      <p className="text-sm font-medium text-black truncate">Video {video.id}</p>
                      <p className="text-xs text-gray-500">{video.duration || "Duration not available"}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default Playlists;
