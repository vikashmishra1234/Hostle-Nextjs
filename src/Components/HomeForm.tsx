'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, X, User, Mail, MessageSquare } from 'lucide-react';
import Image from 'next/image';

interface FormData {
  name: string;
  email: string;
  message: string;
}

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      console.log(formData);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
    }
  };

  const handleCloseSnackbar = () => {
    setIsSubmitted(false);
  };

  const InputWrapper = ({ children, error }: { children: React.ReactNode; error?: string }) => (
    <div className="relative mb-4">
      {children}
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );

  return (
    <div className=" relative   rounded-lg">
      <div className='absolute  h-full -z-10 w-full'>

      <Image src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMXPyI56Ek09PF3DKn8cyUcIM0_ClL0Iga9g&s'}
      className='h-full object-cover w-full '
      height={200}
      width={200}
      alt='background Image'
      />
      </div>
       <h2 className="text-2xl md:text-4xl font-bold text-[brown] my-8 ">
        Leave us a note and we will get back to you
      </h2>
      <form 
      onSubmit={handleSubmit}
      
    >
      <InputWrapper error={errors.name}>
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            className={`w-full pl-10 pr-4 py-3 bg-gray-50 border rounded-md focus:outline-none focus:ring-2 focus:ring-brown-500 transition-colors
              ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
            required
          />
        </div>
      </InputWrapper>

      <InputWrapper error={errors.email}>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className={`w-full pl-10 pr-4 py-3 bg-gray-50 border rounded-md focus:outline-none focus:ring-2 focus:ring-brown-500 transition-colors
              ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
            required
          />
        </div>
      </InputWrapper>

      <InputWrapper error={errors.message}>
        <div className="relative">
          <MessageSquare className="absolute left-3 top-4 text-gray-400" size={20} />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Message"
            rows={4}
            className={`w-full pl-10 pr-4 py-3 bg-gray-50 border rounded-md focus:outline-none focus:ring-2 focus:ring-brown-500 transition-colors
              ${errors.message ? 'border-red-500' : 'border-gray-300'}`}
            required
          />
        </div>
      </InputWrapper>

      <div className="mt-6">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <button
            type="submit"
            className="flex items-center gap-2 px-8 py-3 bg-[brown] text-white rounded-md text-base hover:bg-[#c93d3d] transition-colors"
          >
            <Send size={18} />
            Send Message
          </button>
        </motion.div>
      </div>

      <AnimatePresence>
        {isSubmitted && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed bottom-4 right-4"
          >
            <div className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md shadow-lg">
              <span>Message sent successfully!</span>
              <button
                onClick={handleCloseSnackbar}
                className="p-1 hover:bg-green-700 rounded-full transition-colors"
              >
                <X size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
    </div>
  );
};

export default ContactForm;