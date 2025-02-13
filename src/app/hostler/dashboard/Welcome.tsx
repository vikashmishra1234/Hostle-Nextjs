"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Book, Utensils, Sun, Moon, Sunrise, ArrowLeftCircle } from "lucide-react";
import Link from "next/link";

interface WelcomeContentProps {
  studentName: string;
}

interface GreetingData {
  text: string;
  icon: JSX.Element;
}

const greetings: Record<string, GreetingData> = {
  morning: { text: "Good morning", icon: <Sunrise className="w-8 h-8 text-blue-600" /> },
  afternoon: { text: "Good afternoon", icon: <Sun className="w-8 h-8 text-yellow-500" /> },
  evening: { text: "Good evening", icon: <Moon className="w-8 h-8 text-gray-500" /> },
};

export default function WelcomeContent({ studentName }: WelcomeContentProps) {
  const [greeting, setGreeting] = useState<GreetingData>(greetings.morning);

  useEffect(() => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      setGreeting(greetings.morning);
    } else if (currentHour < 18) {
      setGreeting(greetings.afternoon);
    } else {
      setGreeting(greetings.evening);
    }
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-gray-100 rounded-3xl shadow-lg overflow-hidden"
      >
        <div className="p-6 md:p-12">
          <WelcomeHeader greeting={greeting} studentName={studentName} />
          <WelcomeMessage />
          <QuickAccessGrid />
          <AdditionalContent />
          {/* <BackButton /> */}
        </div>
      </motion.div>
    </div>
  );
}

function WelcomeHeader({ greeting, studentName }: { greeting: GreetingData; studentName: string }) {
  return (
    <motion.div
      className="flex items-center mb-6 md:mb-8"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
    >
      {greeting.icon}
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 ml-4">
        {greeting.text}, {studentName}!
      </h1>
    </motion.div>
  );
}

function WelcomeMessage() {
  return (
    <motion.p
      className="text-lg md:text-xl text-gray-600 mb-6 md:mb-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.8 }}
    >
      Welcome to your cozy corner of learning and growth. What’s on your agenda today?
    </motion.p>
  );
}

function QuickAccessGrid() {
  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.8 }}
    >
      <QuickAccessCard
        icon={<Book className="w-6 h-6" />}
        link="/hostler/registercomplaint"
        title="Report Complaint"
        color="bg-gray-700 text-white"
      />
      <QuickAccessCard
        icon={<Utensils className="w-6 h-6" />}
        link="#meal"
        title="Meal Schedule"
        color="bg-blue-600 text-white"
      />
    </motion.div>
  );
}

function QuickAccessCard({
  icon,
  title,
  color,
  link,
}: {
  icon: JSX.Element;
  title: string;
  color: string;
  link: string;
}) {
  return (
    <Link href={link} className="block">
      <motion.div
        className={`${color} rounded-lg p-6 flex items-center justify-between cursor-pointer transition-all duration-300 ease-in-out hover:shadow-lg`}
        whileHover={{ y: -5 }}
      >
        <span className="text-lg font-semibold">{title}</span>
        {icon}
      </motion.div>
    </Link>
  );
}

function AdditionalContent() {
  return (
    <motion.div
      className="bg-white p-6 rounded-lg shadow-md text-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.8 }}
    >
      {/* Add your additional content here */}
      <p className="text-center">More features coming soon!</p>
    </motion.div>
  );
}

function BackButton() {
  return (
    <motion.div
      className="mt-6 flex justify-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.8 }}
    >
      {/* <Link href="/hostler/dashboard">
        <button className="flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-all">
          <ArrowLeftCircle className="w-5 h-5" />
          Back to Dashboard
        </button>
      </Link> */}
    </motion.div>
  );
}
