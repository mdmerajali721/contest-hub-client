import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaUser, FaPhone } from "react-icons/fa";
import { LuUser } from "react-icons/lu";
import { MdLocationOn } from "react-icons/md";
import { MdLocalPhone } from "react-icons/md";
import { ImLink } from "react-icons/im";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "../../../../components/Loader/Loader";
import { toast } from "react-hot-toast";

export const UserProfile = () => {
  const { user, updateUser } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [isEditing, setIsEditing] = useState(false);

  const {
    data: oneUser = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["updated-user"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/one?email=${user?.email}`);
      return res.data;
    },
  });

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      displayName: oneUser?.displayName || "",
      phoneNumber: oneUser?.phoneNumber || "",
      photoURL: oneUser?.photoURL || "",
      address: oneUser?.address || "",
    },
  });

  useEffect(() => {
    if (oneUser) {
      reset({
        displayName: oneUser?.displayName,
        phoneNumber: oneUser?.phoneNumber,
        photoURL: oneUser?.photoURL,
        address: oneUser?.address,
      });
    }
  }, [oneUser, reset]);

  const onSubmit = (data) => {
    const { photoURL, displayName } = data;

    axiosSecure
      .patch(`/users/${oneUser?._id}/info`, data)
      .then((res) => {
        if (res.data.modifiedCount) {
          refetch();
          updateUser(displayName, photoURL)
            .then(() => {
              toast.success("Profile updated successfully!", {
                duration: 2000,
                position: "top-center",
              });
            })
            .catch((err) => toast.error(err.message));
        }
      })
      .catch((e) => toast.error(e.message));

    setIsEditing(false);
  };

  if (isLoading) return <Loader />;

  return (
    <div className="min-h-screen flex flex-col items-center justify-start py-10 px-4">
      <title>ContestHub - User Profile</title>
      {/* Header */}
      <div className="mt-20 md:mt-6 text-center mb-12">
        <h1 className="text-4xl text-green-500 font-extrabold">My Profile</h1>
        <p className="text-gray-500 mt-2">
          Manage your personal info and account settings
        </p>
        <div className="mt-6 h-1.5 w-40 mx-auto bg-green-500 rounded-full" />
      </div>

      {/* Glass Card */}
      <div className="w-full max-w-5xl backdrop-blur-lg bg-base-200 rounded shadow flex flex-col md:flex-row overflow-hidde">
        {/* Left: Profile */}
        <div className="md:w-1/3 flex flex-col items-center justify-center p-8">
          <div className="w-25 h-25 rounded-full overflow-hidden border-3 border-green-500 shadow-lg">
            <img src={oneUser?.photoURL || "/avator.jpg"} alt="Profile" />
          </div>
          <h2 className="mt-4 text-2xl text-green-500 font-bold">
            {oneUser?.displayName || "Your Name"}
          </h2>
          <p className="text-sm text-gray-500">{oneUser?.email}</p>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="mt-5 px-4 py-2 cursor-pointer rounded bg-green-500 hover:bg-green-600 text-white font-bold transition-transform"
          >
            {isEditing ? "Cancel" : "Edit Profile"}
          </button>
        </div>

        {/* Right: Details / Form */}
        <div className="md:w-2/3 p-8">
          {isEditing ? (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="flex items-center gap-2 font-semibold">
                    <LuUser className="w-4 h-4" /> Full Name
                  </label>
                  <input
                    type="text"
                    {...register("displayName", { required: true })}
                    placeholder="Full Name"
                    className="w-full border mt-2 border-gray-200 rounded px-3 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-green-600"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2  font-semibold">
                    <MdLocalPhone className="w-4 h-4" /> Phone
                  </label>
                  <input
                    type="tel"
                    {...register("phoneNumber")}
                    placeholder="+880 1XXX XXXXXX"
                    className="w-full border mt-2 border-gray-200 rounded px-3 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-green-600"
                  />
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2 font-semibold">
                  <ImLink className="w-4 h-4" /> Profile Photo URL
                </label>
                <input
                  type="url"
                  {...register("photoURL")}
                  placeholder="Enter your image url..."
                  className="w-full border mt-2 border-gray-200 rounded px-3 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-green-600"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 font-semibold">
                  <MdLocationOn className="w-4 h-4" /> Address
                </label>
                <textarea
                  rows="4"
                  {...register("address")}
                  placeholder="Enter your address..."
                  className="w-full border mt-2 border-gray-200 rounded p-3 text-sm focus:outline-none focus:ring-1 focus:ring-green-600"
                />
              </div>

              <div className="flex justify-end gap-4 mt-4">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 cursor-pointer rounded border transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded cursor-pointer bg-green-500 hover:bg-green-600 text-white transition-transform"
                >
                  Save
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-6">
              <div>
                <h4 className=" font-semibold uppercase text-gray-500">
                  Full Name
                </h4>
                <p className="text-lg text-green-500 font-medium">
                  {oneUser?.displayName || "Not set"}
                </p>
              </div>
              <div>
                <h4 className=" font-semibold text-gray-500 uppercase">
                  Phone
                </h4>
                <p className=" text-lg text-green-500 font-medium">
                  {oneUser?.phoneNumber || "+880 10000-00000"}
                </p>
              </div>
              <div>
                <h4 className=" font-semibold text-gray-500 uppercase">
                  Address
                </h4>
                <p className="text-lg text-green-500 font-medium">
                  {oneUser?.address || "Dhaka, Bangladesh"}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};