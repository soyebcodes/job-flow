"use client"
import { motion} from "framer-motion";
const JobSearch = () => {
  const steps = [
    {
      id: 1,
      title: "Find & Save",
      description:
        "With the Teal Chrome Extension, you have the ability to save directly from the job board and it will appear in your tracker.",
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
    <section className="bg-white py-16 mt-96">
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* Title */}
        <h2 className="text-3xl lg:text-5xl font-semibold mb-20">
          Streamline your Job Search
        </h2>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 xl:gap-30 gap-16 ">
          {steps.map((step) => (
            <div key={step.id} className="flex flex-col items-center gap-4 relative">
                <span className=" absolute -top-5 bg-[#005149] text-white p-3 w-10 h-10 flex justify-center items-center rounded-full font-bold">{step.id}</span>
              <div className="mb-4">
                <img
                  src={step.image}
                  alt={step.alt}
                  className="rounded-lg shadow-md bg-[#e9f3f3] pt-10"
                />
              </div>
              <h3 className="text-xl xl:text-2xl font-semibold mb-2">
                {step.title}
              </h3>
              <p className="text-gray-600  font-medium xl:text-md">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Button */}
        <motion.div variants={itemVariants}>
          <button className="px-6 py-3 sm:px-8 sm:py-4 rounded-full bg-[#f5b501] text-lg sm:text-xl font-bold hover:shadow-xl hover:scale-105 transition-all duration-300 mt-16">
            Sign Up! It&apos;s 100% Free
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default JobSearch;
