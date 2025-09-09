"use client";
import { motion } from "framer-motion";

const JobSearch = () => {
  const steps = [
    {
      id: 1,
      title: "Find & Save",
      description:
        "With the JobFlow Chrome Extension, you have the ability to save directly from the job board and it will appear in your tracker.",
      image: "/job-search-image/search-1.webp",
      alt: "Find & Save",
    },
    {
      id: 2,
      title: "Organize",
      description:
        "Stay on top of your search by using our tracker to view roles, key information, excitement levels and statuses in one view!",
      image: "/job-search-image/search-2.webp",
      alt: "Organize",
    },
    {
      id: 3,
      title: "Tailor & Apply",
      description:
        "Gain guidance at every step, suggested keywords, cover letter generation, job match scoring and more!",
      image: "/job-search-image/search-3.webp",
      alt: "Tailor & Apply",
    },
    {
      id: 4,
      title: "Monitor & Follow Up",
      description:
        "Editing your resume with Teal ensures you're presenting your best self when applying to roles.",
      image: "/job-search-image/search-4.webp",
      alt: "Monitor & Follow Up",
    },
  ];

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section className="bg-white dark:bg-gray-900 py-16 mt-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* Title */}
        <h2 className="text-3xl lg:text-5xl font-bold mb-20 text-gray-900 dark:text-white">
          Streamline your Job Search
        </h2>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 xl:gap-20 gap-16">
          {steps.map((step) => (
            <motion.div
              key={step.id}
              className="flex flex-col items-center gap-4 relative group"
              initial="hidden"
              whileInView="visible"
              variants={itemVariants}
              viewport={{ once: true }}
            >
              {/* Step Number */}
              <span className="absolute -top-5 bg-gradient-to-r from-blue-600 to-teal-600 text-white p-3 w-12 h-12 flex justify-center items-center rounded-full font-bold shadow-md group-hover:scale-110 transition-transform duration-300">
                {step.id}
              </span>

              {/* Image */}
              <div className="mb-4 w-full">
                <img
                  src={step.image}
                  alt={step.alt}
                  className="rounded-lg shadow-lg bg-[#e9f3f3] dark:bg-gray-800 p-4 transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              {/* Title */}
              <h3 className="text-xl xl:text-2xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 dark:text-gray-300 font-medium xl:text-md">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Button */}
        <motion.div variants={itemVariants}>
          <button className="px-6 py-3 sm:px-8 sm:py-4 rounded-full bg-[#f5b501] text-lg sm:text-xl font-bold hover:shadow-2xl hover:scale-110 transition-all duration-300 mt-16 text-gray-900">
            Sign Up! It&apos;s 100% Free
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default JobSearch;
