"use client";

import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "AI Resume Builder", href: "/resume-builder" },
    { name: "Job Application Tracker", href: "/application-tracker" },
    { name: "Resources", href: "" },
  ];

  return (
    <>
      <header className="bg-white py-2 border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
          {/* Left - Logo */}
          <Link href="/" className="text-2xl font-bold text-[#005149]">
            JobTracker
          </Link>

          {/* Middle - Nav Links (Desktop only) */}
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

          {/* Right - Auth (Desktop only) */}
          <div className="hidden lg:flex items-center space-x-3">
            {session ? (
              <>
                <span className="text-gray-600">Hi, {session.user?.name}</span>
                <Button
                  className="bg-[#f5b501] p-5 text-md rounded-full"
                  variant="outline"
                  size="sm"
                  onClick={() => signOut()}
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Button
                  className="bg-[#f5b501] hover:bg-[#005149] hover:text-white p-5 text-md rounded-full"
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    signIn(undefined, { callbackUrl: "/dashboard" })
                  }
                >
                  Sign In
                </Button>
                <Button
                  className="bg-transparent text-black border hover:bg-[#005149] hover:text-white border-black p-5 text-md rounded-full"
                  variant="default"
                  size="sm"
                  onClick={() => signIn(undefined, { callbackUrl: "/signup" })}
                >
                  Sign Up
                </Button>
              </>
            )}
          </div>

          {/* Hamburger (Mobile/Tablet only) */}
          <button
            className="lg:hidden p-2 rounded-md hover:bg-gray-100"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </header>
      {/* Drawer */}
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

            {/* Auth */}
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
                  <Button
                    className="bg-[#f5b501] hover:bg-[#005149] hover:text-white px-5 py-2 text-md rounded-full"
                    onClick={() => {
                      setIsOpen(false);
                      signIn(undefined, { callbackUrl: "/dashboard" });
                    }}
                  >
                    Sign In
                  </Button>
                  <Button
                    className="bg-transparent text-black border hover:bg-[#005149] hover:text-white border-black px-5 py-2 text-md rounded-full"
                    onClick={() => {
                      setIsOpen(false);
                      signIn(undefined, { callbackUrl: "/signup" });
                    }}
                  >
                    Sign Up
                  </Button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
