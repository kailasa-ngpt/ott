import Footer from "../shared/footer";
import Header from "../shared/header";

const Home = () => {
  return (
    <div className="bg-[#220E0E] text-white font-sans">
      <Header />
      <main className="px-6 py-8">
        <h1 className="text-4xl font-bold">Welcome to the Homepage!</h1>
      </main>
      <Footer /> 
    </div>
  );
}

export default Home;