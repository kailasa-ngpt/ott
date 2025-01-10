import Footer from "../shared/footer";
import Header from "../shared/header";
import Carousel from "../components/carousel";
import VideoSlider from "../components/videoSlider";

const Home = () => {
  return (
    <div className="bg-[#220E0E] text-white font-sans min-h-screen flex flex-col">
      <Header />
      <div className="container mx-auto px-4 flex-grow">
        <div className="flex flex-col items-center mt-1">
          <Carousel />
        </div>
        <div className="mt-4">
          <div className="w-full flex flex-col items-start">
            <h2 className="text-xl font-bold mt-1">Trending Now</h2>
            <hr className="w-full border-gray-500 my-2" />
          </div>
          <VideoSlider category="trending-now"  />
        </div>
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
        <div className="mt-4">
          <div className="w-full flex flex-col items-start">
            <h2 className="text-xl font-bold mt-1">Popular</h2>
            <hr className="w-full border-gray-500 my-2" />
          </div>
          <VideoSlider category="popular"/>
        </div>
        <div className="mt-4">
          <div className="w-full flex flex-col items-start">
            <h2 className="text-xl font-bold mt-1">Guided Meditation</h2>
            <hr className="w-full border-gray-500 my-2" />
          </div>
          <VideoSlider category="guided-meditation"/>
        </div>
        <div className="mt-4">
          <div className="w-full flex flex-col items-start">
            <h2 className="text-xl font-bold mt-1">Four Powers</h2>
            <hr className="w-full border-gray-500 my-2" />
          </div>
          <VideoSlider category="four-powers"/>
        </div>
      </div>
      <Footer /> 
    </div>
  );
}

export default Home;