"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import Swal from "sweetalert2";

interface StudentFormData {
  studentName: string;
  rollNumber: string;
  studentPhone: string;
  studentEmail: string;
  studentFatherName: string;
  studentAddress: string;
  studentYear: string;
  studentBranch: string;
  studentFatherPhone: string;
  studentPassword: string;
}

const StudentForm = () => {
  const [formData, setFormData] = useState<StudentFormData>({
    studentName: "",
    rollNumber: "",
    studentPhone: "",
    studentEmail: "",
    studentFatherName: "",
    studentAddress: "",
    studentYear: "",
    studentBranch: "",
    studentFatherPhone: "",
    studentPassword: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/api/addstudent", formData);
      if (res && res?.data.message) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: res?.data?.message || "Student added successfully",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "Unable to add student",
      });
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center text-red-900 mb-6">Student Information Form</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
          {/* Student Name */}
          <div>
            <label className="block text-gray-700 font-medium">Student Name</label>
            <input
              type="text"
              name="studentName"
              value={formData.studentName}
              onChange={handleChange}
              className="mt-1 w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-red-500"
              required
            />
          </div>

          {/* Roll Number */}
          <div>
            <label className="block text-gray-700 font-medium">Roll Number</label>
            <input
              type="text"
              name="rollNumber"
              value={formData.rollNumber}
              onChange={handleChange}
              className="mt-1 w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-red-500"
              required
            />
          </div>

          {/* Father's Name */}
          <div>
            <label className="block text-gray-700 font-medium">Father's Name</label>
            <input
              type="text"
              name="studentFatherName"
              value={formData.studentFatherName}
              onChange={handleChange}
              className="mt-1 w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-red-500"
              required
            />
          </div>

          {/* Contact Details (Grid Layout) */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium">Student Phone</label>
              <input
                type="text"
                name="studentPhone"
                value={formData.studentPhone}
                onChange={handleChange}
                className="mt-1 w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-red-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium">Father's Phone</label>
              <input
                type="text"
                name="studentFatherPhone"
                value={formData.studentFatherPhone}
                onChange={handleChange}
                className="mt-1 w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-red-500"
                required
              />
            </div>
          </div>

          {/* Student Email */}
          <div>
            <label className="block text-gray-700 font-medium">Student Email</label>
            <input
              type="email"
              name="studentEmail"
              value={formData.studentEmail}
              onChange={handleChange}
              className="mt-1 w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-red-500"
              required
            />
          </div>

          {/* Year & Branch */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium">Year</label>
              <input
                type="text"
                name="studentYear"
                value={formData.studentYear}
                onChange={handleChange}
                className="mt-1 w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-red-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium">Branch</label>
              <input
                type="text"
                name="studentBranch"
                value={formData.studentBranch}
                onChange={handleChange}
                className="mt-1 w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-red-500"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 font-medium">Set a Password</label>
            <input
              type="password"
              name="studentPassword"
              value={formData.studentPassword}
              onChange={handleChange}
              className="mt-1 w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-red-500"
              required
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-gray-700 font-medium">Address</label>
            <textarea
              name="studentAddress"
              value={formData.studentAddress}
              onChange={handleChange}
              rows={3}
              className="mt-1 w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-red-500"
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-red-700 text-white py-2 rounded-md hover:bg-red-800 transition duration-300 font-medium"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default StudentForm;
