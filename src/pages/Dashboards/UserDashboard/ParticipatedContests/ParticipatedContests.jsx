import React from "react";
import { FaTrophy } from "react-icons/fa";
import { CiCalendar } from "react-icons/ci";
import { MdOutlineCheckCircleOutline } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import { Loader } from "../../../../components/Loader/Loader";

/* Safe CountUp Hook */
const useCountUp = (target = 0, speed = 800) => {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    let current = 0;
    const step = Math.max(1, Math.ceil(target / (speed / 16)));

    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(current);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [target, speed]);

  return count;
};

export const ParticipatedContests = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  /* Fetch Contests */
  const { data: participantContests = [], isLoading: loadingParticipated } =
    useQuery({
      queryKey: ["my-participant-contests", user?.email],
      queryFn: async () => {
        const res = await axiosSecure.get(
          `/payments/all-contests?contestParticipantEmail=${user?.email}`
        );
        return res.data;
      },
      enabled: !!user?.email,
    });

  /* Winning Contests */
  const { data: winningContests = [], isLoading: loadingWins } = useQuery({
    queryKey: ["winner-contests", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/contests/winner/contests?email=${user?.email}`
      );
      return res.data;
    },
    enabled: !!user?.email,
  });

  /*Stats Calculation= */
  const totalParticipated = participantContests.length;
  const totalWon = winningContests.length;

  // Active contests = participated but not won
  const totalActive = participantContests.filter(
    (c) => !winningContests.find((w) => w._id === c._id)
  ).length;

  const winPercentage =
    totalParticipated > 0
      ? Math.round((totalWon / totalParticipated) * 100)
      : 0;

  /* Animated Stats */
  const animatedParticipated = useCountUp(totalParticipated);
  const animatedWon = useCountUp(totalWon);
  const animatedWinPercent = useCountUp(winPercentage);

  const winColor =
    winPercentage >= 70
      ? "text-green-600"
      : winPercentage >= 40
      ? "text-yellow-500"
      : "text-red-500";

  /* Loader if fetching */
  if (loadingParticipated || loadingWins) return <Loader />;

  return (
    <div className="space-y-8 mt-28 md:mt-12 px-6 mb-6 max-w-6xl mx-auto">
      <title>ContestHub - User Participated Contests</title>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-blue-50 rounded-2xl p-6 shadow-md hover:shadow-xl transition">
          <div className="flex items-center gap-2 text-blue-600 font-semibold">
            <CiCalendar size={20} /> Participated
          </div>
          <p className="text-3xl font-black mt-2">{animatedParticipated}</p>
        </div>

        <div className="bg-green-50 rounded-2xl p-6 shadow-md hover:shadow-xl transition">
          <div className="flex items-center gap-2 text-green-600 font-semibold">
            <MdOutlineCheckCircleOutline size={20} /> Active
          </div>
          <p className="text-3xl font-black mt-2">{totalActive}</p>
        </div>

        <div className="bg-purple-50 rounded-2xl p-6 shadow-md hover:shadow-xl transition">
          <div className="flex items-center gap-2 text-purple-600 font-semibold">
            <FaTrophy size={18} /> Wins
          </div>
          <p className="text-3xl font-black mt-2">{animatedWon}</p>
        </div>

        <div className="bg-yellow-50 rounded-2xl p-6 shadow-md hover:shadow-xl transition">
          <div className="flex items-center gap-2 text-yellow-600 font-semibold">
            <MdOutlineCheckCircleOutline size={20} /> Win %
          </div>
          <p className={`text-3xl font-black mt-2 ${winColor}`}>
            {animatedWinPercent}%
          </p>
        </div>
      </div>

      {/*  Participation Table */}
      <div className="bg-base-200 rounded shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-dashed border-green-400">
          <h3 className="text-lg text-green-500 font-bold">
            Participation History
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left">
            <thead className="bg-base-300 text-xs font-semibold">
              <tr>
                <th className="px-6 py-3 rounded">Contest Name</th>
                <th className="px-6 py-3">Deadline</th>
                <th className="px-6 py-3">Fee Paid</th>
                <th className="px-6 py-3">Payment Status</th>
                <th className="px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {participantContests.map((contest) => {
                const isWon = winningContests.some(
                  (w) => w._id === contest._id
                );
                return (
                  <tr key={contest._id}>
                    <td className="px-6 py-4 text-sm font-bold">
                      {contest.contestName}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {new Date(contest.contestDeadline).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">${contest.amount}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
                          contest.paymentStatus === "Paid"
                            ? "text-white bg-red-600"
                            : "text-white bg-green-600"
                        }`}
                      >
                        {contest.paymentStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
                          isWon
                            ? "bg-yellow-400 text-black"
                            : "bg-blue-400 text-white"
                        }`}
                      >
                        {isWon ? "Won" : "Active"}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
