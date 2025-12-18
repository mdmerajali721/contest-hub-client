import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import { Loader } from "../../../../components/Loader/Loader";

const CreatorOverview = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Fetch contests
  const { data: contests = [], isLoading } = useQuery({
    queryKey: ["creator-overview", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/contests/creator?email=${user?.email}`
      );
      return res.data;
    },
  });

  if (isLoading) return <Loader />;

  const totalContests = contests.length;
  const activeContests = contests.filter((c) => !c.winner).length;
  const closedContests = contests.filter((c) => c.winner).length;

  return (
    <div className="mt-28 md:mt-0 px-6">
      <title>ContestHub - Creator Dashboard</title>
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="py-9 md:mt-8 bg-gradient-to-r from-sky-500 to-cyan-500 rounded shadow text-center">
          <p className="text-lg font-bold text-white">Total Contests</p>
          <p className="text-4xl font-bold text-white">{totalContests}</p>
        </div>
        <div className="py-9 md:mt-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded shadow text-center">
          <p className="text-lg font-bold text-white">Active Contests</p>
          <p className="text-4xl font-bold text-white">{activeContests}</p>
        </div>
        <div className="py-9 md:mt-8 bg-gradient-to-r from-amber-400 to-orange-500 rounded shadow text-center">
          <p className="text-lg font-bold text-white">Closed Contests</p>
          <p className="text-4xl font-bold text-white">{closedContests}</p>
        </div>
      </div>
    </div>
  );
};

export default CreatorOverview;