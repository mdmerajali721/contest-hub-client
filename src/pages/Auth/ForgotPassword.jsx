import React, { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { useLocation, Link } from "react-router";
import toast from "react-hot-toast";

const ForgotPassword = () => {
  const { resetPassword } = useAuth();
  const location = useLocation();
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (location.state?.email) setEmail(location.state.email);
  }, [location.state]);

  const submit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    try {
      await resetPassword(email);
      toast.success("Password reset email sent! Please check your inbox.");
      setEmail("");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4 ">
      <div className="w-full max-w-md p-8 py-12 rounded shadow bg-base-300 ">
        <h2 className="text-3xl font-bold text-center text-green-600 mb-6">
          Forgot Password
        </h2>

        <form onSubmit={submit} className="space-y-4">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            type="email"
            placeholder="Enter your email"
            className="w-full text-sm border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-1 focus:ring-green-600"
            required
          />

          <div className="flex flex-col-reverse pt-2 gap-4 sm:flex-row">
            <Link
              to="/auth/login"
              className="w-full flex items-center font-semibold justify-center gap-2 bg-gray-200 text-gray-800 py-2 rounded-md hover:text-green-600 transition"
            >
              Back to Login
            </Link>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
            >
              Reset Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
