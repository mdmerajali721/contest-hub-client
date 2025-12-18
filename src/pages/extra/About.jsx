import React from "react";
import { FaUsers, FaTrophy, FaPenNib, FaBullhorn } from "react-icons/fa";
import "animate.css";

const About = () => {
  return (
    <div className="pt-28 pb-16 px-6">
      <title>ContestHub - About</title>
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-14">
          <h1 className="text-3xl md:text-4xl font-extrabold animate__animated animate__fadeInDown">
            About <span className="text-green-600">Contest</span>
            <span className="text-gray-500">Hub</span>
          </h1>
          <div className="mt-6 h-1.5 w-40 mx-auto mb-8 bg-green-500 rounded-full animate__animated animate__zoomIn" />
          <p className="text-gray-500 max-w-2xl text-justify md:text-center mx-auto animate__animated animate__fadeInUp">
            ContestHub is a modern contest management platform where creators
            can host contests and participants can showcase talent across
            design, writing, ideas, and more.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1 */}
          <div className="p-6 bg-base-200 rounded-xl shadow-lg hover:shadow-xl transition animate__animated animate__zoomIn">
            <FaUsers className="text-4xl text-green-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Community Driven</h3>
            <p className="text-gray-500 text-sm">
              Thousands of users participate in contests daily, building a
              creative community.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-6 bg-base-200 rounded-xl shadow-lg hover:shadow-xl transition animate__animated animate__zoomIn animate__delay-1s">
            <FaTrophy className="text-4xl text-yellow-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Win Exciting Rewards</h3>
            <p className="text-gray-500 text-sm">
              Join contests and compete for prizes, recognition, and leaderboard
              rankings.
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-6 bg-base-200 rounded-xl shadow-lg hover:shadow-xl transition animate__animated animate__zoomIn animate__delay-2s">
            <FaPenNib className="text-4xl text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Show Your Skills</h3>
            <p className="text-gray-500 text-sm">
              Whether writing, designing, or problem-solving—showcase your
              abilities globally.
            </p>
          </div>

          {/* Card 4 */}
          <div className="p-6 bg-base-200 rounded-xl shadow-lg hover:shadow-xl transition animate__animated animate__zoomIn animate__delay-3s">
            <FaBullhorn className="text-4xl text-red-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Create Contests</h3>
            <p className="text-gray-500 text-sm">
              Contest creators can easily host contests, manage submissions, and
              choose winners.
            </p>
          </div>
        </div>

        {/* Mission Section */}
        <div className="mt-20 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-green-600 animate__animated animate__fadeIn">
            Our Mission
          </h2>
          <div className="mt-6 h-1.5 w-40 mx-auto mb-8 bg-green-500 rounded-full" />
          <p className="max-w-3xl mx-auto text-justify md:text-center text-gray-500 animate__animated animate__fadeInUp">
            ContestHub aims to empower creativity and innovation by connecting
            creators and participants worldwide. Our platform ensures
            transparency, fun competition, and professional growth.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
