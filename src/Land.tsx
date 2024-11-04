"use client";
import { useState, useEffect } from "react";
import { ParallaxBanner, ParallaxProvider } from "react-scroll-parallax";
import "./style.css"; // Import custom CSS for smooth transition

export default function Land() {
  const [currentImage, setCurrentImage] = useState(0); // Track the current image
  const [fade, setFade] = useState(false); // Track the fade animation

  // List of images for the carousel
  const images = [
    "https://www.bsacet.org/wp-content/uploads/2024/03/bsa-5.jpeg",
    "https://www.bsacet.org/wp-content/uploads/2024/10/IMG_7869-scaled.jpg",
    "https://www.bsacet.org/wp-content/uploads/2024/10/IMG_7797-scaled.jpg",
    "https://www.bsacet.org/wp-content/uploads/2024/07/WhatsApp-Image-2024-07-18-at-2.33.06-PM.jpeg",
  ];

  // Automatically switch images with fade effect
  useEffect(() => {
    const interval = setInterval(() => {
      setFade(true); // Trigger fade-out
      setTimeout(() => {
        setCurrentImage((prevImage) => (prevImage + 1) % images.length); // Update image index
        setFade(false); // Remove fade-out after transition
      }, 500); // Ensure fade-out completes before image change
    }, 3000); // 3-second interval

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  return (
    <ParallaxProvider>
      <div
        className={`h-[70vh] md:h-[calc(100vh - 100px)] transition-container ${
          fade ? "fade-out" : "fade-in"
        }`} // Apply fade classes based on state
        style={{ backgroundColor: "#f0f0f0" }}
      >
        <ParallaxBanner
          layers={[
            {
              image: images[currentImage], // Show current image
              speed: -30, // Adjust parallax effect speed
            },
          ]}
          style={{ height: "100%", position: "relative" }}
        />
      </div>
    </ParallaxProvider>
  );
}
