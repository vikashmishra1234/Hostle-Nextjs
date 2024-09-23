"use client"
import { useState } from 'react';
import Link from 'next/link';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-red-900 text-white">
      <div className="pl-10 pr-10 sm:pr-0 md:pr-10 h-[100px] flex justify-between gap-8 items-center">
        <Link href="/" className="text-[1.7rem] xm:text-[2rem] sm:text-2xl md:text-3xl font-bold">
          BSA Hostel
        </Link>

        {/* Hamburger menu for mobile */}
        <div className="md:hidden  cursor-pointer" onClick={toggleMenu}>
          {isOpen ? <CloseIcon /> : <MenuIcon style={{fontSize:"2rem"}} />}
        </div>

        {/* Desktop menu */}
        <ul className="hidden md:flex flex-wrap  text-xl space-x-5">
          <li><Link href="/" className="">Home</Link></li>
          <li><Link href="/about" className="">About</Link></li>
          <li><Link href="/administration" className="">Administration</Link></li>
          <li><Link href="/admissions" className="">Admissions</Link></li>
          <li><Link href="/faculties" className="">Faculties</Link></li>
          <li><Link href="/gallery" className="">Gallery</Link></li>
          <li><Link href="/contact" className="">Contact us</Link></li>
          <li><Link href="/admin/dashboard" className="">Admin</Link></li>
          <li><Link href="/hostler/dashboard" className="">Hostler</Link></li>
        </ul>

        {/* Mobile menu */}
        {isOpen && (
          <ul className="absolute top-[100px] left-0  z-20 w-full bg-red-900 text-white flex flex-col items-center text-xl space-y-4 md:hidden">
            <li><Link href="/" className="" onClick={toggleMenu}>Home</Link></li>
            <li><Link href="/about" className="" onClick={toggleMenu}>About</Link></li>
            <li><Link href="/administration" className="" onClick={toggleMenu}>Administration</Link></li>
            <li><Link href="/admissions" className="" onClick={toggleMenu}>Admissions</Link></li>
            <li><Link href="/faculties" className="" onClick={toggleMenu}>Faculties</Link></li>
            <li><Link href="/gallery" className="" onClick={toggleMenu}>Gallery</Link></li>
            <li><Link href="/contact" className="" onClick={toggleMenu}>Contact us</Link></li>
            <li><Link href="/admin/dashboard" className="" onClick={toggleMenu}>Admin</Link></li>
            <li><Link href="/hostler/dashboard" className="" onClick={toggleMenu}>Hostler</Link></li>
          </ul>
        )}
      </div>
    </nav>
  );
}
