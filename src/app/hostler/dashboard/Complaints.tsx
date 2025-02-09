'use client';

import React, { useState } from 'react';

const Complaints:React.FC<any> = ({ complaints }) => {
  const [clickedIndex, setClickedIndex] = useState(null);
  const [toggle, setToggle] = useState(false);

  return (
    <div className="container mx-auto my-20 px-4">
      <h2 className="text-3xl sm:text-2xl font-semibold my-24 sm:my-16">Your Recent Complaints</h2>
      {complaints.map((com:any, ind:any) => (
        <React.Fragment key={ind}>
          <div className="flex sm:flex-col justify-around gap-4 items-center mb-4 p-4 bg-white shadow-md rounded-lg">
            <strong className="text-lg sm:hidden">{ind + 1}.</strong>
            <p className="text-lg capitalize">Title: {com.complaintTitle}</p>
            <p className={`text-lg ${com.status === 'pending' ? 'text-red-500' : 'text-green-500'}`}>Status: {com.status}</p>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              onClick={() => {
                setClickedIndex(ind);
                setToggle(!toggle);
              }}
            >
              View Complaint
            </button>
          </div>
          {toggle && clickedIndex === ind && (
            <div className="w-1/2 sm:w-full mx-auto my-5 p-4 bg-gray-100 rounded-lg">
              <h3 className="text-xl font-semibold">Title: {com.complaintTitle}</h3>
              <p className="text-lg my-2">Description: {com.complaintDescription}</p>
              <img
                className="h-40 w-full object-contain"
                src={com.imageUrl.slice(5)}
                alt="complaint image"
              />
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Complaints;