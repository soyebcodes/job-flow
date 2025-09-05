"use client"
import Image from "next/image";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Hero = () => {
  const images = [
    {
      category: "resume-builder",
      label: "AI Resume Builder",
      image: "/hero images/ai-reesume-builder.webp",
    },
    {
      category: "job-tracker",
      label: "Job Tracker",
      image: "/hero images/job-tracker.webp",
    },
    {
      category: "matching-mode",
      label: "Matching Mode",
      image: "/hero images/matching-mode.webp",
    },
  ];

  const [activeCategory, setActiveCategory] = useState("resume-builder");

  return (
    <section className="max-w-7xl mx-auto text-center px-4 my-16 md:my-10">
      <div>
        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
          Upgrade Your Resume <br className="hidden sm:block" />
          Unlock More Opportunities.
        </h1>

        {/* Subheading */}
        <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 text-gray-700">
          Simplify your job search and land your next role faster with an
          all-in-one toolkit
        </h3>

        {/* Button */}
        <button className="px-6 py-3 sm:px-8 sm:py-4 rounded-full bg-[#f5b501] text-lg sm:text-xl font-bold hover:shadow-xl hover:scale-105 transition-all duration-300">
          Sign Up! It&apos;s 100% Free
        </button>
      </div>

      {/* Buttons */}
      <div className="flex justify-center space-x-6 mt-12">
        {images.map((item) => (
          <button
            key={item.category}
            onClick={() => setActiveCategory(item.category)}
            className={`px-4 py-2 rounded-md font-semibold transition-all border-b-4 ${
              activeCategory === item.category
                ? "border-[#005149] text-[#005149]"
                : "border-transparent text-gray-600 hover:text-[#005149]"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Image */}
      <div className="mt-10 flex justify-center">
        <AnimatePresence mode="wait">
          {images
            .filter((item) => item.category === activeCategory)
            .map((item) => (
              <motion.div
                key={item.category}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Image
                  src={item.image}
                  alt={item.label}
                  width={1100}
                  height={600}
                />
              </motion.div>
            ))}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Hero;
