"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

interface Complaint {
  complaintTitle: string;
  complaintDescription: string;
  imageUrl: string;
  status: string;
}

const Complaints: React.FC<{ complaints: Complaint[] }> = ({ complaints }) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleComplaint = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="max-w-5xl mx-auto px-6 my-16">
      <h2 className="text-3xl sm:text-2xl font-semibold text-gray-800 text-center mb-10">
        Your Recent Complaints
      </h2>

      {complaints.length === 0 ? (
        <p className="text-gray-600 text-center">No complaints found.</p>
      ) : (
        complaints.map((com, index) => (
          <div key={index} className="mb-6">
            {/* Complaint Card */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex flex-col lg:flex-row items-start lg:items-center bg-white shadow-md rounded-lg p-6 transition-all"
            >
              {/* Complaint Title & Status */}
              <div className="flex-1">
                <p className="text-lg font-semibold capitalize text-gray-900 mb-2 lg:mb-0">
                  {com.complaintTitle}
                </p>
                <p
                  className={`text-sm font-medium ${
                    com.status === "pending" ? "text-red-600" : "text-green-600"
                  }`}
                >
                  Status: {com.status.charAt(0).toUpperCase() + com.status.slice(1)}
                </p>
              </div>

              {/* View Complaint Button */}
              <button
                className="flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-900 transition lg:ml-auto mt-4 lg:mt-0"
                onClick={() => toggleComplaint(index)}
              >
                {expandedIndex === index ? (
                  <>
                    Hide Details <ChevronUp className="w-5 h-5" />
                  </>
                ) : (
                  <>
                    View Details <ChevronDown className="w-5 h-5" />
                  </>
                )}
              </button>
            </motion.div>

            {/* Complaint Details */}
            <AnimatePresence>
              {expandedIndex === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4 p-6 bg-gray-100 rounded-lg shadow-inner"
                >
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {com.complaintTitle}
                  </h3>
                  <p className="text-lg text-gray-700">{com.complaintDescription}</p>
                  {com.imageUrl && (
                    <div className="mt-4 flex justify-center">
                      <img
                        className="w-full max-w-md h-auto rounded-lg shadow-md"
                        src={com.imageUrl.slice(5)}
                        alt={`Complaint: ${com.complaintTitle}`}
                      />
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))
      )}
    </div>
  );
};

export default Complaints;
