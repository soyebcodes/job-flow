"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  Menu,
  X,
  Sun,
  Moon,
  Bot,
  Briefcase,
  FileText,
  ToolCaseIcon,
  Info,
  Star,
  Search,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  useUser,
  SignInButton,
  SignOutButton,
  SignUpButton,
} from "@clerk/nextjs";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { isSignedIn, user } = useUser();

  const homeLinks = [
    { name: "Tools", href: "/#tools", icon: ToolCaseIcon },
    { name: "How it Works", href: "/#how-it-works", icon: Info },
    { name: "Highlight", href: "/#highlight", icon: Star },
    { name: "Job Search", href: "/#job-search", icon: Search },
  ];

  const navLinks = [
    {
      name: "AI Resume Analyzer",
      href: "/resumes",
      icon: FileText,
      description: "Analyze professional resumes with AI",
    },
    {
      name: "Job Tracker",
      href: "/jobs",
      icon: Briefcase,
      description: "Track your job applications",
    },
  ];

  if (isSignedIn) {
    navLinks.push({
      name: "Dashboard",
      href: "/dashboard",
      icon: Bot,
      description: "Your personalized dashboard",
    });
  }

  return (
    <>
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 text-white transition-transform group-hover:scale-105">
              <Bot className="h-5 w-5" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AI JobTracker
            </span>
          </Link>

          {/* Desktop Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {/* Main nav */}
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className="group relative flex items-center space-x-2 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-all hover:bg-accent hover:text-accent-foreground"
                  scroll={false}
                >
                  <Icon className="h-4 w-4" />
                  <span>{link.name}</span>
                  <div className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 transition-opacity group-hover:opacity-100" />
                </Link>
              );
            })}

            {/* Home section links */}
            {homeLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className="group relative flex items-center space-x-2 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-all hover:bg-accent hover:text-accent-foreground"
                >
                  <Icon className="h-4 w-4" />
                  <span>{link.name}</span>
                  <div className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 transition-opacity group-hover:opacity-100" />
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right */}
          <div className="hidden lg:flex items-center space-x-3">
            {/* Theme Toggle */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-9 w-9 px-0">
                  <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  <Sun className="mr-2 h-4 w-4" />
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  <Moon className="mr-2 h-4 w-4" />
                  Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                  <Bot className="mr-2 h-4 w-4" />
                  System
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {isSignedIn ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white text-sm font-medium">
                    {user?.firstName?.charAt(0)}
                  </div>
                  <span className="text-sm font-medium">
                    Hi, {user?.firstName}
                  </span>
                </div>
                <SignOutButton>
                  <Button variant="outline" size="sm" className="h-9">
                    Sign Out
                  </Button>
                </SignOutButton>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <SignInButton>
                  <Button variant="ghost" size="sm" className="h-9">
                    Sign In
                  </Button>
                </SignInButton>
                <SignUpButton>
                  <Button variant="outline" size="sm" className="h-9">
                    Sign Up
                  </Button>
                </SignUpButton>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden flex h-9 w-9 items-center justify-center rounded-lg hover:bg-accent"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="fixed inset-x-0 top-16 z-40 bg-background/95 backdrop-blur-md border-b lg:hidden"
          >
            <div className="container mx-auto p-4">
              <nav className="space-y-2">
                {/* Main nav */}
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      className="flex items-center space-x-3 rounded-lg p-3 text-sm font-medium hover:bg-accent"
                      onClick={() => setIsOpen(false)}
                      scroll={false}
                    >
                      <Icon className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <div>{link.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {link.description}
                        </div>
                      </div>
                    </Link>
                  );
                })}

                {/* Home section links */}
                {homeLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      className="flex items-center space-x-3 rounded-lg p-3 text-sm font-medium hover:bg-accent"
                      onClick={() => setIsOpen(false)}
                    >
                      <Icon className="h-5 w-5 text-muted-foreground" />
                      <span>{link.name}</span>
                    </Link>
                  );
                })}
              </nav>

              {/* Theme Toggle Mobile */}
              <div className="mt-4 pt-4 border-t flex justify-center flex-wrap gap-2">
                <Button
                  variant={theme === "light" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setTheme("light")}
                  className="h-8 w-8 p-0"
                >
                  <Sun className="h-4 w-4" />
                </Button>
                <Button
                  variant={theme === "dark" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setTheme("dark")}
                  className="h-8 w-8 p-0"
                >
                  <Moon className="h-4 w-4" />
                </Button>
                <Button
                  variant={theme === "system" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setTheme("system")}
                  className="h-8 w-8 p-0"
                >
                  <Bot className="h-4 w-4" />
                </Button>
              </div>

              {/* Auth Section Mobile */}
              <div className="mt-4 pt-4 border-t flex flex-col items-center gap-2">
                {isSignedIn ? (
                  <>
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-medium">
                        {user?.firstName?.charAt(0)}
                      </div>
                      <span className="font-medium">Hi, {user?.firstName}</span>
                    </div>
                    <SignOutButton>
                      <Button
                        variant="outline"
                        className="w-full max-w-xs bg-transparent"
                        onClick={() => setIsOpen(false)}
                      >
                        Sign Out
                      </Button>
                    </SignOutButton>
                  </>
                ) : (
                  <div className="flex flex-col items-center gap-2 w-full max-w-xs">
                    <SignInButton>
                      <Button
                        variant="ghost"
                        className="w-full bg-transparent"
                        onClick={() => setIsOpen(false)}
                      >
                        Sign In
                      </Button>
                    </SignInButton>
                    <SignUpButton>
                      <Button
                        variant="outline"
                        className="w-full bg-transparent"
                        onClick={() => setIsOpen(false)}
                      >
                        Sign Up
                      </Button>
                    </SignUpButton>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
