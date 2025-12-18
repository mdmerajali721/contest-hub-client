import React from "react";
import { FaStar } from "react-icons/fa";

const ReviewCard = ({ review }) => {
  const { name, img, text, role } = review;

  return (
    <div className="rounded-2xl bg-base-200 p-6 shadow-lg hover:shadow-xl transition duration-300">
      {/* Header */}
      <div className="flex items-center gap-4">
        {/* Avatar */}
        <img
          src={img}
          alt={name}
          className="w-16 h-16 rounded-full object-cover ring-2 ring-green-500"
        />

        {/* Name & role */}
        <div>
          <h3 className="text-lg font-semibold">{name}</h3>
          <p className="text-sm text-green-600 font-medium">{role}</p>

          {/* Stars */}
          <div className="flex mt-1">
            {[...Array(5)].map((_, index) => (
              <FaStar key={index} className="w-3 h-3 text-yellow-400" />
            ))}
          </div>
        </div>
      </div>

      {/* Review Text */}
      <p className="mt-5 text-gray-500 leading-relaxed text-sm italic">
        “{text}”
      </p>
    </div>
  );
};

export default ReviewCard;