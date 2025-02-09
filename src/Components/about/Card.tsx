"use client";
import * as React from "react";

export default function AboutCard() {
  return (
    <div className="max-w-[545px] bg-white shadow-lg rounded-lg overflow-hidden">
      {/* Image */}
      <img
        className="w-full h-[320px] object-cover"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwJ8jqVxtT7OFRQcvHXOnJvmVL4BZe8VHCmw&s"
        alt="Hostel"
      />

      {/* Card Content */}
      <div className="p-6">
        <p className="text-gray-600 text-lg sm:text-base">
          BSA College Hostel provides affordable, comfortable accommodation for students enrolled at our institution. We aim to create a secure home away from home where you can focus on your studies while experiencing an enriching communal living environment.
        </p>
      </div>

      {/* Card Actions */}
      <div className="p-6">
        <button className="text-lg sm:text-base border border-gray-700 px-4 py-2 rounded-md hover:bg-gray-100 transition">
          Read More
        </button>
      </div>
    </div>
  );
}
