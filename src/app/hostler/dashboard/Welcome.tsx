'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Book, Home, Utensils, Bell, Calendar, Sun, Moon, Sunrise } from 'lucide-react'
import Link from 'next/link'

interface WelcomeContentProps {
  studentName: string
}

export default function WelcomeContent({ studentName }: WelcomeContentProps) {
  const [greeting, setGreeting] = useState('')
  const [icon, setIcon] = useState<JSX.Element>(<Sun className="w-8 h-8" />)

  useEffect(() => {
    const currentHour = new Date().getHours()
    if (currentHour < 12) {
      setGreeting('Good morning')
      setIcon(<Sunrise className="w-8 h-8" />)
    } else if (currentHour < 18) {
      setGreeting('Good afternoon')
      setIcon(<Sun className="w-8 h-8" />)
    } else {
      setGreeting('Good evening')
      setIcon(<Moon className="w-8 h-8" />)
    }
  }, [])

  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white rounded-3xl shadow-2xl overflow-hidden"
      >
        <div className="p-8 md:p-12">
          <motion.div 
            className="flex items-center mb-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            {icon}
            <h1 className="text-4xl md:text-5xl font-bold text-brown-800 ml-4">
              {greeting}, {studentName}!
            </h1>
          </motion.div>
          
          <motion.p 
            className="text-xl text-brown-600 mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Welcome to your cozy corner of learning and growth. What's on your agenda today?
          </motion.p>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <QuickAccessCard icon={<Book />} link='/hostler/registercomplaint' title="Report Complaint" color="bg-red-500" />
            <QuickAccessCard icon={<Home />} link='#' title="Hostel Services" color="bg-green-600" />
            <QuickAccessCard icon={<Utensils />} link='#meal' title="Meal Schedule" color="bg-orange-500" />
          </motion.div>
          
          <motion.div 
            className="bg-brown-50 p-6 rounded-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <h2 className="text-2xl font-semibold text-brown-800 mb-4 flex items-center">
              <Calendar className="w-6 h-6 mr-2" />
              Today's Highlights
            </h2>
            <ul className="space-y-3">
              <HighlightItem text="No Highlights For Now" />
              <HighlightItem text="No Highlights For Now" />
              <HighlightItem text="No Highlights For Now" />
            </ul>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

function QuickAccessCard({ icon, title, color,link }: { icon: JSX.Element, title: string, color: string,link:string }) {
  return (
    <Link href={link}>
            <motion.div 
      className={`${color} rounded-2xl p-6 text-white flex items-center justify-between cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-105`}
      whileHover={{ y: -5 }}
    >
      <span className="text-xl font-semibold">{title}</span>
      {icon}
    </motion.div>
    </Link>
  )
}

function HighlightItem({ text }: { text: string }) {
  return (
    <li className="flex items-center text-brown-700">
      <Bell className="w-5 h-5 mr-2 text-brown-500" />
      {text}
    </li>
  )
}
