"use client"

import { useState, useEffect } from "react"
import { ParallaxBanner, ParallaxProvider } from "react-scroll-parallax"

const images = [
  "https://www.bsacet.org/wp-content/uploads/2024/03/bsa-5.jpeg",
  "https://www.bsacet.org/wp-content/uploads/2024/10/IMG_7869-scaled.jpg",
  "https://www.bsacet.org/wp-content/uploads/2024/10/IMG_7797-scaled.jpg",
  "https://www.bsacet.org/wp-content/uploads/2024/07/WhatsApp-Image-2024-07-18-at-2.33.06-PM.jpeg",
]

export default function EnhancedLanding() {
  const [currentImage, setCurrentImage] = useState(0)
  const [fade, setFade] = useState(false)

  const nextImage = () => {
    setFade(true)
    setTimeout(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length)
      setFade(false)
    }, 500)
  }

  const prevImage = () => {
    setFade(true)
    setTimeout(() => {
      setCurrentImage((prevImage) => (prevImage - 1 + images.length) % images.length)
      setFade(false)
    }, 500)
  }

  useEffect(() => {
    const interval = setInterval(nextImage, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <ParallaxProvider>
      <div className="relative h-[70vh] md:h-[calc(100vh-100px)] overflow-hidden">
        <ParallaxBanner
          layers={[
            {
              image: images[currentImage],
              speed: -30,
            },
          ]}
          className={`h-full transition-opacity duration-500 ${fade ? "opacity-0" : "opacity-100"}`}
        />
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center px-4">Welcome to Our Campus</h1>
          <p className="text-xl md:text-2xl mb-8 text-center px-4">Discover the beauty and innovation of our institution</p>
          <button className="px-6 py-3 text-lg font-semibold text-white bg-transparent border-2 border-white rounded-full hover:bg-white hover:text-black transition-colors duration-300">
            Learn More
          </button>
        </div>
        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full ${
                currentImage === index ? "bg-white" : "bg-white bg-opacity-50"
              }`}
              onClick={() => setCurrentImage(index)}
            />
          ))}
        </div>
        <button
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-full transition-colors duration-300"
          onClick={prevImage}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-full transition-colors duration-300"
          onClick={nextImage}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </ParallaxProvider>
  )
}

