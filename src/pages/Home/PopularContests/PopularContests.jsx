import React from "react";
import { useNavigate } from "react-router";
import ContestCard from "../../../components/ContestCard/ContestCard";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { Loader } from "../../../components/Loader/Loader";

export default function PopularContests() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: contests = [], isLoading } = useQuery({
    queryKey: ["popular-contests", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        "/contests/popular-contests?status=Confirmed"
      );
      return res.data;
    },
  });

  if (isLoading) {
    return <Loader />;
  }

  // Sort by participants
  const sortedContests = [...contests].sort(
    (a, b) => (b.participants || 0) - (a.participants || 0)
  );

  const topContests = sortedContests.slice(0, 6);

  return (
    <section className="px-4 py-10 md:px-6 bg-base-100">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2 className="mb-3 text-3xl md:text-4xl font-extrabold text-green-500">
            Popular Contests
          </h2>
          <div className="mx-auto w-40 h-1.5 mb-6 rounded-full bg-green-500" />
          <p className="max-w-xl mx-auto text-gray-600">
            Join the most happening challenges right now. Compete with thousands
            and prove your mettle.
          </p>
        </div>

        {/* Contests Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {topContests.map((contest) => (
            <ContestCard key={contest._id} contest={contest} isPopular />
          ))}
        </div>

        {/* Show All Button */}
        <div className="text-center mt-10">
          <button
            onClick={() => navigate("/all-contests")}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg transition-all duration-200"
          >
            Show All Contests
          </button>
        </div>
      </div>
    </section>
  );
}
