import Footer from "../shared/footer";
import Header from "../shared/header";

const Live = () => {
  return (
    <div className="bg-[#220E0E] text-white font-sans">
      <Header />
      <div className="container mx-auto px-4 flex-grow min-h-screen">
        <h1 className="text-4xl font-bold">Welcome to the Live page!</h1>
      </div>
      <Footer /> 
    </div>
  );
}

export default Live;