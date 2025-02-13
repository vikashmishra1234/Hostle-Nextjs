"use client";

import { signIn } from "next-auth/react";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import Loader from "../MyLoading";

const toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
});

const AdminLogin = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({ adminId: "", password: "" });
  const [isLoading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await signIn("credentials", {
        redirect: false,
        ...formData,
        role: "admin",
      });

      if (res?.error) {
        toast.fire({ icon: "error", title: res.error || "Login failed!" });
      } else {
        toast.fire({ icon: "success", title: "Login successful!" });
        router.push("/admin/dashboard");
      }
    } catch (error) {
      toast.fire({ icon: "error", title: "An unexpected error occurred!" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
     
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg"
      >
         <div>
        <h2>Id: 12345678</h2>
        <h2>Pass: 12345678</h2>
      </div>
        <h2 className="text-center text-3xl font-bold text-gray-800 mb-6">
          Admin Login
        </h2>

        {/* Admin ID Field */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Admin ID
          </label>
          <input
            type="text"
            name="adminId"
            value={formData.adminId}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
            required
          />
        </div>

        {/* Password Field */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
            required
          />
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className={`w-full flex justify-center items-center gap-2 bg-gray-600 text-white py-2 rounded-md hover:bg-red-700 transition duration-300 ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isLoading}
        >
          {isLoading && (
            <span className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin"></span>
          )}
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
