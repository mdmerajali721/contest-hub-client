import React from "react";
import { FaTrophy, FaUsers, FaMoneyBillWave, FaBolt } from "react-icons/fa";

const JoinContestHub = () => {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-6">
          Why Join{" "}
          <span className="text-green-500">
            Contest<span className="text-gray-500">Hub</span> ?
          </span>
        </h2>
        <p className="text-center text-gray-500 max-w-2xl mx-auto">
          Thousands of talented users participate every day. Join and explore
          contests that challenge your creativity and skills.
        </p>
        <div className="mt-6 h-1.5 w-40 mx-auto mb-10 bg-green-500 rounded-full" />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="bg-base-200 p-4 rounded-xl shadow hover:shadow-lg transition text-center">
            <FaTrophy className="mx-auto text-green-500 text-4xl mb-4" />
            <h3 className="text-xl text-green-600 font-semibold">
              Exciting Challenges
            </h3>
            <p className="text-gray-500 mt-2">
              Participate in unique contests designed for all skill levels.
            </p>
          </div>

          <div className="bg-base-200 p-4 rounded-xl shadow hover:shadow-lg transition text-center">
            <FaMoneyBillWave className="mx-auto text-green-500 text-4xl mb-4" />
            <h3 className="text-xl text-green-600 font-semibold">
              Earn Prizes
            </h3>
            <p className="text-gray-500 mt-2">
              Win money, rewards & recognition for your talent.
            </p>
          </div>

          <div className="bg-base-200 p-4 rounded-xl shadow hover:shadow-lg transition text-center">
            <FaUsers className="mx-auto text-green-500 text-4xl mb-4" />
            <h3 className="text-xl text-green-600 font-semibold">
              Active Community
            </h3>
            <p className="text-gray-500">
              Connect with thousands of creative participants.
            </p>
          </div>

          <div className="bg-base-200 p-4 rounded-xl shadow hover:shadow-lg transition text-center">
            <FaBolt className="mx-auto text-green-500 text-4xl mb-4" />
            <h3 className="text-xl text-green-600 font-semibold">
              Fast Results
            </h3>
            <p className="text-gray-500 mt-2">
              Get results quickly with a transparent judging process.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JoinContestHub;
