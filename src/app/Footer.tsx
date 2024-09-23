"use client"
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from "lucide-react"
import Link from "next/link"

export default function CollegeFooter() {
  return (
    <footer className="bg-slate-900 text-white py-8 sm:py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center sm:text-left">
            <h2 className="text-2xl font-bold mb-4">Eduville College</h2>
            <p className="mb-4 text-sm sm:text-base">Empowering minds, shaping futures. Join us in our pursuit of excellence in education.</p>
            <div className="flex justify-center sm:justify-start space-x-4">
              <Link href="#" className="hover:text-blue-400 transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </Link>
              <Link href="#" className="hover:text-blue-400 transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </Link>
              <Link href="#" className="hover:text-blue-400 transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </Link>
              <Link href="#" className="hover:text-blue-400 transition-colors" aria-label="LinkedIn">
                <Linkedin size={20} />
              </Link>
            </div>
          </div>
          <div className="text-center sm:text-left">
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm sm:text-base">
              <li><Link href="#" className="hover:text-blue-400 transition-colors">About Us</Link></li>
              <li><Link href="#" className="hover:text-blue-400 transition-colors">Programs</Link></li>
              <li><Link href="#" className="hover:text-blue-400 transition-colors">Admissions</Link></li>
              <li><Link href="#" className="hover:text-blue-400 transition-colors">Campus Life</Link></li>
              <li><Link href="#" className="hover:text-blue-400 transition-colors">Research</Link></li>
              <li><Link href="#" className="hover:text-blue-400 transition-colors">Alumni</Link></li>
            </ul>
          </div>
          <div className="text-center sm:text-left">
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-sm sm:text-base">
              <li className="flex items-center justify-center sm:justify-start">
                <MapPin size={16} className="mr-2 flex-shrink-0" />
                <span>123 College Ave, Eduville, EV 12345</span>
              </li>
              <li className="flex items-center justify-center sm:justify-start">
                <Phone size={16} className="mr-2 flex-shrink-0" />
                <span>(123) 456-7890</span>
              </li>
              <li className="flex items-center justify-center sm:justify-start">
                <Mail size={16} className="mr-2 flex-shrink-0" />
                <span>info@eduvillecollege.edu</span>
              </li>
            </ul>
          </div>
          <div className="text-center sm:text-left">
            <h3 className="text-xl font-semibold mb-4">Newsletter</h3>
            <p className="mb-4 text-sm sm:text-base">Stay updated with our latest news and events.</p>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-3 py-2 text-sm sm:text-base bg-slate-800 border border-slate-700 rounded-md text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Email for newsletter"
              />
              <button 
                type="submit" 
                className="w-full px-4 py-2 text-sm sm:text-base bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-slate-800 text-center text-sm sm:text-base">
          <p>&copy; {new Date().getFullYear()} Eduville College. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}