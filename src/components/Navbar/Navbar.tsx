"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "AI Resume Builder", href: "/resumes" },
    { name: "Job Application Tracker", href: "/jobs" },
    { name: "Resources", href: "/resources" },
  ];

  return (
    <>
      <header className="bg-white py-2 border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-2">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-[#005149]">
            JobTracker
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-gray-700 hover:text-[#b58d47] font-semibold text-md transition-all duration-200"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            {session ? (
              <>
                <span className="text-gray-600">Hi, {session.user?.name}</span>
                <Button
                  className="bg-[#f5b501] px-5 py-2 text-md rounded-full"
                  variant="outline"
                  size="sm"
                  onClick={() => signOut()}
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button
                    className="bg-[#f5b501] hover:bg-[#005149] hover:text-white px-5 py-2 text-md rounded-full"
                    variant="outline"
                    size="sm"
                  >
                    Sign In
                  </Button>
                </Link>
                <Link href="/register">
                  <Button
                    className="bg-transparent text-black border hover:bg-[#005149] hover:text-white border-black px-5 py-2 text-md rounded-full"
                    variant="default"
                    size="sm"
                  >
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            className="lg:hidden p-2 rounded-md hover:bg-gray-100"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed top-20 left-0 w-full h-[calc(100vh-64px)] bg-white z-40 flex flex-col p-6 shadow-lg"
          >
            {/* Nav Links */}
            <nav className="flex flex-col space-y-6 text-lg font-semibold">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="hover:text-[#b58d47] transition-all"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Auth Buttons */}
            <div className="mt-10 flex flex-col space-y-4">
              {session ? (
                <>
                  <span className="text-gray-600">
                    Hi, {session.user?.name}
                  </span>
                  <Button
                    className="bg-[#f5b501] px-5 py-2 text-md rounded-full"
                    onClick={() => {
                      setIsOpen(false);
                      signOut();
                    }}
                  >
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/login" onClick={() => setIsOpen(false)}>
                    <Button className="bg-[#f5b501] hover:bg-[#005149] hover:text-white px-5 py-2 text-md rounded-full">
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/register" onClick={() => setIsOpen(false)}>
                    <Button className="bg-transparent text-black border hover:bg-[#005149] hover:text-white border-black px-5 py-2 text-md rounded-full">
                      Sign Up
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
