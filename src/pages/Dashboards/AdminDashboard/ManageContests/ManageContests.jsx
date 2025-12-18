import { useState } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../hooks/useAuth";
import Swal from "sweetalert2";
import { Loader } from "../../../../components/Loader/Loader";
import { toast } from "react-toastify";

const ManageContests = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const {
    data: contests = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["all-contests", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get("/contests");
      return res.data;
    },
  });

  // Sort contests by newest first
  const sortedContests = [...contests].sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  const totalPages = Math.ceil(sortedContests.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentContests = sortedContests.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  
  const handleStatusChange = (id, newStatus) => {
    axiosSecure
      .patch(`/contests/${id}/admin`, { newStatus })
      .then((res) => {
        if (res.data.modifiedCount) {
          refetch();
          Swal.fire({
            icon: "success",
            title: `Contest ${newStatus}`,
            timer: 1500,
            showConfirmButton: false,
          });
        }
      })
      .catch((e) => toast.error(e.message));
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Delete Contest?",
      text: "This action cannot be undone",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/contests/${id}`)
          .then((res) => {
            if (res.data.deletedCount) {
              refetch();
              Swal.fire("Deleted!", "", "success");
            }
          })
          .catch((e) => toast.error(e.message));
      }
    });
  };

  
  const getStatusBadge = (status) => {
    const base =
      "inline-flex items-center gap-1 px-3 py-1 rounded text-xs font-medium";

    if (status === "Pending") {
      return (
        <span className={`${base} bg-yellow-100 text-yellow-700`}>Pending</span>
      );
    }

    if (status === "Confirmed") {
      return (
        <span className={`${base} bg-green-100 text-green-700`}>Active</span>
      );
    }

    if (status === "Rejected") {
      return (
        <span className={`${base} bg-red-100 text-red-700`}>Rejected</span>
      );
    }
  };

  if (isLoading) return <Loader />;

  return (
    <div className="space-y-6 mx-6 mb-8">
      <title>ContestHub - Admin Manage Contests</title>
      <div className="mt-24 md:mt-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-green-600">Manage Contests</h2>
          <p className="text-sm text-slate-500">
            Review, approve or reject contests
          </p>
        </div>

        <span className="px-4 py-2 text-sm font-semibold text-green-600">
          Total Contests: {contests.length}
        </span>
      </div>

      <div className="overflow-x-auto rounded-xl shadow-sm bg-base-100">
        <div className="overflow-x-auto max-h-[70vh]">
          <table className="w-full text-sm">
            <thead className="sticky top-0 bg-base-200 shadow text-xs text-green-600">
              <tr>
                <th className="px-6 py-4 text-left">#</th>
                <th className="px-6 py-4 text-left">Contest</th>
                <th className="px-6 py-4 text-left">Creator</th>
                <th className="px-6 py-4">Fee / Prize</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {currentContests.map((contest, i) => (
                <tr key={contest._id} className={i % 2 ? "bg-base-200" : ""}>
                  <td className="px-6 py-4 text-slate-500">
                    {startIndex + i + 1}
                  </td>

                  <td className="px-6 py-4 font-medium">
                    {contest.name}
                    <p className="text-xs text-slate-400">
                      ID: #{contest._id.slice(-6)}
                    </p>
                  </td>

                  <td className="px-6 py-4">{contest.creatorName}</td>

                  <td className="px-6 py-4 text-xs">
                    Fee: ${contest.price}
                    <br />
                    <span className="font-semibold text-green-600">
                      Prize: ${contest.prizeMoney}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    {getStatusBadge(contest.status)}
                  </td>

                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      {contest.status !== "Confirmed" && (
                        <button
                          onClick={() =>
                            handleStatusChange(contest._id, "Confirmed")
                          }
                          className="px-3 py-1 rounded bg-green-500/20 text-green-600 hover:bg-green-500/30"
                        >
                          Approve
                        </button>
                      )}

                      {contest.status !== "Rejected" && (
                        <button
                          onClick={() =>
                            handleStatusChange(contest._id, "Rejected")
                          }
                          className="px-3 py-1 rounded bg-orange-500/20 text-orange-600 hover:bg-orange-500/30"
                        >
                          Reject
                        </button>
                      )}

                      <button
                        onClick={() => handleDelete(contest._id)}
                        className="px-3 py-1 rounded bg-red-500/20 text-red-600 hover:bg-red-500/30"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {!currentContests.length && (
                <tr>
                  <td colSpan="6" className="py-10 text-center text-slate-400">
                    No contests found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {contests.length > itemsPerPage && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-base-300">
            <span className="text-xs text-slate-500">
              Showing {startIndex + 1}–
              {Math.min(startIndex + itemsPerPage, contests.length)} of{" "}
              {contests.length}
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
};

export default ManageContests;
