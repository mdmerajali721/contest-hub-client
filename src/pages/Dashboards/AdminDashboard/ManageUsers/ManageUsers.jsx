import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const { user: currentUser } = useAuth();

  const {
    data: users = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  
  const handleRoleChange = (userId, newRole) => {
    Swal.fire({
      title: "Confirm Role Change",
      text: `Change role to "${newRole}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#22c55e",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes, update",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/users/${userId}`, { role: newRole })
          .then((res) => {
            if (res.data.modifiedCount) {
              refetch();
              Swal.fire({
                icon: "success",
                title: "Role Updated",
                timer: 1500,
                showConfirmButton: false,
              });
            }
          })
          .catch((e) => toast.error(e.message));
      }
    });
  };

  const UserCard = ({ u }) => {
    const isDisabled = u.email === currentUser?.email || u.role === "admin";

    return (
      <div className="p-4 rounded-xl bg-base-100 shadow-sm space-y-3">
        <title>ContestHub - Admin Manage User</title>
        <div className="flex items-center gap-3">
          <img
            src={u.photoURL}
            alt=""
            className="w-12 h-12 rounded-full ring-2 ring-green-500"
          />
          <div>
            <p className="font-semibold">{u.displayName || "Unknown"}</p>
            <p className="text-xs text-slate-500">{u.email}</p>
          </div>
        </div>

        <select
          value={u.role}
          disabled={isDisabled}
          onChange={(e) => handleRoleChange(u._id, e.target.value)}
          title={u.role === "admin" ? "Admin role cannot be changed" : ""}
          className="w-full px-3 py-2 text-sm border border-base-300 sadow rounded-md focus:outline-none focus:ring-1 focus:ring-green-600
                     disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <option value="user">User</option>
          <option value="creator">Creator</option>
          <option value="admin">Admin</option>
        </select>
      </div>
    );
  };

  return (
    <div className="space-y-6 mx-6 mb-8">
     
      <div className="mt-24 md:mt-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-green-600">Manage Users</h2>
          <p className="text-sm text-slate-500">
            Control user roles & permissions
          </p>
        </div>

        <span className="px-4 py-2 text-sm font-semibold text-green-600">
          Total Users: {users.length}
        </span>
      </div>

      
      <div className="grid gap-4 sm:hidden">
        {isLoading && (
          <p className="text-center text-slate-500">Loading users...</p>
        )}

        {!isLoading && users.map((u) => <UserCard key={u._id} u={u} />)}
      </div>

      <div className="hidden sm:block overflow-hidden rounded-xl shadow-sm bg-base-100">
        <div className="overflow-x-auto max-h-[70vh]">
          <table className="w-full text-sm">
            <thead className="sticky top-0 bg-base-200 shadow text-green-500 text-xs">
              <tr>
                <th className="px-6 py-4 text-left">User</th>
                <th className="px-6 py-4 text-left">Email</th>
                <th className="px-6 py-4 text-center">Change Role</th>
              </tr>
            </thead>

            <tbody>
              {users.map((u, i) => {
                const isDisabled =
                  u.email === currentUser?.email || u.role === "admin";

                return (
                  <tr
                    key={u._id}
                    className={`transition ${i % 2 === 0 ? "" : "bg-base-200"}`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={u.photoURL}
                          alt=""
                          className="w-10 h-10 rounded-full ring-2 ring-green-500/30"
                        />
                        <span className="font-semibold">
                          {u.displayName || "Unknown"}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-slate-500">{u.email}</td>

                    <td className="px-6 py-4 text-center ">
                      <select
                        value={u.role}
                        disabled={isDisabled}
                        onChange={(e) =>
                          handleRoleChange(u._id, e.target.value)
                        }
                        title={
                          u.role === "admin"
                            ? "Admin role cannot be changed"
                            : ""
                        }
                        className="w-36 px-3 bg-base-300 py-2 text-sm rounded-md
                                    focus:ring-green-600
                                   disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <option value="user">User</option>
                        <option value="creator">Creator</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;