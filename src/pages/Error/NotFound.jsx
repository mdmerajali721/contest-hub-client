import React from "react";
import { useNavigate } from "react-router";
import NotFoundIcon from "../../assets/notfound.png";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <title>ContestHub - Not Found</title>
      <div className="text-center rounded-2xl p-8 md:p-16">
        <img
          src={NotFoundIcon}
          alt="Not Found Illustration"
          className="w-25 md:w-40 mt-10 mx-auto opacity-90 animate-bounce"
        />
        <h1 className="text-6xl font-extrabold text-red-500 animate-pulse mb-4">
          404
        </h1>
        <p className="text-lg md:text-2xl text-gray-400 mb-6">
          Oops! The page you are looking for does not exist.
        </p>
        <button
          onClick={() => navigate("/")}
          className="px-4 py-3 bg-green-600 text-white font-semibold rounded shadow hover:bg-green-700 transition duration-300"
        >
          Go Back Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;
