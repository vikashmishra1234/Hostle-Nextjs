"use client";

import { addFeedback } from "@/app/utils";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import Loader from "@/app/MyLoading";
import { MessageCircle, Send, ChevronDown, ChevronUp } from "lucide-react";

const FeedbackButton: React.FC<{ user: any }> = ({ user }) => {
  const [selectedValue, setSelectedValue] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [show, setShow] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(event.target.value);
  };

  const handleSubmit = async () => {
    if (!selectedValue) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Please choose an option before submitting.",
      });
      return;
    }

    const feedbackData = {
      quality: selectedValue,
      studentYear: user.studentYear,
      rollNumber: user.rollNumber,
      studentName: user.studentName,
      description,
    };

    setLoading(true);
    const res = await addFeedback(feedbackData);
    setLoading(false);

    if (res) {
      Swal.fire({
        icon: "success",
        title: "Thank You!",
        text: "Your feedback has been submitted successfully.",
      });
      // Reset form
      setSelectedValue("");
      setDescription("");
      setShow(false);
    } else {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Something went wrong. Please try again.",
      });
    }
  };

  if (loading) {
    return <Loader loading={loading} />;
  }

  return (
    <div className=" mx-auto">
      {/* Toggle Feedback Form Button */}
      <motion.button
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex items-center justify-between md:w-1/2 mx-auto px-6 py-4 text-lg font-semibold text-white bg-gray-600 rounded-lg shadow-md hover:bg-gray-700 transition-all"
        onClick={() => setShow(!show)}
      >
        <span>Give Feedback on Today's Meal</span>
        {show ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
      </motion.button>

      {/* Feedback Form */}
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-4 p-6 bg-white rounded-lg shadow-lg"
        >
          {/* Select Option */}
          <label className="block text-gray-700 font-semibold mb-2">Meal Quality</label>
          <div className="relative">
            <select
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300 transition-all"
              value={selectedValue}
              onChange={handleChange}
              required
            >
              <option value="" disabled>Choose an option</option>
              <option value="poor">Poor Quality</option>
              <option value="satisfying">Satisfying</option>
              <option value="good">Good Quality</option>
            </select>
          </div>

          {/* Description */}
          <label className="block text-gray-700 font-semibold mt-4 mb-2">Additional Comments (Optional)</label>
          <textarea
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300 transition-all"
            placeholder="Write your thoughts here..."
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>

          {/* Submit Button */}
          <button
            className="mt-6 w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-900 text-white font-semibold rounded-lg hover:bg-blue-800 transition-all"
            onClick={handleSubmit}
          >
            <Send className="w-5 h-5" />
            Submit Feedback
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default FeedbackButton;
