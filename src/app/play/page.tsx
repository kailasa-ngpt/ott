import Footer from "../shared/footer";
import Header from "../shared/header";
import Player from "../components/player"; // Assuming player.tsx is in the components folder

const Play = () => {
  return (
    <div className="bg-[#220E0E] text-white font-sans flex flex-col min-h-screen">
      <Header />
      <div className="mx-auto flex-grow flex flex-col justify-center items-center">
        <div className="p-4  w-full">
        <div className="relative"> 
            <Player 
              videoSrc="/SampleVideos/SampleVideo.mp4" 
              thumbnail="/ThumbnailImages/blessings.png" 
              autoLoop={false} 
              autoPlay={true} 
              controls={true} 
              preload="auto" 
            />
          </div>
        </div>
      </div>
      <Footer /> 
    </div>
  );
};

export default Play;