import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Loader } from "../../components/Loader/Loader";
import { Search, Crown } from "lucide-react";

export default function Leaderboard() {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const axiosSecure = useAxiosSecure();

  const { data: allUsers = [], isLoading } = useQuery({
    queryKey: ["leader-board", "all-users-rank"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  useEffect(() => {
    if (allUsers.length > 0) {
      const winningUsers = allUsers.filter(
        (u) => u.role === "user" && (u.winCount || 0) > 0
      );

      const sortedData = [...winningUsers].sort(
        (a, b) => (b.winCount || 0) - (a.winCount || 0)
      );

      setUsers(
        sortedData.map((user, index) => ({
          ...user,
          rank: index + 1,
        }))
      );
    }
  }, [allUsers]);

  const filteredUsers = users.filter((u) =>
    u.displayName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentUsers = filteredUsers.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const getRowBg = (rank, index) => {
    if (rank === 1) return "bg-yellow-100";
    if (rank === 2) return "bg-gray-100";
    if (rank === 3) return "bg-amber-100";
    return index % 2 === 0 ? "bg-white" : "bg-base-200";
  };

  if (isLoading) return <Loader />;

  return (
    <div className="min-h-screen bg-base-100 pb-20 mt-24 px-6">
      <title>ContestHub - Leaderboard</title>
      <h1 className="text-3xl font-extrabold text-center text-green-500 mb-6">
        Contest Leaderboard
        <div className="mt-6 h-1.5 w-40 mx-auto bg-green-500 rounded-full" />
      </h1>

      {/* Search */}
      <div className="z-20 py-4">
        <div className="max-w-md mx-auto relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-green-500"
            size={18}
          />
          <input
            type="text"
            placeholder="Search winner..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full border border-gray-300 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-1 ring-green-600 transition"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl shadow-sm bg-base-100 mt-4 max-h-[70vh] overflow-y-auto">
        <table className="min-w-full text-sm text-left">
          <thead className="sticky top-0 bg-green-600 text-white text-xs font-semibold">
            <tr>
              <th className="px-6 py-3">#</th>
              <th className="px-6 py-3">User</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3 text-center">Wins</th>
              <th className="px-6 py-3 text-center">Role</th>
            </tr>
          </thead>

          <tbody>
            {currentUsers.length > 0 ? (
              currentUsers.map((user, index) => (
                <tr
                  key={user._id}
                  className={`${getRowBg(
                    user.rank,
                    index
                  )} hover:bg-green-50 transition`}
                >
                  <td className="px-6 py-4 font-bold text-gray-900">
                    {user.rank}
                  </td>
                  <td className="px-6 py-4 flex  uppercase items-center gap-2">
                    <img
                      src={user.photoURL || "/avatar.png"}
                      alt={user.displayName}
                      className="w-10 h-10 rounded-full  object-cover"
                    />
                    <span className="font-bold text-gray-800">
                      {user.displayName}
                    </span>
                    {user.rank === 1 && (
                      <Crown size={14} className="text-green-500 ml-1" />
                    )}
                  </td>
                  <td className="px-6 py-4 text-gray-500 font-medium">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 text-center text-gray-500 font-bold">
                    {user.winCount}
                  </td>
                  <td className="px-6 py-4 text-center text-gray-500 capitalize">
                    {user.role}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-10 text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        {filteredUsers.length > itemsPerPage && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-base-300">
            <span className="text-xs text-slate-500">
              Showing {startIndex + 1}–
              {Math.min(startIndex + itemsPerPage, filteredUsers.length)} of{" "}
              {filteredUsers.length}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((p) => p - 1)}
                disabled={currentPage === 1}
                className="p-2 rounded-lg hover:bg-base-200 disabled:opacity-50"
              >
                Prev
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-8 h-8 rounded-lg text-xs font-bold ${
                      page === currentPage
                        ? "bg-green-600 text-white"
                        : "hover:bg-base-200"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}
              <button
                onClick={() => setCurrentPage((p) => p + 1)}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg hover:bg-base-200 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}