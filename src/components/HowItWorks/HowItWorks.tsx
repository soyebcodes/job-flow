"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Edit3, CheckCircle, Zap } from "lucide-react";

const stepsData = [
  {
    id: 1,
    title: "Create a free Teal Account & Set Up Goals",
    description:
      "Use the right keywords from job descriptions to highlight your qualifications on your resume and set up your job tracking goals.",
    image: "https://placehold.co/800x600/f5b501/2427ab?text=Step+1",
    stepLabel: "Sign Up!",
    icon: <Edit3 />,
    bgColor: "bg-yellow-400",
    titleColor: "text-gray-900",
    descriptionColor: "text-gray-800",
  },
  {
    id: 2,
    title: "Search for Jobs & Save with the Extension",
    description:
      "Browse job boards and use our handy browser extension to save opportunities directly to your job tracker in one click.",
    image: "https://placehold.co/800x600/2427ab/f5b501?text=Step+2",
    stepLabel: "Search",
    icon: <Search />,
    bgColor: "bg-blue-800",
    titleColor: "text-white",
    descriptionColor: "text-blue-200",
  },
  {
    id: 3,
    title: "Apply with an AI-Tailored Resume",
    description:
      "Optimize your resume for each job application. Our AI helps you match your skills to the job description, increasing your chances.",
    image: "https://placehold.co/800x600/333/fff?text=Step+3",
    stepLabel: "Apply",
    icon: <CheckCircle />,
    bgColor: "bg-gray-800",
    titleColor: "text-white",
    descriptionColor: "text-gray-300",
  },
  {
    id: 4,
    title: "Grow Your Career & Track Your Progress",
    description:
      "Manage all your applications in one place, track your interview progress, and get insights to help you land your dream job faster.",
    image: "https://placehold.co/800x600/f0f0f0/333?text=Step+4",
    stepLabel: "Grow",
    icon: <Zap />,
    bgColor: "bg-gray-100",
    titleColor: "text-gray-900",
    descriptionColor: "text-gray-600",
  },
];

const HowItWorks = () => {
  const [activeStep, setActiveStep] = React.useState(1);

  const handleStepClick = (stepId: React.SetStateAction<number>) => {
    setActiveStep(stepId);
  };

  const currentStepData =
    stepsData.find((step) => step.id === activeStep) || stepsData[0];

  return (
    <section className="mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-16">
          How it Works
        </h2>

        {/* Main content display */}
        <div
          className={`${currentStepData.bgColor} rounded-2xl p-6 md:p-10 transition-colors duration-500 ease-in-out`}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Image Section */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="overflow-hidden rounded-lg shadow-md"
              >
                <img
                  src={currentStepData.image}
                  alt={currentStepData.title}
                  className="w-full h-auto object-cover rounded-lg"
                />
              </motion.div>

              {/* Text Content Section */}
              <motion.div
                className="text-left"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <h3
                  className={`text-3xl md:text-4xl font-bold ${currentStepData.titleColor} transition-colors duration-500`}
                >
                  {currentStepData.title}
                </h3>
                <p
                  className={`mt-4 ${currentStepData.descriptionColor} text-lg transition-colors duration-500`}
                >
                  {currentStepData.description}
                </p>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Step Indicators */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="flex items-center w-full">
            {stepsData.map((step, index) => (
              <React.Fragment key={step.id}>
                {/* Step Point */}
                <div
                  className="flex flex-col items-center cursor-pointer group"
                  onClick={() => handleStepClick(step.id)}
                  style={{ flexShrink: 0 }}
                >
                  <motion.div
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                      activeStep >= step.id
                        ? "bg-gray-800 border-gray-800 text-white"
                        : "bg-white border-gray-300 text-gray-400"
                    }`}
                    whileHover={{ scale: 1.1 }}
                  >
                    <span className="font-bold text-lg">{step.id}</span>
                  </motion.div>
                  <p
                    className={`mt-3 font-semibold transition-colors duration-300 ${
                      activeStep >= step.id ? "text-gray-900" : "text-gray-500"
                    }`}
                  >
                    {step.stepLabel}
                  </p>
                </div>

                {/* Connector Line */}
                {index < stepsData.length - 1 && (
                  <div className="w-full flex-1 h-1 bg-gray-200 mx-5">
                    <motion.div
                      className="h-full bg-gray-800"
                      initial={{ width: "0%" }}
                      animate={{ width: activeStep > step.id ? "100%" : "0%" }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                    />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
        {/* CTA Button */}
        <div className="mt-12">
          <button className="bg-[#f5b501] text-gray-900 font-bold px-8 py-4 rounded-full text-lg transition-all duration-300  hover:shadow-xl hover:scale-105">
            Get Started for Free
          </button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
