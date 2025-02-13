"use client";

import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MarkAttendece } from "@/app/utils";
import Swal from "sweetalert2";
import Loader from "@/app/MyLoading";

type User = {
  role?: string;
  rollNumber?: string;
  studentYear?: string;
  studentName?: string;
};

type AttendanceProps = {
  user: User;
};

const Attendance: React.FC<AttendanceProps> = ({ user }) => {
  const [showModal, setShowModal] = useState(false);
  const [isHostler, setIsHostler] = useState(false);
  const [loading, setLoading] = useState<"ip" | "attendance" | null>(null);

  // Fetch IP Address
  const fetchIpAddress = useCallback(async () => {
    setLoading("ip");
    try {
      const response = await fetch("https://api.ipify.org?format=json");
      const { ip } = await response.json();
      setIsHostler(ip !== "103.175.77.130");
      setShowModal(true);
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

  // Mark Attendance
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

    const result = await MarkAttendece(
      user.rollNumber,
      user.studentName,
      user.studentYear
    );

    const { success, message } = result;

    Swal.fire({
      icon: success ? "success" : "error",
      title: success ? "Success" : "Error",
      text: message,
    });

    setLoading(null);
  }, [user]);

  return (
    <motion.div
      initial={{ y: "30%", opacity: 0 }}
      whileInView={{ y: "0%", opacity: 1 }}
      transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
      className="flex justify-center items-center mt-6"
    >
      {/* Attendance Button */}
      <button
        className="text-lg sm:text-2xl md:w-1/2 font-semibold text-white bg-gray-700 hover:bg-gray-800 transition px-6 py-3 rounded-lg shadow-md"
        onClick={fetchIpAddress}
      >
        Mark Your Attendance Here
      </button>

      {/* Attendance Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md"
            >
              {loading === "ip" ? (
                <div className="flex justify-center items-center py-6">
                  <div className="h-8 w-8 border-4 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
                </div>
              ) : isHostler ? (
                <div className="text-center">
                  <h2 className="text-xl font-semibold text-gray-800">
                    Please Connect to Hostel Wi-Fi.
                  </h2>
                  <button
                    onClick={() => setShowModal(false)}
                    className="mt-4 px-5 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition"
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
                    className="px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition shadow-md"
                  >
                    Mark My Attendance
                  </button>
                  <button
                    onClick={() => setShowModal(false)}
                    className="mt-4 px-6 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Attendance;
