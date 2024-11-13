"use client";

import React, { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { MarkAttendece } from "@/app/utils";
import Swal from "sweetalert2";
import Loader from "@/app/MyLoading";

type User = {
  role?: string;
  rollNumber?: string;
  studentYear?: string;
  studentName?: string;
};

type AttendenceProps = {
  user: User;
};

const Attendence: React.FC<AttendenceProps> = ({ user }) => {
  const [showModal, setShowModal] = useState(false);
  const [isHostler, setIsHostler] = useState(false);
  const [loading, setLoading] = useState<"ip" | "attendance" | null>(null); 

  // Memoized function to fetch the IP address
  const fetchIpAddress = useCallback(async () => {
    setLoading("ip");
    try {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            let latitude = position.coords.latitude;
            let longitude = position.coords.longitude;
            latitude = Math.floor(latitude)
            longitude = Math.floor(longitude)
            alert(latitude+" "+longitude)
            if((latitude==27||28||26)&&(longitude==76||77||78)){
              alert("helo")
              setIsHostler(false);
              setShowModal(true);
            }
          },
          (error) => {
            console.error("Error getting location:", error);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
     
    } catch (error) {
      console.error("Unable to fetch IP", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to fetch IP address.",
      });
    } finally {
      setLoading(null);
    }
  }, []);

  // Function to mark attendance
  const markAttendance = useCallback(async () => {
    if (!user.rollNumber) {
      Swal.fire({
        icon: "error",
        title: "Invalid Roll Number",
        text: "Please provide a valid roll number.",
      });
      return;
    }
    setLoading("attendance");
    const result = await MarkAttendece(user.rollNumber,user.studentName,user.studentYear);
    const { success, message } = result;

    Swal.fire({
      icon: success ? "success" : "error",
      title: success ? "Success" : "Error",
      text: message,
    });

    setLoading(null);
  }, [user.rollNumber]);

  // Show loader if attendance marking is in progress
  if (loading === "attendance") {
    return <Loader loading />;
  }

  return (
    <motion.div
      initial={{ y: "30%", opacity: 0 }}
      whileInView={{ y: "0%", opacity: 1 }}
      transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
      className="flex justify-center rounded-lg mt-3 items-center h-16 sm:h-20 bg-[#cb3a3a]"
    >
      <div
        className="text-xl sm:text-2xl bg-[#cb3a3a] text-white cursor-pointer"
        onClick={fetchIpAddress}
      >
        Mark Your Attendance Here
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-lg shadow-lg p-8 w-[90%] max-w-md"
          >
            {loading === "ip" ? (
              <div className="flex justify-center items-center h-full">
                <span className="loader" /> Fetching IP...
              </div>
            ) : isHostler ? (
              <div className="text-center">
                <h2 className="text-xl font-semibold text-gray-800">
                  You are not a hostler.
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="mt-4 px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
                >
                  Close
                </button>
              </div>
            ) : (
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Mark Your Attendance
                </h2>
                <button
                  onClick={markAttendance}
                  className="px-4 py-2 bg-[brown] text-white rounded-md hover:bg-brown-700 transition"
                >
                  Mark My Attendance
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="mt-4 px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}

      <style jsx>{`
        .loader {
          border: 4px solid #f3f3f3;
          border-radius: 50%;
          border-top: 4px solid #3498db;
          width: 24px;
          height: 24px;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </motion.div>
  );
};

export default Attendence;
