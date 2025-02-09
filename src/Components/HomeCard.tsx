import * as React from "react";

interface ImageUrl {
  imageUrl: string;
  title: string;
  description: string;
}

const HomeCard: React.FC<ImageUrl> = ({ imageUrl, title, description }) => {
  return (
    <div className="max-w-[375px] mt-8 mb-8 bg-white shadow-lg rounded-lg overflow-hidden">
      {/* Card Image */}
      <img className="w-full h-[140px] object-cover" src={imageUrl} alt="Card Image" />

      {/* Card Content */}
      <div className="p-6">
        <h5 className="text-lg font-bold text-gray-700">{title}</h5>
        <p className="text-gray-600 text-base">
          {description.split(" ").slice(0, 23).join(" ")}...
        </p>
      </div>

      {/* Card Actions */}
      <div className="p-6">
        <button className="border border-gray-700 px-4 py-2 rounded-md hover:bg-gray-100 transition">
          Know More
        </button>
      </div>
    </div>
  );
};

export default HomeCard;
