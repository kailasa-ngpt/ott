import React, { useState, useEffect } from "react";
import { FaPlay } from "react-icons/fa";
import { useRouter } from "next/navigation";

interface Video {
  id: string;
  title: string;
  duration: string;
}

interface Playlist {
  id: string;
  title: string;
  videos: Video[];
}

// Example playlist and video data derived from your CSV file
const playlists: Playlist[] = [
  {
    id: "nithyananda-satsang-2025",
    title: "Nithyananda Satsang 2025",
    videos: [
      { id: "-23ixHuyjtE", title: "The Paramasatyas of KAILASA", duration: "33:25" },
      { id: "EjOfOIwpVMA", title: "Paramashiva Sena", duration: "1:09:47" },
      { id: "jOr2zm932_4", title: "Paramashiva's Ultimate Truths", duration: "27:11" },
      { id: "KEqxVh8hk0A", title: "Break Free From Overwhelm", duration: "1:03:08" },
      { id: "SV99gDR2rSM", title: "The 6 Levels of Paramadvaita", duration: "1:18:48" },
      { id: "vV8xOGk5xqU", title: "Paramadvaita & The Social Dimension", duration: "1:15:54" },
      { id: "0Hg7wA_C6YM", title: "Build A Powerful Devotion", duration: "17:12" },
      { id: "0q-hvHPUmkI", title: "#Bhakti: Ultimate Life Insurance", duration: "3:11" },
      { id: "5vQ1WR7qIzA", title: "Shiva Sankalpa Upanishad", duration: "4:18" },
      { id: "76SlETUsTXU", title: "Science of Manifesting Paramashiva", duration: "58:01" },
    ],
  },
  {
    id: "be-unclutched",
    title: "Be Unclutched",
    videos: [
      { id: "XBGuOcZ6HSc", title: "The Secret About Siddhi", duration: "34:16" },
      { id: "XYyoBtJYh-M", title: "Unclutch® from the Idea of You", duration: "27:48" },
      { id: "Xq7woIeav8Y", title: "Powers of Unclutching®", duration: "27:42" },
      { id: "Xnpv1Hd6ziI", title: "Be Free From Karmas!", duration: "16:47" },
      { id: "VGrr_xMG76Q", title: "Unclutch® and Be Liberated", duration: "16:23" },
    ],
  },
  {
    id: "en-wealth",
    title: "eN Wealth",
    videos: [
      { id: "vCQp1N9EI2o", title: "Blissful Living For All", duration: "44:08" },
      { id: "T9_4TR4HqmU", title: "Unclutch® and Truth of the Master", duration: "30:46" },
      { id: "XBGuOcZ6HSc", title: "The Secret About Siddhi", duration: "34:16" },
      { id: "XYyoBtJYh-M", title: "Unclutch® from the Idea of You", duration: "27:48" },
      { id: "Xq7woIeav8Y", title: "Powers of Unclutching®", duration: "27:42" },
    ],
  },
];

const FeaturedPlaylists = () => {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className="w-full py-6 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center mb-6">
          <h1 className="text-2xl font-bold text-black mr-4">Featured Playlists</h1>
          <button onClick={() => router.push("/playlists")} className="text-orange-500 hover:underline">
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
          <div key={playlist.id} className="mb-8">
            <div className="flex items-center mb-4">
              <h2 className="text-xl font-bold text-black mr-4">{playlist.title}</h2>
              <button className="flex items-center text-black hover:text-orange-500 transition-colors duration-300">
                <FaPlay size={14} className="mr-2" />
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
