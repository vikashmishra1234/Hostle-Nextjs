"use client";

import Loader from '@/app/MyLoading';
import { RegisterComplaint } from '@/app/utils';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation'; // useSearchParams for app directory
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const ComplaintForm = () => {
  const searchParams = useSearchParams();
  const [user, setUser] = useState<any>(null);
  const [loading,setLoading] = useState<any>(false)
  const [fileName,setFileName] = useState<any>('')
  const router = useRouter()

  useEffect(() => {
    const userParam = searchParams.get('user');
    if (userParam) {
      try {
       
        setUser(JSON.parse(userParam)); // Parse user if available
      } catch (error) {
        console.error('Failed to parse user:', error);

      }
    }
  
  }, [searchParams]);
  useEffect(()=>{
    if(user&&user.studentId==''){
        router.push('/hostler/dashboard')
    }
  },[user])

  const [formData, setFormData] = useState({
    studentId: '',
    studentName: '',
    studentYear: 'firstYear',
    complaintTitle: '',
    complaintDescription: '',
    status: 'pending',
    imageUrl: ''
  });

  const handleChange = async(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (e.target.type === 'file') {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        setFileName(file.name)
        const imageData = new FormData();
        imageData.append("file", file);
        imageData.append("upload_preset", "vikashmishra");
       setLoading(true)
        const res=  await axios.post("https://api.cloudinary.com/v1_1/dwjh8zji6/image/upload", imageData);
        setLoading(false)
        formData.imageUrl = res.data.url

      }
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    formData.studentName = user.studentName;
    formData.studentId = user.rollNumber;
    formData.studentYear = user.studentYear
    setLoading(true)
    const res = await RegisterComplaint(formData);
    setLoading(false)
    if(res){
      Swal.fire({
        icon:'success',
        title:"Success !",
        text:"Your complaint is registered"
      })
    }
    else{
      Swal.fire({
        icon:'error',
        title:"Opps !",
        text:"Something went wrong"
      })
    }
  };

  if(loading){
   return <Loader loading={loading}/>
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-5 shadow-lg rounded-md bg-white">
      <div className="mb-4">
        <label htmlFor="complaintTitle" className="block text-gray-700 font-bold mb-2">
          Complaint Title
        </label>
        <input
          type="text"
          id="complaintTitle"
          name="complaintTitle"
          value={formData.complaintTitle}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="complaintDescription" className="block text-gray-700 font-bold mb-2">
          Complaint Description
        </label>
        <textarea
          id="complaintDescription"
          name="complaintDescription"
          value={formData.complaintDescription}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          rows={4}
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="imageUrl" className="block text-gray-700 font-bold mb-2">
          Upload Image
        </label>
        <input
          type="file"
          id="imageUrl"
          name="imageUrl"
          accept="image/*"
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
        {fileName}
      </div>

      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
        Submit Complaint
      </button>
    </form>
  );
};

export default ComplaintForm;
