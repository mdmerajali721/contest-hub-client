import React from "react";
import { Calendar, Trophy, Award } from "lucide-react";
import { useNavigate } from "react-router";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";

export const WinningContests = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { data: winnings = [] } = useQuery({
    queryKey: ["winner-contests", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/contests/winner/contests?email=${user?.email}`
      );
      return res.data;
    },
  });

  const handleDetails = (id) => {
    navigate(`/contest/${id}`);
  };

  return (
    <div className="mt-28 md:mt-8 px-4 space-y-10">
      <title>ContestHub - User Winning Contests</title>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {winnings.length > 0 ? (
          winnings.map((contest, index) => (
            <motion.article
              key={contest._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              onClick={() => handleDetails(contest._id)}
              className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl bg-base-200 transition-all duration-300 cursor-pointer flex flex-col h-full"
            >
              {/* Image */}
              <div className="relative w-full h-56 md:h-64 overflow-hidden bg-gray-200 rounded-t-2xl">
                <img
                  src={contest.image}
                  alt={contest.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Winner Badge */}
                <span className="absolute top-4 left-4 bg-yellow-400 text-black text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
                  🏆 Winner
                </span>

                {/* Type Badge */}
                <span className="absolute top-4 right-4 bg-green-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
                  {contest.type}
                </span>
              </div>

              {/* Content */}
              <div className="flex flex-col p-5 flex-1 justify-between">
                <div className="mb-3">
                  <h2 className="text-xl md:text-2xl font-bold mb-2 line-clamp-2 group-hover:text-green-600 transition-colors">
                    {contest.name}
                  </h2>

                  <p className="flex items-center gap-2 text-sm text-gray-500">
                    <Calendar size={14} />
                    Won on{" "}
                    {new Date(contest.winner?.winningDate).toLocaleDateString()}
                  </p>
                </div>

                {/* Stats */}
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <p className="text-xs text-gray-400 uppercase font-semibold">
                      Prize
                    </p>
                    <p className="text-xl font-bold text-green-600">
                      ${contest.prizeMoney}
                    </p>
                  </div>

                  <div className="flex items-center gap-1 text-green-600 font-bold">
                    <Award size={16} /> #1
                  </div>
                </div>

                {/* Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDetails(contest._id);
                  }}
                  className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2.5 rounded shadow-md transition-all duration-300"
                >
                  View Details
                </button>
              </div>
            </motion.article>
          ))
        ) : (
          /* Empty State */
          <div className="col-span-full flex flex-col items-center justify-center py-20 bg-base-200 rounded-2xl">
            <div className="flex items-center justify-center w-20 h-20 mb-4 rounded-full bg-green-100">
              <Trophy size={28} className="text-yellow-500" />
            </div>
            <h3 className="text-xl font-bold">No winnings yet</h3>
            <p className="mt-2 text-gray-500 text-sm">
              Compete, win, and enjoy exciting prizes!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};