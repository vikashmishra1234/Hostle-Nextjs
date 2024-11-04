'use client';

import { useState } from 'react';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession(); // Access the current session
  const router = useRouter();
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-red-900 z-50 sticky top-0 text-white">
      <div className="pl-5 pr-5 sm:pr-0 md:pr-10 h-[100px] flex justify-between gap-8 items-center">
        <Image height={300} width={200} src={'https://www.bsacet.org/wp-content/uploads/2020/06/logo-e-1.png'} alt='logo' />

        {/* Hamburger menu for mobile */}
        <div className="md:hidden cursor-pointer" onClick={toggleMenu}>
          {isOpen ? <CloseIcon /> : <MenuIcon style={{fontSize:"2rem"}} />}
        </div>

        {/* Desktop menu */}
        <ul className="hidden md:flex flex-wrap m-auto text-xl space-x-5">
          <li><Link href="/" className="">Home</Link></li>
          <li><Link href="/about" className="">About</Link></li>
          <li><Link href="/gallery" className="">Gallery</Link></li>
          <li><Link href="/contact" className="">Contact us</Link></li>
          
          {/* Conditionally render Admin or Logout based on session */}
          {session ? (
            <li>
              <button onClick={() => {signOut({redirect:false});
                router.push('/')
              }
            } className="text-white">Logout</button>
            </li>
          ) : (
            <>
              <li><Link href="/login" className="">Admin</Link></li>
              <li><Link href="/hostler/login" className="">Hostler</Link></li>
            </>
          )}
        </ul>

        {/* Mobile menu */}
        {isOpen && (
          <ul className="absolute top-[100px] left-0 z-20 w-full bg-red-900 text-white flex flex-col items-center text-xl space-y-4 md:hidden">
            <li><Link href="/" className="" onClick={toggleMenu}>Home</Link></li>
            <li><Link href="/gallery" className="" onClick={toggleMenu}>Gallery</Link></li>
            <li><Link href="/contact" className="" onClick={toggleMenu}>Contact us</Link></li>

            {/* Conditionally render Admin or Logout in mobile menu */}
            {session ? (
              <li>
                <button onClick={() => { signOut(); toggleMenu(); }} className="text-white">Logout</button>
              </li>
            ) : (
              <>
                <li><Link href="/login" className="" onClick={toggleMenu}>Admin</Link></li>
                <li><Link href="/hostler/login" className="" onClick={toggleMenu}>Hostler</Link></li>
              </>
            )}
          </ul>
        )}
      </div>
    </nav>
  );
}
