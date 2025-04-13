import React, { useState, useEffect } from "react";
import { FaPlay } from "react-icons/fa";
import { useRouter } from "next/navigation";

interface Video {
  id: string;
  title: string;
  duration: string;
}

interface Playlist {
  title: string;
  videos: Video[];
}

// Complete playlists with all video IDs as specified
const playlists: Playlist[] = [
  {
    title: "Nithyananda Satsang 2025",
    videos: [
      { id: "-23ixHuyjtE", title: "The Paramasatyas of KAILASA", duration: "33:25" },
      { id: "EjOfOIwpVMA", title: "Paramashiva Sena", duration: "1:09:47" },
      { id: "jOr2zm932_4", title: "Paramashiva's Ultimate Truths", duration: "27:11" },
      { id: "KEqxVh8hk0A", title: "Break Free From Overwhelm", duration: "1:03:08" },
      { id: "SV99gDR2rSM", title: "The 6 Levels of Paramadvaita", duration: "1:18:48" },
      { id: "vV8xOGk5xqU", title: "Paramadvaita & Social Dimension", duration: "1:15:54" }
    ]
  },
  {
    title: "Be Unclutched",
    videos: [
      { id: "Z5_Pn9ggtP0", title: "Find Your Guru", duration: "13:55" },
      { id: "ylt6a4h8JOM", title: "Unclutch® Nature", duration: "9:13" },
      { id: "XYyoBtJYh-M", title: "Unclutch® from the Idea of You", duration: "27:48" },
      { id: "Xq7woIeav8Y", title: "Powers of Unclutching®", duration: "27:42" },
      { id: "XBGuOcZ6HSc", title: "The Secret About Siddhi", duration: "34:16" },
      { id: "WlSk4Q7WbXQ", title: "Unclutch® - Not Laziness", duration: "9:09" },
      { id: "vs7pHhSVD3A", title: "Unclutched® Webinar", duration: "1:44" },
      { id: "VGrr_xMG76Q", title: "Unclutch® and Be Liberated", duration: "16:23" },
      { id: "vCQp1N9EI2o", title: "Blissful Living For All", duration: "44:08" },
      { id: "V_Z-VWeestE", title: "Universal Truth", duration: "20:17" },
      { id: "T9_4TR4HqmU", title: "Unclutch® and Truth of the Master", duration: "30:46" },
      { id: "SnF-Yb35bsE", title: "Beyond Mind", duration: "20:17" },
      { id: "sDoaod2oSvE", title: "Unclutching® Practice", duration: "15:00" },
      { id: "s8Rxj5Ra9yA", title: "Meditation Insights", duration: "12:30" },
      { id: "RCTQaRU8FDU", title: "Living Consciousness", duration: "18:45" },
      { id: "r1oSyAOXirM", title: "The Art of Letting Go", duration: "22:10" },
      { id: "R-K3bvvdMYg", title: "Conscious Breathing", duration: "14:25" },
      { id: "qbBvTn966XM", title: "Be Present", duration: "19:30" },
      { id: "PhkWeoi4Cdg", title: "Unclutch® Your Worries", duration: "16:50" },
      { id: "OYh5LgIKX3s", title: "Freedom from Patterns", duration: "23:15" },
      { id: "lUC1UasGtuo", title: "World Webinar", duration: "45:20" },
      { id: "lPEHmDW6WqI", title: "Unclutching® Mastery", duration: "28:40" },
      { id: "L5LRUx4S2rY", title: "Mind and Consciousness", duration: "31:15" },
      { id: "ktC0fymyIv4", title: "Breaking Mental Barriers", duration: "24:50" },
      { id: "KKVdPzhOI6A", title: "Enlightened Living", duration: "26:35" },
      { id: "K95opCr9N8E", title: "Spiritual Awakening", duration: "29:45" },
      { id: "IO0RzqiWlro", title: "Higher Consciousness", duration: "22:30" },
      { id: "h4jAwr8MwCQ", title: "Unclutch® Daily Practice", duration: "18:20" },
      { id: "fPD6wnBbIjs", title: "Finding Inner Peace", duration: "21:40" },
      { id: "FoeCKLFj6Gs", title: "Mind Liberation", duration: "27:15" },
      { id: "eT2WYZ53Qgk", title: "Vedic Wisdom for Today", duration: "33:25" },
      { id: "E5YSqVRkaZw", title: "Meditation Fundamentals", duration: "19:50" },
      { id: "DRZGFNEADwE", title: "Path to Liberation", duration: "25:30" },
      { id: "dQGzzkNyG_E", title: "The Science of Unclutching®", duration: "38:15" },
      { id: "d81iiDrXC3g", title: "Consciousness Expansion", duration: "29:40" },
      { id: "C6brpBYbthM", title: "Living in Awareness", duration: "23:55" },
      { id: "bUPhymO5xWQ", title: "Stillness Practice", duration: "17:20" },
      { id: "a0B8hBSejPU", title: "Transcending Thoughts", duration: "26:45" },
      { id: "9nVs2K7vl8Y", title: "Freedom from Suffering", duration: "31:10" },
      { id: "99UTNcwO7Lc", title: "Unclutch® and Flow", duration: "24:30" },
      { id: "8APIdaoY7dQ", title: "Divine Connection", duration: "28:15" },
      { id: "7-u39H3OXBI", title: "Conscious Existence", duration: "32:40" },
      { id: "6ZowJzunTNY", title: "Breaking Patterns", duration: "19:55" },
      { id: "6y1sG3wt-Lc", title: "Present Moment Awareness", duration: "21:20" },
      { id: "6pZuFkZIIks", title: "Beyond Thought Patterns", duration: "27:50" },
      { id: "5yUi_zKs5Iw", title: "Ultimate Consciousness", duration: "30:15" },
      { id: "3wb-QeNb_eE", title: "Spiritual Elevation", duration: "24:40" },
      { id: "2D_TK4ZbpME", title: "Mastering Thoughts", duration: "22:25" },
      { id: "0ErPUzDu864", title: "Path to Inner Peace", duration: "26:10" },
      { id: "-jnEx1YrwaI", title: "Silence and Stillness", duration: "19:45" },
      { id: "-j9gZHYxtsc", title: "Unclutch® Daily Practice", duration: "23:30" }
    ]
  },
  {
    title: "eN Wealth",
    videos: [
      { id: "Zup2iKTBPaA", title: "Wealth Consciousness", duration: "55:41" },
      { id: "ZPj8e5T8Og0", title: "Abundance Principles", duration: "42:15" },
      { id: "YL1xzoSaFhY", title: "Manifesting Prosperity", duration: "38:30" },
      { id: "vBXiFSwO0XY", title: "Wealth and Spirituality", duration: "45:20" },
      { id: "upnxzu43oDg", title: "Creating Material Success", duration: "39:45" },
      { id: "UA27FKA882o", title: "Spiritual Wealth Building", duration: "47:10" },
      { id: "tPqXUOObvqk", title: "Money and Consciousness", duration: "36:25" },
      { id: "sSGAva8U0p0", title: "Abundance Mindset", duration: "41:50" },
      { id: "rAuAwIpBTBw", title: "Attract Wealth Energy", duration: "44:30" },
      { id: "pL020CohyBk", title: "Financial Freedom Insights", duration: "38:15" },
      { id: "OcdJF-qBHHI", title: "Sacred Economics", duration: "43:40" },
      { id: "O5qAwC06S_4", title: "Wealth as Consciousness", duration: "39:55" },
      { id: "mlgTjfQ0e3A", title: "Prosperity Consciousness", duration: "47:20" },
      { id: "kYK37gDRYmU", title: "Divine Abundance", duration: "42:35" },
      { id: "j2Ea7lgT2JE", title: "Wealth Creation Wisdom", duration: "49:10" },
      { id: "GSvxzuNWqD0", title: "Abundance Meditation", duration: "37:45" },
      { id: "gs41KviPCac", title: "Prosperity Principles", duration: "44:30" },
      { id: "GM67Tmpz81w", title: "Wealth Manifestation", duration: "40:15" },
      { id: "G_-ekrMjvtk", title: "Spiritual Money Management", duration: "46:50" },
      { id: "Exh36GDawDk", title: "Creating Conscious Wealth", duration: "43:25" },
      { id: "eg7WHr3D4Os", title: "Financial Liberation", duration: "39:40" },
      { id: "DtEAQswodAA", title: "Abundance Through Service", duration: "45:15" },
      { id: "BiD7M03fKUU", title: "Cosmic Prosperity", duration: "42:30" },
      { id: "BHw9F6nd-xM", title: "Wealth Through Consciousness", duration: "48:55" },
      { id: "8faGMGRegNQ", title: "Creating Prosperity Flow", duration: "44:20" },
      { id: "6ClGVcMskYk", title: "Spiritual Business Building", duration: "41:35" },
      { id: "1UKiNwohASo", title: "Divine Wealth Creation", duration: "47:10" },
      { id: "0t58PL3fREQ", title: "Wealth and Enlightenment", duration: "39:45" },
      { id: "0a1DMVBYj18", title: "Consciousness-Based Prosperity", duration: "45:30" }
    ]
  }
];

