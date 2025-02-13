"use client";
import Loader from '@/app/MyLoading';
import { RegisterComplaint } from '@/app/utils';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useSession } from 'next-auth/react';
import { UploadCloud, ArrowLeftCircle } from 'lucide-react';

const ComplaintForm = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState('');
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    setUser(session?.user);
    if (user && user.studentId === '') {
      router.push('/hostler/dashboard');
    }
  }, [session]);

  const [formData, setFormData] = useState({
    studentId: '',
    studentName: '',
    studentYear: 'firstYear',
    complaintTitle: '',
    complaintDescription: '',
    status: 'pending',
    imageUrl: ''
  });

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (e.target.type === 'file') {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        setFileName(file.name);
        const imageData = new FormData();
        imageData.append("file", file);
        imageData.append("upload_preset", "vikashmishra");
        setLoading(true);
        const res = await axios.post("https://api.cloudinary.com/v1_1/dwjh8zji6/image/upload", imageData);
        setLoading(false);
        setFormData({ ...formData, imageUrl: res.data.url });
      }
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const updatedData = {
      ...formData,
      studentName: user?.studentName,
      studentId: user?.rollNumber,
      studentYear: user?.studentYear
    };
    const res = await RegisterComplaint(updatedData);
    setLoading(false);
    Swal.fire({
      icon: res ? 'success' : 'error',
      title: res ? "Success!" : "Oops!",
      text: res ? "Your complaint is registered." : "Something went wrong."
    });
  };

  if (loading) {
    return <Loader loading={loading} />;
  }

  return (
    <div className="max-w-2xl my-6 mx-auto p-6 shadow-xl rounded-lg bg-gray-900 text-white">
      <h2 className="text-2xl font-bold mb-5 text-center text-gray-100">Register Complaint</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-300 mb-2">Complaint Title</label>
          <input
            type="text"
            name="complaintTitle"
            value={formData.complaintTitle}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-gray-300 mb-2">Complaint Description</label>
          <textarea
            name="complaintDescription"
            value={formData.complaintDescription}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
            required
          />
        </div>

        <div>
          <label className="block text-gray-300 mb-2">Upload Image</label>
          <div className="flex items-center gap-2 bg-gray-800 p-2 rounded-md border border-gray-700">
            <UploadCloud className="text-gray-400" />
            <input
              type="file"
              name="imageUrl"
              accept="image/*"
              onChange={handleChange}
              className="w-full text-gray-300"
            />
          </div>
          {fileName && <p className="text-sm text-gray-400 mt-1">{fileName}</p>}
        </div>

        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-md font-semibold">
          Submit Complaint
        </button>
      </form>

      <div className="flex justify-center mt-4">
        <Link href='/hostler/dashboard' className="flex items-center text-gray-400 hover:text-gray-200">
          <ArrowLeftCircle className="mr-2" /> Back to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default ComplaintForm;
