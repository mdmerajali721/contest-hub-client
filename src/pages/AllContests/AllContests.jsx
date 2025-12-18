import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router";
import ContestCard from "../../components/ContestCard/ContestCard";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "../../components/Loader/Loader";

export default function AllContests() {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const location = useLocation();

  // Get initial search term from URL
  const queryParams = new URLSearchParams(location.search);
  const initialSearch = queryParams.get("search") || "";

  const [searchQuery, setSearchQuery] = useState(initialSearch);

  // Update searchQuery if URL changes
  useEffect(() => {
    setSearchQuery(initialSearch);
  }, [initialSearch]);

  // Fetch all confirmed contests
  const { data: contests = [], isLoading } = useQuery({
    queryKey: ["all-contests", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get("/contests/all-users?status=Confirmed");
      return res.data;
    },
  });

  // Filter contests based on searchQuery only
  const filteredContests = contests.filter((contest) => {
    return (
      contest.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contest.title?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  // Handle search submit
  const handleSearch = (e) => {
    e.preventDefault();
    const trimmed = searchQuery.trim();
    navigate(`/all-contests?search=${encodeURIComponent(trimmed)}`);
  };

  if (loading || isLoading) {
    return <Loader />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 mt-28 mb-12 min-h-screen">
      <title>ContestHub - All Contests</title>
      {/* --- Search Box --- */}
      <form
        onSubmit={handleSearch}
        className="flex items-center mb-10 max-w-xl mx-auto bg-white/20 backdrop-blur-lg rounded-xl p-2 shadow-xl border border-gray-300"
      >
        <input
          type="text"
          placeholder="Search contests (design, writing, gaming...)"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 p-3 bg-transparent text-yellow-500 placeholder-gray-400 outline-none font-medium"
        />

        <button
          type="submit"
          className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-5 py-2 rounded shadow-lg transition-all"
        >
          <FaSearch /> Search
        </button>
      </form>

      {/* --- Contest Grid --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredContests.length > 0 ? (
          filteredContests.map((contest) => (
            <ContestCard key={contest._id} contest={contest} />
          ))
        ) : (
          <div className="col-span-full text-center py-20">
            <p className="text-gray-400 text-lg">
              No contests found for "{searchQuery}"
            </p>
          </div>
        )}
      </div>
    </div>
  );
}