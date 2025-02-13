'use client';

import { v4 as uuidv4 } from 'uuid';
import { signIn, signOut } from 'next-auth/react';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import Loader from '@/app/MyLoading';

const toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
});

const getOrCreateUserId = (rollNumber: string) => {
  let deviceId = localStorage.getItem('deviceId');
  if (!deviceId) {
    deviceId = uuidv4() + 'X' + rollNumber;
    localStorage.setItem('deviceId', deviceId);
    return true;
  }
  return deviceId.split('X')[1] === rollNumber;
};

const HostlerLogin = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({ rollNumber: '', password: '' });
  const [isLoading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await signIn('credentials', {
        redirect: false,
        ...formData,
        role: 'student',
      });

      if (res?.error) {
        toast.fire({
          icon: 'error',
          title: res.error || 'Login failed!',
        });
      } else {
        if (getOrCreateUserId(formData.rollNumber)) {
          toast.fire({ icon: 'success', title: 'Login successful!' });
          router.push('/hostler/dashboard');
        } else {
          await signOut({ redirect: false });
          toast.fire({ icon: 'error', title: 'Device does not match!' });
        }
      }
    } catch (error) {
      toast.fire({ icon: 'error', title: 'An error occurred. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) return <Loader loading={isLoading} />;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
      <div>
        <h2>Id: 2100650100112</h2>
        <h2>Pass: 210065</h2>
      </div>
        <h2 className="text-2xl font-bold text-center mb-4">Hostler Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Enter Roll Number</label>
            <input
              type="text"
              name="rollNumber"
              value={formData.rollNumber}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#696868] text-white py-2 rounded-md hover:bg-[#4b4a4a] transition duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default HostlerLogin;
