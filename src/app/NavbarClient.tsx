"use client";

import { useState } from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Home,
  Info,
  ImageIcon,
  User,
  LayoutDashboard,
  LogOut,
} from "lucide-react";

// Navigation Link Component
const NavLink = ({ href, onClick, children, icon }: { 
  href: string; 
  onClick?: () => void; 
  children: React.ReactNode; 
  icon?: JSX.Element; 
}) => (
  <li>
    <Link
      href={href}
      onClick={onClick}
      className="flex items-center gap-3 text-xl text-gray-300 hover:text-white transition duration-200"
    >
      {icon} {children}
    </Link>
  </li>
);

// Mobile Menu Component
export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/");
    toggleMenu();
  };

  return (
    <div className="md:hidden">
      {/* Mobile Menu Button */}
      <button
        onClick={toggleMenu}
        className="p-2 hover:bg-gray-800 rounded-md transition duration-200"
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu Content */}
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute top-[100px] left-0 w-full bg-gray-900 text-white flex flex-col items-center text-xl py-6 space-y-4 shadow-lg rounded-b-md"
          >
            <NavLink href="/" onClick={toggleMenu} icon={<Home size={20} />}>
              Home
            </NavLink>
            <NavLink href="/about" onClick={toggleMenu} icon={<Info size={20} />}>
              About
            </NavLink>
            <NavLink href="/gallery" onClick={toggleMenu} icon={<ImageIcon size={20} />}>
              Gallery
            </NavLink>

            {session ? (
              <>
                <NavLink
                  href={session.user.role === "admin" ? "/admin/dashboard" : "/hostler/dashboard"}
                  onClick={toggleMenu}
                  icon={<LayoutDashboard size={20} />}
                >
                  Dashboard
                </NavLink>
                <li>
                  <button
                    onClick={handleSignOut}
                    className="flex items-center gap-3 text-white hover:text-gray-300 transition duration-200"
                  >
                    <LogOut size={20} /> Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <NavLink href="/login" onClick={toggleMenu} icon={<User size={20} />}>
                  Admin
                </NavLink>
                <NavLink href="/hostler/login" onClick={toggleMenu} icon={<User size={20} />}>
                  Hostler
                </NavLink>
              </>
            )}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

// Authentication Buttons for Desktop
export function AuthButtons() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/");
  };

  if (!session) {
    return (
      <>
        <NavLink href="/login" icon={<User size={20} />}>
          Admin
        </NavLink>
        <NavLink href="/hostler/login" icon={<User size={20} />}>
          Hostler
        </NavLink>
      </>
    );
  }

  return (
    <>
      <NavLink
        href={session.user.role === "admin" ? "/admin/dashboard" : "/hostler/dashboard"}
        icon={<LayoutDashboard size={20} />}
      >
        Dashboard
      </NavLink>
      <li>
        <button
          onClick={handleSignOut}
          className="flex items-center gap-3 text-white hover:text-gray-300 transition duration-200"
        >
          <LogOut size={20} /> Logout
        </button>
      </li>
    </>
  );
}
