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

const UserOverview = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  /*  Participated Contests */
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

  /* Stats */
  const participated = participantContests.length;
  const won = winningContests.length;
  const winPercentage =
    participated > 0 ? Math.round((won / participated) * 100) : 0;

  /*  Animated Stats  */
  const animatedParticipated = useCountUp(participated);
  const animatedWon = useCountUp(won);
  const animatedWinPercent = useCountUp(winPercentage);

  const winColor =
    winPercentage >= 70
      ? "text-green-600"
      : winPercentage >= 40
      ? "text-yellow-500"
      : "text-red-500";

  /* Render Loader if fetching  */
  const isLoading = loadingParticipated || loadingWins;
  if (isLoading) return <Loader />;

  return (
    <div className="px-6 mt-28 md:mt-8 mb-6 max-w-6xl mx-auto space-y-8">
      <title>ContestHub - User Dashboard</title>
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row items-center gap-6">
        <img
          src={user?.photoURL || "/avatar.png"}
          alt="Profile"
          className="w-32 h-32 rounded-full border-4 border-green-500 shadow-lg object-cover"
        />

        <div className="text-center md:text-left">
          <h2 className="text-3xl uppercase md:text-4xl font-bold">
            {user?.displayName}
          </h2>
          <p className="text-gray-400">{user?.email}</p>

          <p className="mt-3 font-bold">
            Win Rate:{" "}
            <span className={`font-extrabold ${winColor}`}>
              {animatedWinPercent}%
            </span>
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Participated */}
        <div className="bg-blue-50 rounded-2xl p-6 shadow-md hover:shadow-xl transition">
          <div className="flex items-center gap-2 text-blue-600 font-semibold">
            <CiCalendar size={20} /> Participated
          </div>
          <p className="text-3xl font-black mt-2">{animatedParticipated}</p>
        </div>

        {/* Wins */}
        <div className="bg-purple-50 rounded-2xl p-6 shadow-md hover:shadow-xl transition">
          <div className="flex items-center gap-2 text-purple-600 font-semibold">
            <FaTrophy size={18} /> Wins
          </div>
          <p className="text-3xl font-black mt-2">{animatedWon}</p>
        </div>

        {/* Win % */}
        <div className="bg-green-50 rounded-2xl p-6 shadow-md hover:shadow-xl transition">
          <div className="flex items-center gap-2 text-green-600 font-semibold">
            <MdOutlineCheckCircleOutline size={20} /> Win %
          </div>
          <p className={`text-3xl font-black mt-2 ${winColor}`}>
            {animatedWinPercent}%
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserOverview;
