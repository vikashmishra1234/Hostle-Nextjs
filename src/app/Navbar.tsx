"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MobileMenu, AuthButtons } from "./NavbarClient";
import { Home, Info, ImageIcon } from "lucide-react";

// Navbar Animations
const navVariants = {
  hidden: { y: -20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Navbar() {
  return (
    <motion.nav
      variants={navVariants}
      initial="hidden"
      animate="visible"
      className="bg-gray-900 sticky top-0 z-50 text-white shadow-lg"
    >
      <div className="container md:px-20 px-4 h-[90px] flex justify-between items-center">
        {/* Logo */}
        <motion.div
        
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/" className="flex-shrink-0">
            <Image
              height={110}
              width={190}
              src="https://www.bsacet.org/wp-content/uploads/2020/06/logo-e-1.png"
              alt="BSA College logo"
              priority
              className="object-contain"
            />
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <motion.ul
          className="hidden md:flex items-center mx-auto space-x-6 text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <li>
            <Link
              href="/"
              className="flex items-center gap-2 hover:text-gray-300 transition duration-200"
            >
              <Home size={20} /> Home
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className="flex items-center gap-2 hover:text-gray-300 transition duration-200"
            >
              <Info size={20} /> About
            </Link>
          </li>
          <li>
            <Link
              href="https://www.bsacet.org/gallery/"
              target="__blank"
              className="flex items-center gap-2 hover:text-gray-300 transition duration-200"
            >
              <ImageIcon size={20} /> Gallery
            </Link>
          </li>

          {/* Auth Buttons - Client Component */}
          <AuthButtons />
        </motion.ul>

        {/* Mobile Menu - Client Component */}
        <MobileMenu />
      </div>
    </motion.nav>
  );
}
