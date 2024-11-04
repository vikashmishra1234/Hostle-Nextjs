import type { Metadata } from "next";
import "./globals.css";

import AuthProvider from "./context/AuthProvider";
import Navbar from "./Navbar";

export const metadata: Metadata = {
  title: "BSA Hostel",
  description: "This is an unofficial BSA College Hostel website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
   
      <body>
        <AuthProvider>
        <Navbar/>
        {children}
        </AuthProvider>
        </body>
    </html>
  );
}
