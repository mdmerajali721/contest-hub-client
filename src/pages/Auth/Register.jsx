import { Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import SocialLogin from "./SocialLogin/SocialLogin";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";

const Register = () => {
  const [eye, setEye] = useState(true);
  const { createUser, updateUser } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { handleSubmit, register } = useForm();
  const location = useLocation();

  const handleRegister = (data) => {
    const { name, email, password, photoURL } = data;

    createUser(email, password)
      .then(() => {
        const userInfo = {
          displayName: name,
          email,
          photoURL,
        };

        axiosSecure.post("/users", userInfo);

        updateUser(name, photoURL)
          .then(() => {
            Swal.fire({
              icon: "success",
              title: "Account Created!",
              text: `Welcome, ${name}!`,
              showConfirmButton: false,
              timer: 1500,
            }).then(() => {
              navigate(location.state || "/");
            });
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: "Update Failed",
              text: error.message,
            });
          });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Registration Failed",
          text: error.message,
        });
      });
  };

  return (
    <div className="flex items-center mt-24 md:mt-16 justify-center min-h-screen py-10 bg-base-100">
      <title>ContestHub - Register</title>
      <div className="w-full max-w-md p-6 py-12 shadow-md bg-base-200 rounded-md">
        {/* form */}
        <form onSubmit={handleSubmit(handleRegister)} className="relative z-10">
          {/* Title */}
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-center text-green-600 mb-6">
              Register to Contest<span className="text-gray-500">Hub</span>
            </h1>
          </div>

          {/* Inputs */}
          <div className="space-y-6">
            <div className="relative flex items-center">
              <input
                {...register("name")}
                type="text"
                required
                className="w-full border border-gray-200 rounded-md px-3 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-green-600"
                placeholder="Name"
              />
            </div>
            <div className="relative flex items-center">
              <input
                {...register("photoURL")}
                type="url"
                required
                className="w-full border border-gray-200 rounded-md px-3 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-green-600"
                placeholder="Photo URL"
              />
            </div>
            <div className="relative flex items-center">
              <input
                {...register("email")}
                type="email"
                required
                className="w-full border border-gray-200 rounded-md px-3 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-green-600"
                placeholder="Email"
              />
            </div>

            {/* Password */}
            <div className="relative flex items-center">
              <input
                {...register("password")}
                type={eye ? "password" : "text"}
                required
                className="w-full border border-gray-200 rounded-md px-3 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-green-600"
                placeholder="Enter password"
              />
              <button
                type="button"
                onClick={() => setEye(!eye)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
              >
                {eye ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <div className="mt-8">
            <button className="w-full cursor-pointer text-white py-2 rounded-md bg-green-600 hover:bg-green-700 transition font-medium disabled:opacity-50">
              Register
            </button>
          </div>

          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-3 text-gray-400 text-sm font-medium">Or</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>
          <SocialLogin />
        </form>
        <p className="mt-6 text-sm text-center text-gray-600">
          Already have an account?{" "}
          <Link
            to="/auth/login"
            className="text-blue-500 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
