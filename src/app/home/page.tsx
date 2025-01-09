import ImageSlider from "../components/imageSlider";
import Footer from "../shared/footer";
import Header from "../shared/header";
import Thumbnail from "../components/thumbnail";

const Home = () => {
  return (
    <div className="bg-[#220E0E] text-white font-sans min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-col items-center mt-1">
        <ImageSlider />
      </div>
      <div className="mt-4 w-full max-w-md">
        <Thumbnail
            thumbnailPath="/ThumbnailImages/sampleImage1.png"
            videoTitle="Sample Video1"
            videoLink="https://www.youtube.com/watch?v=43HMoUIj830"
            createdDate="Jan 9, 2025"
            views={12345}/>
      </div>
      <Footer /> 
    </div>
  );
}

export default Home;