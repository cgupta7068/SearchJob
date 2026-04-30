import { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import FilterCard from "./FilterCard";
import Job from "./Job";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const Jobs = () => {
  const { allJobs, searchedQuery } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allJobs);

  /* ✅ ADDED: mobile filter toggle */
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    if (searchedQuery) {
      const filteredJobs = allJobs.filter((job) => {
        return (
          job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.location.toLowerCase().includes(searchedQuery.toLowerCase())
        );
      });
      setFilterJobs(filteredJobs);
    } else {
      setFilterJobs(allJobs);
    }
  }, [allJobs, searchedQuery]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Navbar />

      <div className="max-w-7xl mx-auto mt-5 px-3 sm:px-4">
        {/* ================= MOBILE FILTER BUTTON ================= */}

        {/* ✅ ADDED */}
        <div className="sm:hidden mb-3">
          <button
            onClick={() => setIsFilterOpen(true)}
            className="bg-[#6A38C2] text-white px-4 py-2 rounded-md text-sm"
          >
            Filters
          </button>
        </div>

        <div className="flex gap-5">
          {/* ================= DESKTOP FILTER ================= */}

          {/* ❌ OLD: always visible */}
          {/* ✅ NEW: hide on mobile */}
          <div className="hidden sm:block w-[250px]">
            <FilterCard />
          </div>

          {/* ================= JOB LIST ================= */}

          {filterJobs.length <= 0 ? (
            <span className="text-white">Job not found</span>
          ) : (
            <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
              {/* ❌ OLD: grid-cols-3 */}
              {/* ✅ NEW: responsive */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filterJobs.map((job) => (
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                    key={job?._id}
                  >
                    <Job job={job} />
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ================= MOBILE FILTER OVERLAY ================= */}

      {isFilterOpen && (
        <>
          {/* BACKDROP */}
          <div
            className="fixed inset-0 bg-black/40 z-40"
            onClick={() => setIsFilterOpen(false)}
          />

          {/* FILTER PANEL */}
          <div
            className="
            fixed 
            
            /* ✅ ADD SPACE FROM TOP & BOTTOM */
            top-16 bottom-4 left-3
            
            w-[75%]
            
            bg-white
            z-50
            p-4
            shadow-xl
            rounded-xl   /* ✅ nicer look */
            overflow-y-auto
            
            animate-in slide-in-from-left duration-200
        "
          >
            <div className="flex justify-between items-center mb-3">
              <h1 className="font-bold">Filters</h1>
              <button
                onClick={() => setIsFilterOpen(false)}
                className="text-sm text-gray-500"
              >
                Close
              </button>
            </div>

            <FilterCard />
          </div>
        </>
      )}
    </div>
  );
};

export default Jobs;
