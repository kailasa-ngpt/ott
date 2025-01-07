import ImageSlider from "../components/imageSlider";
import Footer from "../shared/footer";
import Header from "../shared/header";

const Home = () => {
  return (
    <div className="bg-[#220E0E] text-white font-sans">
      <Header />
        <div className="flex min-h-screen flex-col items-center mt-1">
          <ImageSlider />
        </div>
      <Footer /> 
    </div>
  );
}

export default Home;