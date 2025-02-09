"use client";
import { addFeedback } from "@/app/utils";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import Loader from "@/app/MyLoading";

const FeedbackButton: React.FC<any> = ({ user }) => {
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
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
        text: "Please choose a value",
      });
      return;
    }

    const data = {
      quality: selectedValue,
      studentYear: user.studentYear,
      rollNumber: user.rollNumber,
      studentName: user.studentName,
      description: description,
    };

    setLoading(true);
    const res = await addFeedback(data);
    setLoading(false);

    if (res) {
      Swal.fire({
        icon: "success",
        title: "Thank You!",
        text: "Your feedback has been sent successfully",
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Something went wrong!",
      });
    }
  };

  if (loading) {
    return <Loader loading={loading} />;
  }

  return (
    <div className="w-full">
      <motion.div
        initial={{ y: "50%" }}
        whileInView={{ y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="text-xl sm:text-2xl py-4 rounded-lg cursor-pointer text-white text-center bg-red-600"
        onClick={() => setShow(!show)}
      >
        Give Feedback on Today&apos;s Meal
      </motion.div>

      {show && (
        <div className="mt-6 space-y-4">
          <label className="block text-gray-700 font-semibold">
            Select Option
          </label>
          <select
            className="w-full p-3 border rounded-lg focus:ring focus:ring-red-300"
            value={selectedValue || ""}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Choose an option
            </option>
            <option value="poor">Poor Quality</option>
            <option value="satisfying">Satisfying</option>
            <option value="good">Good Quality</option>
          </select>

          <textarea
            className="w-full p-3 border rounded-lg focus:ring focus:ring-red-300"
            placeholder="Description (optional)"
            rows={3}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>

          <button
            className="mt-4 w-full sm:w-72 px-6 py-3 bg-red-700 text-white rounded-lg hover:bg-red-800 transition"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default FeedbackButton;
