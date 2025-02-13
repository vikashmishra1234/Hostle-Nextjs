import ImageCarousel from "@/Components/clientComponents/ImageCarousel";
import HomeForm from "@/Components/HomeForm";
import Land from "@/Land";
import React from "react";
import CollegeFooter from "./Footer";
import AboutHostelPage from "./about/About";
import Testimonials from "./Testonomial";

const Home: React.FC = () => {
 
  return (
    <div>
      <Land />
      <AboutHostelPage />
      <ImageCarousel />
      <Testimonials/>
      <HomeForm />
      <CollegeFooter />
    </div>
  );
};

export default Home;
