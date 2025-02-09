import React from "react";
import AboutCard from "./Card";
import Marquee from "../clientComponents/Marquee";

interface Props {
  latestNews: string[];
}

const About: React.FC<Props> = ({ latestNews }) => {
  return (
    <div className="container mx-auto px-4">
      <h2 className="text-4xl sm:text-3xl font-semibold text-center my-8">
        BSA Hostel: A Safe Haven
      </h2>
      <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
        {/* Hostel Intro */}
        <div className="text-center md:text-left">
          <h4 className="text-2xl sm:text-xl font-bold text-red-700 mb-6 border-b pb-2">
            Hostel Intro
          </h4>
          <AboutCard />
        </div>

        {/* Latest News */}
        <div className="w-[575px] sm:w-[320px] h-[70vh]">
          <h4 className="text-2xl sm:text-xl font-bold text-red-700 mb-6 border-b pb-2 text-center">
            Latest News
          </h4>
          <Marquee height="100%">
            {latestNews &&
              latestNews.map((news: string, ind: number) => (
                <div key={ind} className="mr-4 ml-4 mb-5 bg-red-100 px-3 py-1 rounded-md">
                  <span className="text-red-600 text-lg sm:text-base font-semibold">
                    {news}
                  </span>
                  <span className="ml-2 text-xs bg-red-500 text-white px-2 py-1 rounded-full">
                    New
                  </span>
                </div>
              ))}
          </Marquee>
        </div>
      </div>
    </div>
  );
};

export default About;
