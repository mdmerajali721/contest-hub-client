import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import { Loader } from "../../../../components/Loader/Loader";

const MetricCard = ({ title, value, gradient }) => (
  <div
    className={`flex flex-col justify-between p-6 rounded-2xl shadow-md text-white ${gradient}`}
  >
    <p className="text-xs font-semibold uppercase opacity-80">{title}</p>
    <h2 className="mt-2 text-3xl font-bold">{value}</h2>
  </div>
);

const AdminOverview = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: users = [], isLoading: loadingUsers } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const { data: contests = [], isLoading: loadingContests } = useQuery({
    queryKey: ["contests", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get("/contests");
      return res.data;
    },
  });

  if (loadingUsers || loadingContests) return <Loader />;

  const totalUsers = users.length;
  const totalContests = contests.length;
  const pendingContests = contests.filter((c) => c.status === "Pending").length;
  const activeContests = contests.filter(
    (c) => c.status === "Confirmed"
  ).length;

  return (
    <div className="p-6 space-y-8 mt-20 md:mt-8">
      <title>ContestHub - Admin Dashboard</title>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Users"
          value={totalUsers}
          gradient="bg-gradient-to-r from-sky-500 to-cyan-500"
        />
        <MetricCard
          title="Total Contests"
          value={totalContests}
          gradient="bg-gradient-to-r from-indigo-600 to-purple-600"
        />
        <MetricCard
          title="Pending Contests"
          value={pendingContests}
          gradient="bg-gradient-to-r from-amber-400 to-orange-500"
        />
        <MetricCard
          title="Active Contests"
          value={activeContests}
          gradient="bg-gradient-to-r from-rose-500 to-pink-500"
        />
      </div>
    </div>
  );
};

export default AdminOverview;
