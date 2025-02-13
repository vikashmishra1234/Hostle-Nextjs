"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  X,
  User,
  Mail,
  MessageSquare,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import Image from "next/image";
import { sendEmail } from "@/app/utils/Nodemailer";
import axios from "axios";

interface FormData {
  name: string;
  email: string;
  message: string;
}

const ContactForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [loading,setLoading] = useState<boolean>(false)

  // ✅ Fixed input issue: Prevents unnecessary re-renders
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => {
      if (prevFormData[name as keyof FormData] === value) {
        return prevFormData; // Prevent unnecessary re-renders
      }
      return { ...prevFormData, [name]: value };
    });
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  // Form validation
  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true)
      const res = await axios.post('/api/send-mail',formData);
      setLoading(false)
      res&&setIsSubmitted(true);
    }
  };

  const handleCloseSnackbar = () => {
    setIsSubmitted(false);
  };

  return (
    <div className="relative min-h-[600px] md:rounded-2xl overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <Image
          src={
            "https://plus.unsplash.com/premium_photo-1677567996070-68fa4181775a?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          alt="Background"
          className="object-cover w-full h-full"
          width={1920}
          height={1080}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-gray-100/90 to-slate-900/90 backdrop-blur-sm" />
      </div>

      {/* Content */}
      <div className="relative z-10 p-8 md:p-12">
        <div className="max-w-2xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-bold text-white mb-8 flex items-center gap-3"
          >
            Let's Connect
            <ArrowRight className="text-gray-100" size={24} />
          </motion.h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Input */}
            <div className="relative">
              <User
                className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-200 ${
                  focusedField === "name" ? "text-gray-400" : "text-gray-400"
                }`}
                size={20}
              />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onFocus={() => setFocusedField("name")}
                onBlur={() => setFocusedField(null)}
                placeholder="Your name"
                className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 text-white placeholder-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all duration-200 hover:bg-white/20"
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>

            {/* Email Input */}
            <div className="relative">
              <Mail
                className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-200 ${
                  focusedField === "email" ? "text-gray-400" : "text-gray-400"
                }`}
                size={20}
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onFocus={() => setFocusedField("email")}
                onBlur={() => setFocusedField(null)}
                placeholder="Your email"
                className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 text-white placeholder-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all duration-200 hover:bg-white/20"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>

            {/* Message Input */}
            <div className="relative">
              <MessageSquare
                className={`absolute left-3 top-4 transition-colors duration-200 ${
                  focusedField === "message" ? "text-gray-400" : "text-gray-400"
                }`}
                size={20}
              />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                onFocus={() => setFocusedField("message")}
                onBlur={() => setFocusedField(null)}
                placeholder="Your message"
                rows={4}
                className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 text-white placeholder-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all duration-200 hover:bg-white/20"
              />
              {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
            </div>

            {/* Submit Button */}
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-gray-700 text-white rounded-xl text-lg font-medium hover:bg-gray-600 transition-colors duration-200 shadow-lg shadow-gray-400/50 hover:shadow-xl"
              >
                <Send size={20} className="animate-pulse" />
                {!loading?'Send Message':'loading...'}
              </button>
            </motion.div>
          </form>

          {/* Success Snackbar */}
          <AnimatePresence>
            {isSubmitted && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                className="fixed bottom-4 right-4 z-50"
              >
                <div className="flex items-center gap-3 px-6 py-4 bg-green-500 text-white rounded-xl shadow-2xl">
                  <CheckCircle2 size={20} />
                  <span className="font-medium">Message sent successfully!</span>
                  <button onClick={handleCloseSnackbar} className="ml-2 p-1">
                    <X size={16} />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
