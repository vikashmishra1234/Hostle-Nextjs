"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

// Sample testimonials data
const testimonials = [
  {
    name: "Rahul Sharma",
    image: "https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o=",
    review:
      "The hostel facilities are top-notch, and the environment is very friendly. I have made lifelong friends here!",
    year: "B.Tech - 3rd Year",
  },
  {
    name: "Ananya Verma",
    image: "https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o=",
    review:
      "The food is great, and the hostel staff is very supportive. It's truly a home away from home!",
    year: "MBA - 2nd Year",
  },
  {
    name: "Vikram Singh",
    image: "https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o=",
    review:
      "The Wi-Fi, study rooms, and sports facilities make student life very convenient and enjoyable.",
    year: "MCA - 1st Year",
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="bg-gray-100 py-16">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-semibold text-gray-800 sm:text-4xl mb-6">
          What Our Students Say
        </h2>

        <div className="relative flex items-center justify-center">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="bg-white shadow-lg rounded-lg p-6 sm:p-8 max-w-lg mx-auto text-left"
          >
            <div className="flex items-center gap-4">
              <Image
                src={testimonials[currentIndex].image}
                alt={testimonials[currentIndex].name}
                width={60}
                height={60}
                className="rounded-full object-cover border-2 border-gray-300"
              />
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {testimonials[currentIndex].name}
                </h3>
                <p className="text-sm text-gray-500">
                  {testimonials[currentIndex].year}
                </p>
              </div>
            </div>
            <p className="mt-4 text-gray-700 text-lg">
              "{testimonials[currentIndex].review}"
            </p>
          </motion.div>

          <button
            onClick={prevTestimonial}
            className="absolute left-0 p-2 text-gray-600 hover:text-gray-800 transition"
          >
            ❮
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-0 p-2 text-gray-600 hover:text-gray-800 transition"
          >
            ❯
          </button>
        </div>

        <div className="flex justify-center mt-6">
          {testimonials.map((_, index) => (
            <span
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 mx-1 rounded-full cursor-pointer ${
                currentIndex === index ? "bg-gray-800" : "bg-gray-400"
              }`}
            ></span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
