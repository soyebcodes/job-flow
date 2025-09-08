"use client";

import type React from "react";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { motion } from "framer-motion";
import {
  Bot,
  Mail,
  Lock,
  Github,
  Chrome,
  Briefcase,
  Zap,
  Target,
} from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      email,
      password,
      redirect: true,
      callbackUrl: "/dashboard",
    });

    if (res?.error) setError("Invalid email or password");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="hidden lg:block space-y-8 bg-slate-900/95 p-8 rounded-2xl backdrop-blur-sm"
        >
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl">
                <Bot className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">
                  AI Job Tracker
                </h1>
                <p className="text-gray-100">Intelligent Career Management</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-4 text-gray-100">
                <div className="p-2 bg-slate-800/50 rounded-lg">
                  <Target className="w-5 h-5 text-blue-400" />
                </div>
                <span>Track applications with AI insights</span>
              </div>
              <div className="flex items-center space-x-4 text-gray-100">
                <div className="p-2 bg-slate-800/50 rounded-lg">
                  <Zap className="w-5 h-5 text-purple-400" />
                </div>
                <span>Automated job matching & alerts</span>
              </div>
              <div className="flex items-center space-x-4 text-gray-100">
                <div className="p-2 bg-slate-800/50 rounded-lg">
                  <Briefcase className="w-5 h-5 text-cyan-400" />
                </div>
                <span>Smart career progression analytics</span>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full max-w-md mx-auto"
        >
          <Card className="backdrop-blur-xl bg-slate-800/90 border-slate-700/50 shadow-2xl">
            <CardHeader className="text-center space-y-4 pb-8">
              <div className="mx-auto p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl w-fit lg:hidden">
                <Bot className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-100 text-balance">
                  Welcome Back
                </h2>
                <p className="text-gray-300 text-sm">
                  Sign in to continue your job search journey
                </p>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-4">
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="pl-12 bg-slate-700/50 border-slate-600 text-gray-100 placeholder:text-gray-400 focus:border-blue-400 focus:ring-blue-400/20"
                    />
                  </div>

                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="pl-12 bg-slate-700/50 border-slate-600 text-gray-100 placeholder:text-gray-400 focus:border-blue-400 focus:ring-blue-400/20"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold py-3 transition-all duration-200 transform hover:scale-[1.02]"
                >
                  Sign In to Dashboard
                </Button>

                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-sm text-center bg-red-500/10 border border-red-500/20 rounded-lg p-3"
                  >
                    {error}
                  </motion.p>
                )}
              </form>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-600"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-slate-800 text-gray-300">
                    or continue with
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  className="bg-slate-700/70 border-slate-600 text-gray-100 hover:bg-slate-600/70 hover:border-slate-500 transition-all duration-200"
                  onClick={() =>
                    signIn("google", { callbackUrl: "/dashboard" })
                  }
                >
                  <Chrome className="w-4 h-4 mr-2" />
                  Google
                </Button>
                <Button
                  variant="outline"
                  className="bg-slate-700/70 border-slate-600 text-gray-100 hover:bg-slate-600/70 hover:border-slate-500 transition-all duration-200"
                  onClick={() =>
                    signIn("github", { callbackUrl: "/dashboard" })
                  }
                >
                  <Github className="w-4 h-4 mr-2" />
                  GitHub
                </Button>
              </div>

              <p className="text-center text-xs text-gray-300">
                {"Don't have an account? "}
                <a
                  href="/register"
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Sign up here
                </a>
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
