"use client";
import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Image from 'next/image';
import { Home } from 'lucide-react'; // Importing the Home icon from lucide-react

const ImageCarousel = () => {
  const images = [
    'https://www.bsacet.org/wp-content/uploads/2024/03/WhatsApp-Image-2024-03-28-at-12.23.51-PM-6.jpeg',
    'https://www.bsacet.org/wp-content/uploads/2024/08/WhatsApp-Image-2024-08-15-at-11.57.27.jpeg',
    'https://www.bsacet.org/wp-content/uploads/2024/01/IMG_1807-scaled.jpg',
    'https://www.bsacet.org/wp-content/uploads/2024/01/IMG_1830-scaled.jpg',
    'https://www.bsacet.org/wp-content/uploads/2024/01/IMG_1849-scaled.jpg',
    'https://www.bsacet.org/wp-content/uploads/2024/01/IMG_1913-scaled.jpg',
    'https://www.bsacet.org/wp-content/uploads/2023/11/CSE1-scaled.jpg',
  ];

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1024 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 1024, min: 768 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 768, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <div className="my-10 mx-auto w-full md:w-11/12 lg:w-10/12 overflow-hidden px-4">
      {/* Improved Heading with Icon */}
      <div className="flex items-center  gap-2 py-10">
        <Home className="text-blue-500 w-8 h-8" /> {/* Icon added next to the title */}
        <h2 className="font-bold text-2xl md:text-3xl lg:text-4xl text-gray-700">Inside The BSA College Hostel</h2>
      </div>

      <Carousel  responsive={responsive}>
        {images.map((image, index) => (
          <div key={index} className="p-2 md:p-4">
            <div className="relative w-full h-[250px] md:h-[350px] lg:h-[400px]">
              <Image
                src={image}
                alt={`slide-${index}`}
                fill
                className="rounded-lg object-cover shadow-lg"
                sizes="(max-width: 464px) 100vw, 
                       (max-width: 768px) 50vw, 
                       (max-width: 1024px) 33vw, 
                       20vw"
              />
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default ImageCarousel;
