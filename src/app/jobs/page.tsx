import React from "react";

const JobsPage = () => {
  return (
    <div className="flex flex-col items-center min-h-screen py-2 px-2 sm:px-4">
      {/* heading and subheading  */}
      <div className="space-y-4 text-center mt-10 px-2">
        <h2 className="text-3xl sm:text-5xl font-bold">Job Application Form</h2>
        <p className="text-lg sm:text-xl font-thin">
          Please Fill Out the Form Below to Submit Your Job Application!
        </p>
      </div>

      {/* main form  */}
      <div className="relative w-full max-w-lg sm:max-w-2xl md:max-w-4xl mt-10 p-4 sm:p-8 bg-[#071400] rounded-lg border border-gray-300 text-white">
        
        {[1, 2, 3].map((el) => (
          <div
            key={el}
            className="absolute inset-0 w-full h-full rounded-lg pointer-events-none"
            style={{
              backgroundImage: "url('/Ellipse_green.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: 0.2,
              zIndex: 0,
            }}
          ></div>
        ))}

        <form className="relative z-10">
          {/* position  */}
          <div className="space-y-2 mb-6">
            <div>
              <label
                className="text-lg sm:text-xl text-white font-semibold"
                htmlFor="position"
              >
                Position<span className="text-red-700"> *</span>
              </label>
            </div>

            <div>
              <input
                className="border border-gray-300 font-semibold rounded-md p-2 w-full sm:w-1/2 focus:outline-green-500"
                type="text"
                name="position"
                required
              />
            </div>
          </div>
          {/* Company Name  */}
          <div className="space-y-2 mb-6">
            <div>
              <label
                className="text-lg sm:text-xl text-white font-semibold"
                htmlFor="companyName"
              >
                Company Name<span className="text-red-700"> *</span>
              </label>
            </div>

            <div>
              <input
                className="border border-gray-300 font-semibold rounded-md p-2 w-full sm:w-1/2 focus:outline-green-500"
                type="text"
                name="companyName"
                required
              />
            </div>
          </div>
          {/* status */}
          <div className="space-y-2 mb-6">
            <div>
              <label
                className="text-lg sm:text-xl text-white font-semibold"
                htmlFor="status"
              >
                Status<span className="text-red-700"> *</span>
              </label>
            </div>

            <div>
              <select
                name="status"
                className="border border-gray-300 rounded-md p-2 w-full sm:w-1/2 focus:outline-green-500"
              >
                <option className="text-black" value="">
                  Select
                </option>
                <option className="text-black" value="applied">
                  Applied
                </option>
                <option className="text-black" value="interviewing">
                  Interviewing
                </option>
                <option className="text-black" value="rejected">
                  Rejected
                </option>
              </select>
            </div>
          </div>
          {/* description */}
          <div className="space-y-2 mb-6">
            <div>
              <label
                className="text-lg sm:text-xl text-white font-semibold"
                htmlFor="description"
              >
                Job Description<span className="text-red-700"> *</span>
              </label>
            </div>
            <div>
              <textarea
                className="border border-gray-300 font-semibold rounded-md p-2 w-full h-24 sm:h-32 focus:outline-green-500"
                name="description"
                required
              ></textarea>
            </div>
          </div>
          {/* submit button  */}
          <div>
            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition w-full sm:w-auto"
            >
              Submit Application
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobsPage;
