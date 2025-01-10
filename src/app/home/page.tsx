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
        <div className="mt-4 w-full flex flex-col items-start">
          <h2 className="text-xl font-bold mt-1">Trending Now</h2>
          <hr className="w-full border-gray-500 my-2" />
        </div>
        <div className="">
          <VideoSlider />
        </div>
      </div>
      <Footer /> 
    </div>
  );
}

export default Home;