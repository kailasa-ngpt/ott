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

// Full playlist data 
const playlists: Playlist[] = [
  {
    id: "nithyananda-satsang-2025",
    title: "Nithyananda Satsang 2025",
    videos: [
      { id: "-23ixHuyjtE", title: "The Paramasatyas of KAILASA: Glimpse of KAILASA Manifestating  | Nithyananda Day 2025", duration: "33:26" },
      { id: "EjOfOIwpVMA", title: "Paramashiva Sena: Manifest Paramadvaita In And Around You", duration: "01:09:47" },
      { id: "jOr2zm932_4", title: "Paramashiva's Ultimate Truths About Various Dimensions Of Cosmos", duration: "27:11" },
      { id: "KEqxVh8hk0A", title: "Break Free From Overwhelm: The Path to Paramashiva!", duration: "01:03:08" },
      { id: "SV99gDR2rSM", title: "The 6 Levels of Paramadvaita To Fulfill Your Purpose Of Existence | KAILASA's Makara Sankranti 2025", duration: "01:18:48" },
      { id: "vV8xOGk5xqU", title: "Paramadvaita & The Social Dimension of Spirituality", duration: "01:15:54" }
    ]
  },
  {
    id: "shiva-sankalpa-upanishads",
    title: "Shiva Sankalpa Upanishads",
    videos: [
      { id: "0Hg7wA_C6YM", title: "Build A Powerful Devotion ConsciouslyFrom The Sacred Ecosystem || Nithyananda Satsang || 17 Dec 2024", duration: "17:12" },
      { id: "0q-hvHPUmkI", title: "#Bhakti: Your Ultimate #Life Insurance", duration: "03:11" },
      { id: "5vQ1WR7qIzA", title: "Shiva Sankalpa Upanishad: Revealing Ancient Vedic Wisdom", duration: "04:18" },
      { id: "76SlETUsTXU", title: "The Science of Manifesting Paramashiva Through Your Mind", duration: "58:01" },
      { id: "CH06_1r6HNY", title: "The Root of All Patterns: Your First Fake Response", duration: "04:30" },
      { id: "KfMpXoAelrQ", title: "The #Science of Building #Bhakti", duration: "08:50" },
      { id: "oYmvgHbIHJk", title: "One Decision That Changes Everything: The Power of Guru", duration: "02:55" }
    ]
  },
  {
    id: "narada-bhakti-sutras",
    title: "Narada Bhakti Sutras",
    videos: [
      { id: "bxC_wzAvz9s", title: "Experience the Guru's Grace: The Dance of Paramashiva | Narada Bhakthi Sutra - Satsang Series", duration: "40:04" },
      { id: "I_P5l7lEaO0", title: "Unlock the Mystical Secrets of Guru Puja! | Narada Bhakti Sutras - Satsang Series", duration: "43:52" },
      { id: "jYUpPyf_BM4", title: "Experience Liberation Through Initiation | Narada Bhakthi Sutra - Satsang Series", duration: "09:03" },
      { id: "p0_RZOfZn1A", title: "Illuminate with the Divine Blessings of Guru - Narada Bhakti Sutras Satsang series", duration: "40:51" },
      { id: "RNFRZFJ1ek8", title: "Bhakti - When Your Supreme Love turns Towards God (Narada Bhakti Sutra 2) | 11 July 2007", duration: "01:02:17" },
      { id: "RyAKjC3zzHk", title: "Experience the Power of Abhishekam: Union with the Guru | Narada Bhakti Sutras - Satsang Series", duration: "43:41" }
    ]
  },
  {
    id: "navatattvam",
    title: "Navatattvam (Nine Forms of Paramashiva)",
    videos: [
      { id: "9_vVpuHgSyQ", title: "Celebrate Victory with #KAILASA: This #Navaratri 2024", duration: "13:08" },
      { id: "c5K92ewEISQ", title: "Deeper Revelations On Shivakala: Power Of Anugraha & KAILASA's UN Recognition", duration: "01:05:51" },
      { id: "GCkeFfd4GHg", title: "Discover the Mystical Realms of dhvanikāla☄️✨", duration: "05:31" },
      { id: "JRF32cQ2Lxk", title: "Paramashiva's Revelation: The Nine Dimensions of Existence Within You", duration: "05:14" },
      { id: "juU4YKkY3yU", title: "Unlocking The 9 Tattvas Within You: Paramashiva's Tattvas in You", duration: "39:21" },
      { id: "LdS5D0mtSwY", title: "Secret to Instant Enlightenment Revealed: Deeper Insights To Navatattvas", duration: "59:07" },
      { id: "mJgfp8fJ1Cc", title: "#Vijayadasami Special Satsang & Blessings: Higher #Truths On Navatattvas & How To Apply In Our #Life", duration: "58:35" },
      { id: "N4mS6KyqL1I", title: "The Power of Will: Paramashiva's Message on Overcoming Life's Challenges", duration: "53:20" },
      { id: "N7TuH1-q5BY", title: "GOD REALIZATION GUARANTEED: Paramashiva's Navatattva Revelation | Day 2: Navaratri Special", duration: "54:50" },
      { id: "Qz2SpugMIS4", title: "Experience #Conscious Access To The #Superconscious Access Happening In You", duration: "56:39" },
      { id: "uAd1SOVbwQ4", title: "The True Meaning of Ashtanga #Yoga | #health", duration: "02:14" },
      { id: "z6zAmTD8-yQ", title: "Unlocking the Secrets of Cosmic Consciousness: Deeper Insights Into Paramashiva's Navatattvas", duration: "45:58" },
      { id: "ZicuC1r3tg8", title: "Understanding God: Mathematical vs Existential Oneness", duration: "07:40" }
    ]
  },
  {
    id: "experience-paramashiva",
    title: "Experience Paramashiva as Your First Person!",
    videos: [
      { id: "0Ns27YiS6XA", title: "Transform Your Reality: Ultimate Secrets for a Conscious Existence | Mahasadashiva Murthy Darshan", duration: "26:46" },
      { id: "8B7OMm3Uy5o", title: "Discover Self-Love & Awaken the Divine Within | Linga Murthy Darshan", duration: "06:18" },
      { id: "dpQjeZjhBB4", title: "Find Your True Self & Master All Dimensions of Your Life | Sadashiva Murthy Darshan", duration: "10:33" },
      { id: "FQp3YtvFN5g", title: "Infuse REAL Self-love, Not the Societal Conditioning | Kalyana Sundara Murthy Darshan with SPH", duration: "10:56" },
      { id: "GLWFGySLh1Y", title: "Discover the Four Sacred Paths of Paramashiva! |  BHAGAVAN NITHYANANDA PARAMASHIVA MURTHY", duration: "21:47" },
      { id: "IOi6iZ-_Ayo", title: "Prepare for #AI: Achieve #Conscious Sovereignty and Lead the #Future | Gajamukha Anugraha Darshan", duration: "01:13:05" },
      { id: "J2zB7Kx8aFg", title: "How to Discover the Qualities of Your Life? | Veerabhadra Murthy Darshan", duration: "21:57" },
      { id: "Jo6gZ31yTs4", title: "How to Design Your Body by Conscious Will! | JVARABHAGNA MURTHY DARSHAN |", duration: "14:13" },
      { id: "KiCXBCCizKI", title: "Avatar Intelligence at Artificial Intelligence (AI@ai) | NithyanandaGPT | Bhikshadana Murthy Darshan", duration: "31:34" },
      { id: "NDjtZOk9vqk", title: "Who's Your First Person? | SADA NRITTA MURTHY DARSHAN | #shiva #awakening #transformation", duration: "06:15" },
      { id: "oNwuJr50PIc", title: "Transcending Karma: The First Person Experience of Liberation", duration: "14:01" },
      { id: "sc8bwopEzro", title: "Insights of #Solar #Eclipse From #Hindu Tradition", duration: "25:43" },
      { id: "TcDAv8swodU", title: "First Person Manifestation: The Science of Darshan", duration: "02:28" },
      { id: "XIf_rdAlFVk", title: "The True Source of All Life is Consciousness | Somaskanda Murthy Bhava Samadhi Darshan", duration: "30:12" },
      { id: "Xnpv1Hd6ziI", title: "Be Free From Karmas! | SRI RAMACHANDRA MURTHY DARSHAN", duration: "16:47" },
      { id: "xRRQvQGenT0", title: "First Person Consciousness: Paramashiva's Guide to Thriving in the AI Age", duration: "51:13" }
    ]
  },
  {
    id: "be-unclutched",
    title: "Be Unclutched",
    videos: [
      { id: "Z5_Pn9ggtP0", title: "How to Find My Guru? Nithyanandam, 15 Dec 2005, Align to Guru", duration: "13:55" },
      { id: "ylt6a4h8JOM", title: "You are UnClutched® by your very nature  www.LifeBliss.org", duration: "09:13" },
      { id: "XYyoBtJYh-M", title: "Unclutch® from the Idea of You, Q and A Session, Nithyanandam, 16 Dec 2005", duration: "27:48" },
      { id: "Xq7woIeav8Y", title: "Understand The Powers Of Unclutching®! | Nithyananda Satsang | 16 May 2020", duration: "27:42" },
      { id: "XBGuOcZ6HSc", title: "The Secret and Truth Revealed About Ashtakanma Siddhi | 29 May 2017", duration: "34:16" },
      { id: "WlSk4Q7WbXQ", title: "Unclutch® - doesnt mean laziness", duration: "09:09" },
      { id: "vs7pHhSVD3A", title: "Be Unclutched® worldwide webinar", duration: "01:44" },
      { id: "VGrr_xMG76Q", title: "Unclutch® and Be Liberated", duration: "16:23" },
      { id: "vCQp1N9EI2o", title: "Blissful Living For Al - Unclutching® : Q and A, Nithyanandam , 19 DEC 2005", duration: "44:08" },
      { id: "V_Z-VWeestE", title: "Vibrate With This Universal Truth To Live Enlightenment | Nithyananda Satsang | 17 Feb 2019", duration: "20:17" },
      { id: "T9_4TR4HqmU", title: "Unclutch® and Catch the Truth of the Master, Nithyanandam, 16 Dec 2005", duration: "30:46" }
    ]
  },
  {
    id: "en-wealth",
    title: "eN Wealth",
    videos: [
      { id: "Zup2iKTBPaA", title: "Become a Wealth Magnet || Part 5 || eN Wealth || 10 Apr 2011", duration: "20:06" },
      { id: "ZPj8e5T8Og0", title: "En Wealth Manifest Your Possibility || Part 3 || En Wealth || 09 April 2011", duration: "20:55" },
      { id: "YL1xzoSaFhY", title: "Fundamental Principle to Awaken Wealth Consciousness", duration: "01:28" },
      { id: "vBXiFSwO0XY", title: "eN-Wealth by Nithyananda - Experiences & Sharing", duration: "05:13" },
      { id: "upnxzu43oDg", title: "En Wealth Manifest Your Possibility || Part 8 || En Wealth || 09 April 2011", duration: "19:32" },
      { id: "UA27FKA882o", title: "Four Conclusions for Wealth Consciousness", duration: "02:35" },
      { id: "tPqXUOObvqk", title: "En Wealth Manifest Your Possibility || Part 7 || En Wealth || 09 April 2011", duration: "20:41" },
      { id: "sSGAva8U0p0", title: "En Wealth Manifest Your Possibility || Part 4 || En Wealth || 09 April 2011", duration: "20:57" }
    ]
  },
  {
    id: "nithya-kriya",
    title: "Nithya Kriya: Care & Cure",
    videos: [
      { id: "0iMvHH9JJd8", title: "Introduction to Nithya kriya by Nithyananda", duration: "15:39" },
      { id: "47_0RLvOOGs", title: "Nithya kriya For Curing Heart Disease", duration: "34:49" },
      { id: "4VQHhMADrSU", title: "Nithya kriya for Hypertension Cure", duration: "37:26" },
      { id: "7kyP63nUWhg", title: "Nithya kriya For Curing Obesity", duration: "39:08" }
    ]
  },
  {
    id: "webinars",
    title: "Webinars",
    videos: [
      { id: "2Mivy4A-Xmc", title: "Yoga Webinar and Kriya for Inner Peace | Webinar | 21 Jun 2015", duration: "01:21:41" },
      { id: "bQVdF_AY2QI", title: "Secrets of Karma Revealed by Paramahamsa Nithyananda", duration: "01:31:32" },
      { id: "FAqIPRuAE0s", title: "Shiva Deeksha - Initiation Into Understanding You Are Paramashiva | 23 Nov 2019", duration: "01:08:28" },
      { id: "GI_SN7AHFwo", title: "Secrets of the Third Eye Webinar", duration: "01:10:20" }
    ]
  }
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
                        src={`https://cms.nithyananda.ai/media/${video.id}/thumbnail.webp`}
                        alt={`Thumbnail for ${video.id}`}
                        className="w-full h-full object-cover"
                      />
                    </a>
                    <div className="text-left">
                      <p className="text-sm font-medium text-black truncate">{video.title}</p>
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
