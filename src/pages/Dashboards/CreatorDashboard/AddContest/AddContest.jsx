import { DollarSign, Trophy, Calendar } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import Swal from "sweetalert2";

const AddContest = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    data.email = user?.email;
    data.creatorName = user?.displayName;

    axiosSecure
      .post("/contests", data)
      .then((res) => {
        if (res.data.insertedId) {
          Swal.fire({
            icon: "success",
            title: "Contest Created!",
            text: "Your new contest has been successfully created.",
            confirmButtonText: "OK",
          }).then(() => {
            navigate("/dashboard/my-contests");
          });
        }
      })
      .catch((e) => {
        Swal.fire({
          icon: "error",
          title: "Oops!",
          text: `Error: ${e.message}`,
          confirmButtonText: "OK",
        });
      });
  };

  return (
    <div className="w-full mt-28 md:mt-10">
      <title>ContestHub - Creator Add Contest</title>
      <div className="mb-8">
        <h2 className="text-3xl text-green-500 font-extrabold">
          Create Your Contest
        </h2>
        <p className="text-gray-500">
          Provide the required details to create your new challenge.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-8 space-y-8 shadow-sm bg-base-100 mx-2 rounded-xl"
      >
        {/* --- Contest Information --- */}
        <div className="space-y-6">
          <h3 className="text-2xl text-green-500 font-bold">
            Contest Information
            <div className="w-full mt-2 h-[0.75px] bg-green-500" />
          </h3>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <input
                {...register("name", { required: "Contest name is required" })}
                type="text"
                placeholder="Contest Name"
                className="w-full border border-gray-200 rounded-md px-3 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-green-600"
              />
              {errors.name && (
                <p className="text-xs text-red-500">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <select
                {...register("type", { required: true })}
                className="w-full border border-gray-200 rounded-md px-3 bg-base-200 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-green-600"
              >
                <option value="">Select Contest Type</option>
                <option value="Image Design">Image Design</option>
                <option value="Article Writing">Article Writing</option>
                <option value="Video Content">Video Content</option>
                <option value="UX/UI Design">UX/UI Design</option>
                <option value="Photography">Photography</option>
                <option value="Logo & Branding">Logo & Branding</option>
                <option value="Animation & Motion Graphics">
                  Animation & Motion Graphics
                </option>
                <option value="Data Science">Data Science</option>
                <option value="Web & App Development">
                  Web & App Development
                </option>
                <option value="AI & Machine Learning">
                  AI & Machine Learning
                </option>
                <option value="Creative Writing">Creative Writing</option>
                <option value="Digital Marketing & Ads">
                  Digital Marketing & Ads
                </option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <input
              {...register("image", { required: "Image URL is required" })}
              type="url"
              placeholder="Contest Photo URL"
              className="w-full border border-gray-200 rounded-md px-3 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-green-600"
            />
            {errors.image && (
              <p className="text-xs text-red-500">{errors.image.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <textarea
              {...register("description", {
                required: "Description is required",
              })}
              rows="3"
              placeholder="Describe about your contest..."
              className="w-full border border-gray-200 rounded-md px-3 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-green-600"
            ></textarea>
            {errors.description && (
              <p className="text-xs text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>
        </div>

        {/* --- Prizes & Schedule --- */}
        <div className="space-y-6">
          <h3 className="pb-2 text-2xl text-green-500 font-bold">
            Prizes & Schedule Timeline
            <div className="w-full mt-2 h-[0.75px] bg-green-500" />
          </h3>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="space-y-2">
              <input
                {...register("price", { required: true, min: 0 })}
                type="number"
                placeholder="Entry Fee ($)"
                className="w-full border border-gray-200 rounded-md px-3 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-green-600"
              />
            </div>

            <div className="space-y-2">
              <input
                {...register("prizeMoney", { required: true, min: 0 })}
                type="number"
                placeholder="Prize Money ($)"
                className="w-full border border-gray-200 rounded-md px-3 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-green-600"
              />
            </div>

            <div className="space-y-2">
              <Controller
                control={control}
                name="deadline"
                rules={{ required: "Deadline is required" }}
                render={({ field }) => (
                  <DatePicker
                    selected={field.value}
                    onChange={(date) => field.onChange(date)}
                    minDate={new Date()}
                    dateFormat="dd MMM, yyyy"
                    placeholderText="Select Contest Deadline"
                    className="w-full border border-gray-200 rounded-md bg-base-200 px-3 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-green-600"
                  />
                )}
              />
              {errors.deadline && (
                <p className="text-xs text-red-500">
                  {errors.deadline.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* --- Instructions Task Details --- */}
        <div className="space-y-2">
          <h3 className="pb-2 text-2xl text-green-500 font-bold">
            Instructions Task Details
            <div className="w-full mt-2 h-[0.75px] bg-green-500" />
          </h3>

          <textarea
            {...register("instructions", {
              required: "Instructions are required",
            })}
            rows="5"
            placeholder="Give Your Contest Instructions Task Details..."
            className="w-full border border-gray-200 rounded-md px-3 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-green-600"
          ></textarea>
          {errors.instructions && (
            <p className="text-xs text-red-500">
              {errors.instructions.message}
            </p>
          )}
        </div>

        {/* --- Form Actions --- */}
        <div className="flex justify-end gap-4 pt-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-6 py-3 rounded bg-red-400 text-white font-bold hover:bg-red-500 cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-3 rounded bg-green-600 text-white font-bold hover:bg-green-700 cursor-pointer"
          >
            Create Contest
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddContest;
