import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router";
import Banner1 from "../..//assets/contest1.jpeg";
import Banner2 from "../../assets/contest2.jpeg";

const Banner = () => {
  const [current, setCurrent] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const images = [Banner1, Banner2];

  // slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  });

  const handleSearch = (e) => {
    e.preventDefault();
    const term = searchTerm.trim();
    if (!term) return;
    navigate(`/all-contests?search=${encodeURIComponent(term)}`);
    setSearchTerm("");
  };

  return (
    <section className="relative w-full h-[650px] md:h-[700px] overflow-hidden flex items-center justify-center">
      {/* Background Images */}
      {images.map((img, index) => (
        <img
          key={index}
          src={img}
          alt="Banner Slide"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 md:px-0">
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-yellow-300 drop-shadow-2xl mb-6 animate__animated animate__fadeInDown">
          Join Exciting Contests & Showcase Your Creativity
        </h1>

        <p className="text-sm sm:text-lg md:text-2xl text-gray-200 mb-10 font-medium animate__animated animate__fadeInUp">
          Discover, participate, and shine in contests built for creators like
          you
        </p>

        {/* Search Box */}
        <form
          onSubmit={handleSearch}
          className="flex items-center max-w-xl mx-auto bg-white/20 backdrop-blur-lg rounded-xl p-2 shadow-xl border border-white/30 transition-transform duration-300"
        >
          <input
            type="text"
            placeholder="Search contests by type (design, writing, gaming...)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 p-3 bg-transparent text-yellow-300 placeholder-gray-200 outline-none font-medium"
          />
          <button
            type="submit"
            className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-5 py-2 rounded shadow-lg transition-all duration-200"
          >
            <FaSearch /> Search
          </button>
        </form>

        <div className="flex justify-center mt-6 gap-2">
          {images.map((_, idx) => (
            <div
              key={idx}
              className={`w-3 h-3 rounded-full transition-all ${
                idx === current ? "bg-yellow-400 scale-125" : "bg-white/40"
              }`}
            ></div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Banner;