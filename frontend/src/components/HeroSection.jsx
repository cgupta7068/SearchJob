import { useState } from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    // ✅ CHANGE: added responsive padding
    // ❌ REMOVE: className="text-center"
    // ✅ ADD:
    <div className="text-center px-2 sm:px-4">
      
      {/* ✅ CHANGE: reduce margin for mobile */}
      {/* ❌ REMOVE: my-10 */}
      {/* ✅ ADD: my-8 sm:my-10 */}
      <div className="flex flex-col gap-5 my-8 sm:my-10">

        <h1 
          // ✅ CHANGE: responsive text size
          // ❌ REMOVE: text-5xl
          // ✅ ADD:
          className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight"
        >
          Search, Apply & <br /> Get Your{" "}
          <span className="text-[#6A38C2] inline-block">
            {"Dream Jobs".split("").map((char, index) => (
              <span
                key={index}
                className="inline-block opacity-0 animate-fadeIn"
                style={{
                  animationDelay: `${index * 0.1}s`,
                  animationFillMode: "forwards",
                }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </span>
        </h1>

        <p 
          // ✅ CHANGE: responsive text size
          // ❌ REMOVE: text-xl md:text-2xl
          // ✅ ADD:
          className="text-base sm:text-lg md:text-2xl font-semibold text-yellow-700 italic text-center leading-relaxed tracking-wide px-2"
        >
          “Turn your ambition into action — 
          <span className="text-[#c2385b] font-bold">
            {" "}your dream job is waiting.
          </span>
          ”
        </p>

        <div 
          // 🚨 MAIN FIX HERE
          // ❌ REMOVE: w-[40%] gap-4
          // ✅ ADD: responsive width + responsive gap
          className="flex w-full sm:w-[80%] md:w-[60%] lg:w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-2 sm:gap-4 mx-auto"
        >
          <input
            type="text"
            placeholder="Find your dream jobs"
            onChange={(e) => setQuery(e.target.value)}
            
            // ✅ CHANGE: add responsive text size
            // ❌ REMOVE: className="outline-none border-none w-full"
            // ✅ ADD:
            className="outline-none border-none w-full text-sm sm:text-base"
          />

          <Button
            onClick={searchJobHandler}
            
            // ✅ CHANGE: add padding for better mobile click
            // ❌ REMOVE: className="rounded-r-full bg-[#6A38C2]"
            // ✅ ADD:
            className="rounded-r-full bg-[#6A38C2] px-3 sm:px-4"
          >
            <Search 
              // ✅ CHANGE: responsive icon size
              // ❌ REMOVE: h-5 w-5
              // ✅ ADD:
              className="h-4 w-4 sm:h-5 sm:w-5" 
            />
          </Button>
        </div>

      </div>
    </div>
  );
};

export default HeroSection;