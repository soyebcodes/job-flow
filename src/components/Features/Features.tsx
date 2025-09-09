"use client";
import React from "react";
import {
  AiOutlineLogin,
  AiOutlineFileText,
  AiOutlineCloudUpload,
} from "react-icons/ai";
import { FaUserFriends } from "react-icons/fa";
import { MdOutlineAnalytics } from "react-icons/md";
import { GiMagnifyingGlass } from "react-icons/gi";

const features = [
  {
    icon: AiOutlineLogin,
    title: "Auth (Google/GitHub)",
    description:
      "Quickly sign in with your Google or GitHub account. Secure authentication powered by NextAuth.js ensures your data stays safe while you focus on tracking applications.",
    gradient:
      "from-yellow-400 to-yellow-600 dark:from-yellow-500 dark:to-yellow-700",
  },
  {
    icon: AiOutlineFileText,
    title: "Job Application Tracker",
    description:
      "Add and manage all your job applications in one place. Track positions, companies, and statuses like Applied, Interview, or Rejected, so you never miss a follow-up.",
    gradient:
      "from-yellow-400 to-yellow-600 dark:from-yellow-500 dark:to-yellow-700",
  },
  {
    icon: AiOutlineCloudUpload,
    title: "Resume Upload & Storage",
    description:
      "Easily upload your resume and store it securely in the cloud or database. Access, update, or share your resume anytime without worrying about losing your files.",
    gradient:
      "from-yellow-400 to-yellow-600 dark:from-yellow-500 dark:to-yellow-700",
  },
  {
    icon: GiMagnifyingGlass,
    title: "AI Resume Analyzer",
    description:
      "Get 2–3 personalized suggestions to improve your resume. Our AI analyzes your skills, formatting, and keywords to make your resume more attractive to recruiters.",
    gradient:
      "from-green-400 to-green-600 dark:from-green-500 dark:to-green-700",
  },
  {
    icon: GiMagnifyingGlass,
    title: "AI JD Matcher",
    description:
      "Paste any job description and see which skills or keywords you’re missing. Optimize your resume and focus on acquiring skills that increase your chances of getting hired.",
    gradient:
      "from-pink-400 to-purple-600 dark:from-pink-500 dark:to-purple-700",
  },
  {
    icon: MdOutlineAnalytics,
    title: "Dashboard & Analytics",
    description:
      "Visualize your entire job hunt with intuitive charts. See total applications, success rates, and status breakdowns to identify trends and make data-driven decisions.",
    gradient:
      "from-blue-400 to-purple-600 dark:from-blue-500 dark:to-purple-700",
  },
  {
    icon: FaUserFriends,
    title: "Collaboration",
    description:
      "Share your job tracker with friends, mentors, or career coaches via a secure link. Collaborate, get feedback, and stay motivated throughout your job search journey.",
    gradient: "from-teal-400 to-cyan-600 dark:from-teal-500 dark:to-cyan-700",
  },
];

const CoreFeatures = () => {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-6 text-center">
        {/* Section Header */}
        <h2 className="text-4xl md:text-5xl font-bold mb-4 max-w-2xl mx-auto leading-relaxed text-gray-900 dark:text-gray-100">
          Smart Features to Boost Your Applications
        </h2>

        <p className="text-lg md:text-xl mb-12 text-gray-700 dark:text-gray-300">
          Manage your applications, analyze your resume, and match jobs smarter
          — all in one place.
        </p>

        {/* Feature Cards */}
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="group p-8 rounded-3xl cursor-pointer bg-white dark:bg-gray-800 hover:shadow-2xl transition-shadow duration-300"
              >
                <div
                  className={`mb-5 flex justify-center p-5 rounded-2xl shadow-lg bg-gradient-to-br ${feature.gradient} group-hover:scale-110 transform transition-transform duration-300`}
                >
                  <Icon className="text-6xl text-white" />
                </div>
                <h3 className="text-2xl font-extrabold mb-3 text-gray-900 dark:text-gray-100">
                  {feature.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 text-base md:text-lg text-justify">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CoreFeatures;
