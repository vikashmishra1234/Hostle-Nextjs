"use client"
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react"
import Link from "next/link"

export default function SimpleFooter() {
  return (
    <footer className="bg-gray-700 text-white py-8">
      <div className="container mx-auto px-4 text-center">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-4">BSA College</h2>
          <p className="text-sm mb-4">Empowering minds, shaping futures.</p>
          <div className="flex justify-center space-x-6">
            <Link href="#" aria-label="Facebook">
              <Facebook size={20} className="hover:text-blue-400 transition-colors" />
            </Link>
            <Link href="#" aria-label="Twitter">
              <Twitter size={20} className="hover:text-blue-400 transition-colors" />
            </Link>
            <Link href="#" aria-label="Instagram">
              <Instagram size={20} className="hover:text-blue-400 transition-colors" />
            </Link>
            <Link href="#" aria-label="LinkedIn">
              <Linkedin size={20} className="hover:text-blue-400 transition-colors" />
            </Link>
          </div>
        </div>
        <div className="text-sm">
          <p>&copy; {new Date().getFullYear()} BSA College. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
