import React from "react";
import { GiPodiumWinner } from "react-icons/gi";

// Sample winner data
const winners = [
  {
    name: "Sabbir Chowdhury",
    contest: "Creative Logo Design",
    prize: 1000,
    photo: "https://i.pravatar.cc/300?img=7",
  },
  {
    name: "Rafid Khan",
    contest: "Business Idea Pitch",
    prize: 2000,
    photo: "https://i.pravatar.cc/300?img=4",
  },
  {
    name: "Mehedi Hasan",
    contest: "Article Writing – Climate Change",
    prize: 800,
    photo: "https://i.pravatar.cc/300?img=6",
  },
];

const Winners = () => {
  const totalWinners = winners.length;
  const totalPrize = winners.reduce((acc, w) => acc + w.prize, 0);

  return (
    <section className="text-green-500 my-8 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl flex items-center gap-2 justify-center font-extrabold mb-4">
          Recent Winners <GiPodiumWinner />
        </h2>
        <p className="text-gray-400">
          Congratulations to our amazing winners! Total Winners:{" "}
          <span className="font-semibold">{totalWinners}</span> | Total Prize:{" "}
          <span className="font-semibold">${totalPrize}</span>
        </p>
        <div className="mt-6 h-1.5 w-40 mx-auto mb-10 bg-green-500 rounded-full" />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {winners.map((winner, index) => (
            <div
              key={index}
              className="bg-base-200 rounded-xl shadow-lg p-6 flex flex-col items-center text-center hover:shadow-2xl transition-shadow duration-300"
            >
              <img
                src={winner.photo}
                alt={winner.name}
                className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-emerald-500"
              />
              <h3 className="text-xl font-bold">{winner.name}</h3>
              <p className="text-gray-600 mt-1">{winner.contest}</p>
              <span className="mt-2 px-4 py-1 rounded-full bg-green-500 text-white font-semibold">
                ${winner.prize}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Winners;