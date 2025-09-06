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
    icon: <AiOutlineLogin className="text-7xl text-yellow-500" />,
    title: "Auth (Google/GitHub)",
    description:
      "Quickly sign in with your Google or GitHub account. Secure authentication powered by NextAuth.js ensures your data stays safe while you focus on tracking applications.",
  },
  {
    icon: <AiOutlineFileText className="text-7xl text-yellow-500" />,
    title: "Job Application Tracker",
    description:
      "Add and manage all your job applications in one place. Track positions, companies, and statuses like Applied, Interview, or Rejected, so you never miss a follow-up.",
  },
  {
    icon: <AiOutlineCloudUpload className="text-7xl text-yellow-500" />,
    title: "Resume Upload & Storage",
    description:
      "Easily upload your resume and store it securely in the cloud or database. Access, update, or share your resume anytime without worrying about losing your files.",
  },
  {
    icon: <GiMagnifyingGlass className="text-7xl text-yellow-500" />,
    title: "AI Resume Analyzer",
    description:
      "Get 2–3 personalized suggestions to improve your resume. Our AI analyzes your skills, formatting, and keywords to make your resume more attractive to recruiters.",
  },
  {
    icon: <GiMagnifyingGlass className="text-7xl text-yellow-500" />,
    title: "AI JD Matcher",
    description:
      "Paste any job description and see which skills or keywords you’re missing. Optimize your resume and focus on acquiring skills that increase your chances of getting hired.",
  },
  {
    icon: <MdOutlineAnalytics className="text-7xl text-yellow-500" />,
    title: "Dashboard & Analytics",
    description:
      "Visualize your entire job hunt with intuitive charts. See total applications, success rates, and status breakdowns to identify trends and make data-driven decisions.",
  },
  {
    icon: <FaUserFriends className="text-7xl text-yellow-500" />,
    title: "Collaboration",
    description:
      "Share your job tracker with friends, mentors, or career coaches via a secure link. Collaborate, get feedback, and stay motivated throughout your job search journey.",
  },
];

const CoreFeatures = () => {
  return (
    <section className="py-20 bg-[#005149] text-white">
      <div className="container mx-auto px-6 text-center">
        {/* Section Header */}
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white w-2xl text-center mx-auto leading-relaxed">
          Smart Features to Boost Your Applications
        </h2>

        <p className="text-lg md:text-xl text-white mb-12">
          Manage your applications, analyze your resume, and match jobs smarter
          — all in one place.
        </p>

        {/* Feature Cards */}
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, idx) => (
            <div key={idx}>
              <hr className="mb-5 border-[1px]" />
              <div className=" p-8 rounded-3xl  cursor-pointer">
                <div className="mb-5 flex justify-center">{feature.icon}</div>
                <h3 className="text-2xl font-extrabold mb-3 text-white">
                  {feature.title}
                </h3>
                <p className="text-white text-base md:text-lg text-justify">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoreFeatures;