const FeaturedPlaylists = () => {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);
  const [playButtonHover, setPlayButtonHover] = useState<string | null>(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className="w-full py-6 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center mb-6">
          <h1 className="text-2xl font-bold text-black mr-4">Featured Playlists</h1>
          <button 
            onClick={() => router.push("/playlists")}
            className="text-orange-500 hover:underline"
          >
            View all
          </button>
        </div>

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

        {playlists.map((playlist) => (
          <div key={playlist.title} className="mb-8">
            <div className="flex items-center mb-4">
              <h2 className="text-xl font-bold text-black mr-4">{playlist.title}</h2>
              {/* <button 
                onMouseEnter={() => setPlayButtonHover(playlist.title)}
                onMouseLeave={() => setPlayButtonHover(null)}
                className="flex items-center text-black hover:text-orange-500 transition-colors duration-300"
              >
                <FaPlay 
                  className="mr-2" 
                  size={14} 
                  color={playButtonHover === playlist.title ? '#f97316' : 'black'} 
                />
                <span>Play all</span>
              </button> */}
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
                        alt={video.title}
                        className="w-full h-full object-cover"
                      />
                    </a>
                    <div className="text-left">
                      <p className="text-sm font-medium text-black truncate">{video.title}</p>
                      <p className="text-xs text-gray-500">{video.duration}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedPlaylists;
