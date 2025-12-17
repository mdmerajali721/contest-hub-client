import React from "react";
import { Link } from "react-router";
import Facebook from "../../assets/Facebook.png";
import Linkedin from "../../assets/Linkedin.png";

export default function Footer() {
  return (
    <footer className="bg-base-100 pt-6 shadow-[0_4px_6px_1px] py-5">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Logo & Description */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <Link to="/" className="mb-2">
            <h1 className="font-extrabold text-3xl text-green-500">
              Contest<span className="text-gray-500">Hub</span>
            </h1>
          </Link>
          <p className="text-sm md:text-[15px] text-gray-400 md:text-justify max-w-xs">
            A modern platform to create, explore, and manage contests with
            secure payments and role-based access.
          </p>
        </div>

        {/* Social Links */}

        <div>
          <div className="flex items-center gap-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform"
            >
              <img
                src={Facebook}
                alt="Facebook"
                className="w-8 h-8 rounded-md"
              />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform"
            >
              <img
                src={Linkedin}
                alt="LinkedIn"
                className="w-8 h-8 rounded-md"
              />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-gray-300 h-[0.5px] mx-4 mt-6 " />
      <div className="mt-6 text-center mx-4 text-sm text-gray-400">
        © {new Date().getFullYear()} ContestHub. All rights reserved.
      </div>
    </footer>
  );
}