"use client";
import { useState, useEffect, JSX } from "react";
import PlaceholderImage from "../../components/PlaceholderImage";

// Interface for image data
interface ImageData {
  id: number;
  color: string;
  title: string;
}

// Sample carousel images
const images: ImageData[] = [
  { id: 1, color: '#ff9901', title: 'Featured Content 1' },
  { id: 2, color: '#e57373', title: 'Featured Content 2' },
  { id: 3, color: '#81c784', title: 'Featured Content 3' },
  { id: 4, color: '#64b5f6', title: 'Featured Content 4' },
];

export default function Carousel(): JSX.Element {
  // State to keep track of the current image index
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // State to determine if the image is being hovered over
  const [isHovered, setIsHovered] = useState<boolean>(false);

  // Function to show the previous slide
  const prevSlide = (): void => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  // Function to show the next slide
  const nextSlide = (): void => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // useEffect hook to handle automatic slide transition
  useEffect(() => {
    // Start interval for automatic slide change if not hovered
    if (!isHovered) {
      const interval = setInterval(() => {
        nextSlide();
      }, 3000);

      // Cleanup the interval on component unmount
      return () => {
        clearInterval(interval);
      };
    }
  }, [isHovered]);

  // Handle mouse over event
  const handleMouseOver = (): void => {
    setIsHovered(true);
  };

  // Handle mouse leave event
  const handleMouseLeave = (): void => {
    setIsHovered(false);
  };

  return (
    <div className="relative w-full mx-auto items-center justify-center">
      <div
        className="relative h-[400px] mx-12 group"
        onMouseOver={handleMouseOver}
        onMouseLeave={handleMouseLeave}
      >
        <div className="relative w-full h-full">
          <div className="w-full h-full rounded-xl overflow-hidden">
            <PlaceholderImage 
              width={800} 
              height={400} 
              text={images[currentIndex].title}
              bgColor={images[currentIndex].color}
              textColor="#ffffff"
            />
          </div>
        </div>
      </div>
      <button
        className="absolute left-0 top-1/2 transform h-[400px] rounded-xl hover:bg-[#1a222f] mx-1 -mt-[10px] -translate-y-1/2 bg-[#111927] text-white p-2 group"
        onClick={prevSlide}
      >
        &lt;
      </button>
      <button
        className="absolute right-0 top-1/2 transform h-[400px] rounded-xl hover:bg-[#1a222f] mx-1 -mt-[10px] -translate-y-1/2 bg-[#111927] text-white p-2 group"
        onClick={nextSlide}
      >
        &gt;
      </button>
      <div className="flex justify-center mt-4">
        {images.map((_, index) => (
          <div
            key={index}
            className={`h-1 w-10 mx-1 ${
              index === currentIndex
                ? "bg-[#beff46] rounded-xl"
                : "bg-gray-300 rounded-xl"
            } transition-all duration-500 ease-in-out`}
          ></div>
        ))}
      </div>
    </div>
  );
}