import ImageCarousel from "@/Components/clientComponents/ImageCarousel";
import HomeForm from "@/Components/HomeForm";
import Land from "@/Land";
import React from "react";
import CollegeFooter from "./Footer";
import AboutHostelPage from "./about/About";

const Home: React.FC = () => {
 
  return (
    <div>
      <Land />
      <AboutHostelPage />
      <ImageCarousel />
      <HomeForm />
      <CollegeFooter />
    </div>
  );
};

export default Home;
