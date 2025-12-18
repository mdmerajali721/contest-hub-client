import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import SocialLogin from "./SocialLogin/SocialLogin";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [eye, setEye] = useState(true);
  const { signInUser } = useAuth();
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm();
  const location = useLocation();

  const handleSignIn = (data) => {
    const { email, password } = data;
    signInUser(email, password)
      .then(() => {
        // SweetAlert for success
        Swal.fire({
          icon: "success",
          title: "Login Successful!",
          text: `Welcome back, ${email}!`,
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(location.state || "/");
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: err.message,
        });
      });
  };

  return (
    <div className="flex items-center mt-22 md:mt-16 justify-center min-h-screen py-10 bg-base-100">
      <title>ContestHub - Login</title>
      <div className="w-full max-w-md p-6 py-12 shadow-md bg-base-200 rounded-md">
        {/* Form */}
        <form onSubmit={handleSubmit(handleSignIn)} className="relative z-10">
          {/* Title */}
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-center text-green-600 mb-6">
              Login to Contest<span className="text-gray-500">Hub</span>
            </h1>
          </div>

          {/* Inputs */}
          <div className="space-y-6">
            {/* Email */}
            <div className="flex flex-col gap-4">
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
                placeholder="Password"
              />
              <button
                type="button"
                onClick={() => setEye(!eye)}
                className="absolute cursor-pointer right-2"
              >
                {eye ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {/* Forgot Password */}
            <div className="flex justify-end text-sm mb-2">
              <Link
                state={location.state}
                to="/auth/forgot-password"
                className="text-green-600 hover:underline inline-block"
              >
                Forgot Password?
              </Link>
            </div>
          </div>

          {/* Login Button */}
          <div className="mt-8">
            <button className="w-full cursor-pointer text-white py-2 rounded-md bg-green-600 hover:bg-green-700 transition font-medium disabled:opacity-50">
              Login
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
          Don’t have an account?{" "}
          <Link
            state={location.state}
            to="/auth/register"
            className="text-blue-500 font-semibold hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
