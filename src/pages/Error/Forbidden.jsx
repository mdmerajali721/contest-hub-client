import React from "react";
import { MdOutlineLockPerson } from "react-icons/md";
import { useNavigate } from "react-router";

export default function Forbidden() {
  const navigate = useNavigate();

  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden">
      {/* Card */}
      <div className="relative z-10 px-6 text-center">
        <div className="max-w-lg p-10 mx-auto shadow bg-base-300 backdrop-blur-xl rounded">
          {/* Text */}
          <h1 className="font-extrabold text-8xl text-red-500">403</h1>

          <div className="flex items-center text-red-500 justify-center gap-2 mt-2">
            <MdOutlineLockPerson size="24" />
            <h2 className="text-3xl font-bold text-red-500">
              Access Restricted
            </h2>
          </div>

          <p className="mt-4 text-sm text-gray-400">
            You don’t have access to this page. Please make sure you’re logged
            in with the correct account.
          </p>

          {/* Buttons */}
          <div className="flex flex-col justify-center gap-4 mt-10 sm:flex-row">
            <button
              onClick={() => navigate("/dashboard")}
              className="flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold transition-all rounded cursor-pointer bg-green-500 text-white hover:bg-green-600"
            >

              Go Back
            </button>

            <button
              onClick={() => navigate("/")}
              className="flex items-center justify-center gap-2 px-6 py-3 text-sm font-bold bg-base-200 transition-all rounded shadow cursor-pointer text-green-500 hover:text-green-700 "
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}