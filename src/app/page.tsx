// src/pages/Home.tsx

import About from '@/Components/about/About';
import ImageCarousel from '@/Components/clientComponents/ImageCarousel';
import HomeCard from '@/Components/HomeCard';
import HomeForm from '@/Components/HomeForm';

import Land from '@/Land';
import { Box, Container, Typography } from '@mui/material';
import React from 'react';
import CollegeFooter from './Footer';

// Define the type for latestNews
type LatestNews = string[];

const Home: React.FC = () => {
  const latestNews: LatestNews = [
    "New renovations are complete, including updated common areas and enhanced Wi-Fi.",
    "Don’t miss our talent show, cultural night, and sports tournaments this month!",
    "We have introduced new safety measures, including regular sanitization and improved ventilation.",
    "Congrats to our residents for their outstanding academic and extracurricular achievements!",
    "Do not miss our talent show, cultural night, and sports tournaments this month!"
  ];
  const Images:any=[
    {url:"https://www.bsacet.org/wp-content/uploads/2023/07/IMG_3361-scaled.jpg",title:'Mangement Commitee',description:"BSA Hostel's residence is overseen by a dedicated team of administrators and staff members who work together to ensure a safe, orderly, and supportive living environment for students. The administration comprises the following key roles"},
    {url:"https://www.bsacet.org/wp-content/uploads/2024/03/WhatsApp-Image-2024-03-28-at-12.23.51-PM-6.jpeg",description:"BSA College Hostel provides affordable, comfortable accommodation for students enrolled at our institution. We aim to create a secure home away from home where you can focus on your studies while experiencing an enriching communal living environment.",title:'Hostle Facilities'},
   { url:"https://www.bsacet.org/wp-content/uploads/2024/01/IMG_1468-scaled.jpg",description:"BSA College Hostel provides affordable, comfortable accommodation for students enrolled at our institution. We aim to create a secure home away from home where you can focus on your studies while experiencing an enriching communal living environment.",title:'Hostle Introduction'}
  ]

  return (
    <Box component='div'>
      <Land />
      <About latestNews={latestNews} />
      <Container maxWidth={false} sx={{display:'flex',justifyContent:'space-around',flexWrap:'wrap',maxWidth:'1400px'}}>
        {
          Images.map((image:any,ind:any)=>(
            <HomeCard key={ind} description={image.description} title={image.title} imageUrl={image.url}/>
          ))
        }
      </Container>
        <Container maxWidth={false} sx={{maxWidth:'1300px'}}>
        <h3 className='text-[1.8rem] font-bold text-[brown]'>Inside the Hostle</h3>
      <ImageCarousel/>
      <HomeForm/>
        </Container>
        <CollegeFooter/>
    </Box>
  );
};

export default Home;
