import { Link, useNavigate } from "react-router";
import {
  PlusCircle,
  Edit,
  Trash2,
  Calendar as CalendarIcon,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Loader } from "../../../../components/Loader/Loader";
import { toast } from "react-toastify";

const MyContests = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const {
    data: contests = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["my-contests", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/contests/creator?email=${user?.email}`
      );
      return res.data;
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      text: "Are you sure you want to delete this contest?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/contests/creator/${id}`)
          .then((res) => {
            if (res.data.deletedCount) {
              refetch();
              Swal.fire({
                title: "Deleted!",
                text: "Your contest has been deleted.",
                icon: "success",
              });
            }
          })
          .catch((e) => {
            toast.error(e.message);
          });
      }
    });
  };

  function formatDate(iso) {
    const d = new Date(iso);
    return d.toLocaleString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      timeZone: "Asia/Dhaka",
    });
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case "Pending":
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700 border border-yellow-200">
            Pending
          </span>
        );
      case "Confirmed":
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 border border-green-200">
            Confirmed
          </span>
        );
      case "Rejected":
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700 border border-red-200">
            Rejected
          </span>
        );
      default:
        return null;
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  // Sort: Pending first, then by latest created (or deadline) descending
  const sortedContests = [...contests].sort((a, b) => {
    if (a.status === "Pending" && b.status !== "Pending") return -1;
    if (a.status !== "Pending" && b.status === "Pending") return 1;

    // If both are same status, sort by latest created (descending)
    const dateA = new Date(a.createdAt || a.deadline).getTime();
    const dateB = new Date(b.createdAt || b.deadline).getTime();
    return dateB - dateA;
  });

  return (
    <div className="space-y-6 mt-24 md:mt-12">
      <title>ContestHub - Creator Contests</title>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-extrabold text-green-600">
            My Contests
          </h2>
          <p className="text-sm text-slate-500">Manage your created Contest.</p>
        </div>
      </div>

      <div className="overflow-hidden rounded">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs font-semibold text-green-500">
              <tr>
                <th className="px-6 py-4">Contest</th>
                <th className="px-6 py-4">Deadline</th>
                <th className="px-6 py-4">Price / Prize</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-center">Submissions</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-green-500">
              {sortedContests.map((contest) => (
                <tr key={contest._id} className="transition-color">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={contest.image}
                        alt=""
                        className="object-cover w-10 h-10 rounded-lg"
                      />
                      <div>
                        <p className="font-bold">{contest.name}</p>
                        <p className="text-xs text-gray-400">{contest.type}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-500">
                    <div className="flex items-center gap-1.5">
                      <CalendarIcon className="w-3.5 h-3.5" />
                      {formatDate(contest.deadline)}
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium">
                    <div className="text-primary">
                      ${contest.price} <span className="text-gray-300">/</span>{" "}
                      <span className="text-[#00b074]">
                        ${contest.prizeMoney}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(contest.status)}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <Link
                      to={`/dashboard/submissions/${contest._id}`}
                      className="text-xs font-medium text-green-500 hover:text-green-600 hover:underline"
                    >
                      See Submissions
                    </Link>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      {contest.status === "Pending" ? (
                        <>
                          <button
                            onClick={() =>
                              navigate(`/dashboard/edit-contest/${contest._id}`)
                            }
                            className="p-2 text-blue-600 transition-colors rounded-lg cursor-pointer hover:bg-blue-50"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(contest._id)}
                            className="p-2 text-red-600 transition-colors rounded-lg cursor-pointer hover:bg-red-50"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </>
                      ) : (
                        <span className="text-xs italic text-gray-400">
                          Locked
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyContests;
