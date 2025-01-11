import VideoSlider from "../components/videoSlider";
import Footer from "../shared/footer";
import Header from "../shared/header";

const Home = () => {
  return (
    <div className="bg-[#220E0E] text-white font-sans">
      <Header />
      <div className="container mx-auto px-4 flex-grow min-h-screen">
        <div className="mt-4">
          <div className="w-full flex flex-col items-start">
            <h2 className="text-xl font-bold mt-1">Playlist1</h2>
            <hr className="w-full border-gray-500 my-2" />
          </div>
          <VideoSlider category="playlist1"  />
        </div>

        <div className="mt-4">
          <div className="w-full flex flex-col items-start">
            <h2 className="text-xl font-bold mt-1">Playlist2</h2>
            <hr className="w-full border-gray-500 my-2" />
          </div>
          <VideoSlider category="playlist2"  />
        </div>
      </div>
      <Footer/> 
    </div>
  );
}

export default Home;