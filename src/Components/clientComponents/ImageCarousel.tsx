"use client";

import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Box, CardMedia } from '@mui/material';

const ImageCarousel = () => {
  const images = [
    'https://www.bsacet.org/wp-content/uploads/2024/03/WhatsApp-Image-2024-03-28-at-12.23.51-PM-6.jpeg',
    'https://www.bsacet.org/wp-content/uploads/2024/03/WhatsApp-Image-2024-03-28-at-12.23.51-PM-6.jpeg',
    'https://www.bsacet.org/wp-content/uploads/2024/03/WhatsApp-Image-2024-03-28-at-12.23.51-PM-6.jpeg',
    'https://www.bsacet.org/wp-content/uploads/2024/03/WhatsApp-Image-2024-03-28-at-12.23.51-PM-6.jpeg',
    'https://www.bsacet.org/wp-content/uploads/2024/03/WhatsApp-Image-2024-03-28-at-12.23.51-PM-6.jpeg',
    'https://www.bsacet.org/wp-content/uploads/2024/03/WhatsApp-Image-2024-03-28-at-12.23.51-PM-6.jpeg',
    'https://www.bsacet.org/wp-content/uploads/2024/03/WhatsApp-Image-2024-03-28-at-12.23.51-PM-6.jpeg',
    'https://www.bsacet.org/wp-content/uploads/2024/03/WhatsApp-Image-2024-03-28-at-12.23.51-PM-6.jpeg',
    'https://www.bsacet.org/wp-content/uploads/2024/03/WhatsApp-Image-2024-03-28-at-12.23.51-PM-6.jpeg',
    'https://www.bsacet.org/wp-content/uploads/2024/03/WhatsApp-Image-2024-03-28-at-12.23.51-PM-6.jpeg',
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
<Box sx={{ mt: 2, maxWidth: '100%', overflow: 'hidden' }}>
  <Carousel 
    responsive={responsive} 
  
  >
    {images.map((image, index) => (
      <Box key={index} sx={{ padding: 1 }}>
        <CardMedia
          component="img"
          image={image}
          alt={`slide-${index}`}
          sx={{ borderRadius: '8px', height: '250px', objectFit: 'cover', width: '100%' }}
        />
      </Box>
    ))}
  </Carousel>
</Box>


  );
};

export default ImageCarousel;
