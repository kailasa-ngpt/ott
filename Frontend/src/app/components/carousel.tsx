"use client";
import { useState, useEffect, JSX } from "react";
import PlaceholderImage from "./PlaceholderImage";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

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
    <div className="relative w-full">
      <div
        className="relative h-[400px] w-full"
        onMouseOver={handleMouseOver}
        onMouseLeave={handleMouseLeave}
      >
        <div className="relative w-full h-full">
          <div className="w-full h-full overflow-hidden">
            <PlaceholderImage 
              width={1200} 
              height={400} 
              text={images[currentIndex].title}
              bgColor={images[currentIndex].color}
              textColor="#ffffff"
            />
          </div>
        </div>
      </div>
      <button
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-transparent text-white p-2 z-10"
        onClick={prevSlide}
      >
        <FaChevronLeft size={28} />
      </button>
      <button
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-transparent text-white p-2 z-10"
        onClick={nextSlide}
      >
        <FaChevronRight size={28} />
      </button>
      <div className="flex justify-center mt-4">
        {images.map((_, index) => (
          <div
            key={index}
            className={`h-1 w-10 mx-1 ${
              index === currentIndex
                ? "bg-gradient-to-r from-[#ff9901] to-[#ff7801] rounded-xl"
                : "bg-gray-300 rounded-xl"
            } transition-all duration-500 ease-in-out`}
          ></div>
        ))}
      </div>
    </div>
  );
}