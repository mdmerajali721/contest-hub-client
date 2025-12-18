import React from "react";
import { useNavigate } from "react-router";
import { FaUserFriends } from "react-icons/fa";

const ContestCard = ({ contest, isPopular = false }) => {
  const navigate = useNavigate();
  const {
    _id,
    name,
    image,
    description,
    participants = 0,
    type,
    deadline,
  } = contest;

  const handleDetails = () => {
    navigate(`/contest/${_id}`);
  };

  // Calculate days
  const deadlineDate = new Date(deadline);
  const today = new Date();
  const diffTime = deadlineDate - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  // Truncate text
  const truncate = (text, maxLength) =>
    text?.length > maxLength ? text.slice(0, maxLength - 3) + "..." : text;

  return (
    <article
      onClick={handleDetails}
      className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl bg-base-200 transition-all duration-300 cursor-pointer flex flex-col h-full"
    >
      {/* Image Section */}
      <div className="relative w-full h-56 md:h-64 overflow-hidden bg-gray-200 rounded-t-2xl">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Content Section */}
      <div className="flex flex-col p-5 flex-1 justify-between">
        <div className="mb-3">
          <h2 className="text-xl md:text-2xl font-bold mb-2 line-clamp-2 group-hover:text-green-600 transition-colors">
            {name}
          </h2>
          <p className="text-sm text-gray-500 line-clamp-3 leading-relaxed">
            {truncate(description, 100)}
          </p>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-2 mb-4">
          {isPopular && (
            <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-red-600 text-white text-xs font-bold rounded-full shadow-md animate-pulse">
              🔥 Popular
            </span>
          )}
          {deadline && (
            <span className="inline-flex items-center px-3 py-1.5 bg-yellow-400 text-black text-xs font-semibold rounded-full shadow-md">
              {diffDays > 0
                ? `${diffDays} days left`
                : diffDays === 0
                ? "Last day"
                : "Expired"}
            </span>
          )}
          <span className="inline-flex items-center px-3 py-1.5 bg-green-600 text-white text-xs font-bold rounded-full shadow-md">
            {type}
          </span>
        </div>

        {/* Participants */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-green-600">
            <FaUserFriends className="text-lg" />
            <span className="font-bold">{participants}</span>
            <span className="text-gray-400 text-sm">Participants</span>
          </div>
        </div>

        {/* View Details Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleDetails();
          }}
          className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2.5 rounded shadow-md transition-all duration-300"
        >
          View Details
        </button>
      </div>
    </article>
  );
};

export default ContestCard;