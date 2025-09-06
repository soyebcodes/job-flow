"use client";
import React from "react";
import { GiMagnifyingGlass } from "react-icons/gi";
import { FaBrain, FaArrowRight, FaCheck, FaTimes } from "react-icons/fa";
import { AiOutlineStar } from "react-icons/ai";
import { GiBullseye } from "react-icons/gi";

const AiToolsHighlight = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 px-4 py-2 rounded-full mb-6">
            <AiOutlineStar className="text-blue-600" />
            <span className="text-sm font-semibold text-blue-700">
              AI-Powered Tools
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Smart Tools That Get You
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {" "}
              Hired Faster
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Transform your job search with AI that analyzes, optimizes, and
            matches your resume to land more interviews. Stop guessing what
            recruiters want—let our AI show you exactly how to stand out.
          </p>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">2x</div>
            <p className="text-gray-600">More Interview Callbacks</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600">85%</div>
            <p className="text-gray-600">Resume Match Accuracy</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">2 mins</div>
            <p className="text-gray-600">Average Optimization Time</p>
          </div>
        </div>

        {/* Two-column layout */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Resume Analyzer */}
          <div className="group bg-white p-10 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-blue-200">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                <FaBrain className="text-3xl text-white" />
              </div>
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">
                  AI Resume Analyzer
                </h3>
                <p className="text-blue-600 font-medium">
                  Instant Resume Enhancement
                </p>
              </div>
            </div>

            <p className="text-gray-600 mb-8 text-lg leading-relaxed">
              Our advanced AI scans every word of your resume, identifying weak
              phrases and suggesting powerful, results-driven alternatives. Get
              specific, actionable feedback that transforms generic descriptions
              into compelling achievements that catch recruiters' attention.
            </p>

            {/* Key Benefits */}
            <div className="mb-8">
              <h4 className="font-semibold text-gray-800 mb-4">
                What You Get:
              </h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <FaCheck className="text-green-500 flex-shrink-0" />
                  <span className="text-gray-600">
                    Line-by-line improvement suggestions
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <FaCheck className="text-green-500 flex-shrink-0" />
                  <span className="text-gray-600">
                    Industry-specific keywords and phrases
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <FaCheck className="text-green-500 flex-shrink-0" />
                  <span className="text-gray-600">
                    Quantified achievement recommendations
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <FaCheck className="text-green-500 flex-shrink-0" />
                  <span className="text-gray-600">ATS optimization score</span>
                </div>
              </div>
            </div>

            {/* Before / After */}
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-800 mb-4">
                See the Transformation:
              </h4>
              <div className="grid grid-cols-1 gap-4">
                <div className="bg-red-50 p-6 rounded-xl border border-red-200">
                  <div className="flex items-center gap-2 mb-3">
                    <FaTimes className="text-red-500 text-sm" />
                    <p className="font-semibold text-red-700">Before (Weak)</p>
                  </div>
                  <p className="text-red-600 italic">
                    "Developed websites using React and worked on various
                    projects."
                  </p>
                </div>
                <div className="flex justify-center">
                  <FaArrowRight className="text-blue-500 text-xl" />
                </div>
                <div className="bg-green-50 p-6 rounded-xl border border-green-200">
                  <div className="flex items-center gap-2 mb-3">
                    <FaCheck className="text-green-500 text-sm" />
                    <p className="font-semibold text-green-700">
                      After (AI Enhanced)
                    </p>
                  </div>
                  <p className="text-green-600 font-medium">
                    "Built 8+ responsive web applications using React &
                    TypeScript, improving user engagement by 40% and reducing
                    load times by 35% through code optimization."
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* JD Matcher */}
          <div className="group bg-white p-10 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-purple-200">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-gradient-to-br from-pink-400 to-purple-600 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                <GiBullseye className="text-3xl text-white" />
              </div>
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">
                  Smart JD Matcher
                </h3>
                <p className="text-purple-600 font-medium">
                  Perfect Resume-Job Alignment
                </p>
              </div>
            </div>

            <p className="text-gray-600 mb-8 text-lg leading-relaxed">
              Paste any job description and watch our AI instantly compare it
              with your resume. Get a detailed gap analysis showing exactly
              which skills, keywords, and experience you need to highlight or
              add. Never miss the mark on applications again.
            </p>

            {/* Key Benefits */}
            <div className="mb-8">
              <h4 className="font-semibold text-gray-800 mb-4">
                How It Helps:
              </h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <FaCheck className="text-green-500 flex-shrink-0" />
                  <span className="text-gray-600">
                    Instant skill gap identification
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <FaCheck className="text-green-500 flex-shrink-0" />
                  <span className="text-gray-600">
                    ATS keyword matching score
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <FaCheck className="text-green-500 flex-shrink-0" />
                  <span className="text-gray-600">
                    Priority improvement suggestions
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <FaCheck className="text-green-500 flex-shrink-0" />
                  <span className="text-gray-600">
                    Competition analysis insights
                  </span>
                </div>
              </div>
            </div>

            {/* Match Analysis Example */}
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-800 mb-4">
                Live Match Analysis:
              </h4>

              {/* Match Score */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-200">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-semibold text-gray-800">
                    Match Score
                  </span>
                  <span className="text-2xl font-bold text-purple-600">
                    73%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full"
                    style={{ width: "73%" }}
                  ></div>
                </div>
              </div>

              {/* Missing Skills */}
              <div className="bg-orange-50 p-6 rounded-xl border border-orange-200">
                <p className="font-semibold text-orange-800 mb-4">
                  Missing High-Priority Skills:
                </p>
                <div className="flex flex-wrap gap-3">
                  <span className="px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full text-sm font-medium shadow-lg">
                    Next.js
                  </span>
                  <span className="px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full text-sm font-medium shadow-lg">
                    TypeScript
                  </span>
                  <span className="px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full text-sm font-medium shadow-lg">
                    GraphQL
                  </span>
                </div>
                <div className="mt-4 p-4 bg-white rounded-lg">
                  <p className="text-green-600 font-semibold flex items-center gap-2">
                    <AiOutlineStar />
                    AI Recommendation: Add these skills to increase your match
                    score to 94%!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 rounded-3xl text-white">
            <h3 className="text-2xl font-bold mb-4">
              Ready to Supercharge Your Job Applications?
            </h3>
            <p className="text-blue-100 mb-6 text-lg">
              Join thousands of job seekers whove landed their dream jobs with
              our AI tools
            </p>
            <button className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100  shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200">
              Try AI Tools Free
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AiToolsHighlight;
