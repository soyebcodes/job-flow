"use client";
import React, { useRef, useState, useEffect } from "react";
import { FileText, BarChart2 } from "lucide-react";
import Image from "next/image";
import { useAnimation, useInView, motion, easeOut } from "framer-motion";

const ToolSection = () => {
  const resumeRef = useRef<HTMLDivElement | null>(null);
  const trackerRef = useRef<HTMLDivElement | null>(null);

  const [activeTab, setActiveTab] = useState("resume");

  const resumeImageRef = useRef(null);
  const trackerImageRef = useRef(null);

  const isResumeImageInView = useInView(resumeImageRef, {
    once: false,
    amount: 0.3,
  });
  const isTrackerImageInView = useInView(trackerImageRef, {
    once: false,
    amount: 0.3,
  });

  const resumeControls = useAnimation();
  const trackerControls = useAnimation();

  const slideInVariants = {
    hidden: { opacity: 0, x: 200 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: easeOut,
      },
    },
  };

  useEffect(() => {
    if (isResumeImageInView) {
      resumeControls.start("visible");
    } else {
      resumeControls.start("hidden");
    }
  }, [isResumeImageInView, resumeControls]);

  useEffect(() => {
    if (isTrackerImageInView) {
      trackerControls.start("visible");
    } else {
      trackerControls.start("hidden");
    }
  }, [isTrackerImageInView, trackerControls]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveTab(entry.target.id);
          }
        });
      },
      { rootMargin: "-50% 0px -50% 0px", threshold: 0 }
    );

    const refs = [resumeRef, trackerRef];
    refs.forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => {
      refs.forEach((ref) => {
        if (ref.current) observer.unobserve(ref.current);
      });
    };
  }, []);

  const scrollToSection = (
    ref: React.RefObject<HTMLElement | null>,
    tabName: string
  ) => {
    setActiveTab(tabName);
    ref.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  };

  return (
    <>
      <section id="tools" className="relative mt-20">
        <div className="max-w-7xl mx-auto relative">
          {/* Sticky Tabs */}
          <div className="sticky top-24 left-0 z-40 flex">
            <div className="flex bg-neutral-100 dark:bg-neutral-800 rounded-2xl shadow-md border overflow-hidden text-center">
              {/* Resume Builder Button */}
              <button
                onClick={() => scrollToSection(resumeRef, "resume")}
                className={`flex flex-col items-center gap-2 px-6 py-3 transition-all duration-300 ${
                  activeTab === "resume"
                    ? "text-blue-600 font-semibold border-b-2 border-blue-600 dark:text-blue-400"
                    : "text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                }`}
              >
                <FileText className="w-5 h-5" />
                <span className="text-[12px]">
                  AI Resume <br /> Builder
                </span>
              </button>

              {/* Job Tracker Button */}
              <button
                onClick={() => scrollToSection(trackerRef, "tracker")}
                className={`flex flex-col items-center gap-2 px-6 py-3 transition-all duration-300 ${
                  activeTab === "tracker"
                    ? "text-blue-600 font-semibold border-b-2 border-blue-600 dark:text-blue-400"
                    : "text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                }`}
              >
                <BarChart2 className="w-5 h-5" />
                <span className="text-[12px]">Job Tracker</span>
              </button>
            </div>
          </div>

          {/* Resume Section */}
          <div
            id="resume"
            ref={resumeRef}
            className="flex flex-col lg:flex-row items-center pt-24 px-5"
          >
            <div className="mb-10 lg:mb-0 bg-[#2427ab] lg:bg-transparent p-4 lg:p-0 rounded-lg w-full">
              <h4 className="text-sm font-medium uppercase tracking-wide text-white lg:text-gray-500 dark:lg:text-gray-400">
                AI Resume Builder
              </h4>
              <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-6 text-white lg:text-gray-900 dark:lg:text-gray-100">
                Quickly tailor your resume <br /> for each job with AI
              </h2>
              <p className="mb-8 max-w-lg text-white lg:text-gray-600 dark:lg:text-gray-300">
                Use the right keywords from job descriptions to highlight your
                qualifications on your resume. Get recommendations to improve
                your resume and land more interviews.
              </p>
              <div className="text-center lg:text-left">
                <button className="bg-[#f5b501] hover:shadow-lg hover:scale-105 text-black font-semibold px-6 py-3 rounded-full transition-all duration-200">
                  Build a Resume with AI
                </button>
              </div>
            </div>

            <motion.div
              ref={resumeImageRef}
              variants={slideInVariants}
              initial="hidden"
              animate={resumeControls}
              className="w-full lg:w-auto"
            >
              <Image
                src={"/tool-image/resume-builder.png"}
                alt="AI Resume Builder"
                width={1700}
                height={600}
                priority
              />
            </motion.div>
          </div>

          {/* Job Tracker Section */}
          <div
            id="tracker"
            ref={trackerRef}
            className="flex flex-col lg:flex-row items-center pt-48 px-5"
          >
            <div className="mb-10 lg:mb-0 bg-[#2427ab] lg:bg-transparent p-4 lg:p-0 rounded-lg w-full">
              <h4 className="text-sm font-medium uppercase tracking-wide text-white lg:text-gray-500 dark:lg:text-gray-400">
                Job Tracker
              </h4>
              <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-6 text-white lg:text-gray-900 dark:lg:text-gray-100">
                One place to organize and <br /> manage your job search
              </h2>
              <p className="mb-8 max-w-lg text-white lg:text-gray-600 dark:lg:text-gray-300">
                A fast and easy way to keep track of all your job opportunities
                in one place. Bookmark jobs from any job board using Teal’s
                Chrome extension to save you time and keep you on track.
              </p>
              <button className="bg-[#f5b501] hover:shadow-lg hover:scale-105 text-black font-semibold px-6 py-3 rounded-full transition-all duration-200">
                Start Organizing Now
              </button>
            </div>

            <motion.div
              ref={trackerImageRef}
              variants={slideInVariants}
              initial="hidden"
              animate={trackerControls}
              className="w-full lg:w-auto"
            >
              <Image
                src={"/tool-image/job-tracker.webp"}
                alt="job tracker"
                width={1700}
                height={600}
                priority
              />
            </motion.div>
          </div>
        </div>

        {/* Background Shape */}
        <div className="absolute -z-50 -top-5 -right-16 2xl:w-[900px] h-[1700px] xl:w-[700px] lg:w-[600px] rounded-tl-[150px] rounded-bl-[150px] bg-[#2427ab] hidden lg:block"></div>
      </section>
    </>
  );
};

export default ToolSection;
