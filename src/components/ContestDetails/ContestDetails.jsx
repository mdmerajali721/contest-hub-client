import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Trophy, AlertCircle } from "lucide-react";
import { FiUsers } from "react-icons/fi";
import { HiMiniTrophy } from "react-icons/hi2";
import { useParams } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "../Loader/Loader";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { FaCalendar } from "react-icons/fa";

const TextRenderer = ({ text }) => {
  if (!text) return null;

  return (
    <div className="space-y-2 leading-relaxed text-base-content/80">
      {text.split("\n").map((line, index) => {
        const trimmedLine = line.trim();
        if (!trimmedLine) return <br key={index} />;

        if (trimmedLine.startsWith("•") || trimmedLine.startsWith("-")) {
          return (
            <div key={index} className="flex items-start gap-2 ml-2">
              <span className="mt-2 w-1.5 h-1.5 bg-secondary rounded-full shrink-0"></span>
              <span>{trimmedLine.replace(/^[•-]\s*/, "")}</span>
            </div>
          );
        }
        return <p key={index}>{trimmedLine}</p>;
      })}
    </div>
  );
};

export default function ContestDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: contest = {}, isLoading } = useQuery({
    queryKey: ["contest-details", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/contests/${id}`);
      return res.data;
    },
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isEnded, setIsEnded] = useState(false);
  const [submissionLink, setSubmissionLink] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  useEffect(() => {
    if (!contest?.deadline) return;

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const deadlineDate = new Date(contest.deadline).getTime();
      const distance = deadlineDate - now;

      if (distance < 0) {
        clearInterval(timer);
        setIsEnded(true);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [contest]);

  const handleRegister = async () => {
    if (!user) {
      toast.error("Please login to register");
      return;
    }

    try {
      setIsRegistering(true);

      const paymentInfo = {
        contestId: contest._id,
        contestName: contest.name,
        contestPrice: contest.price,
        contestImage: contest.image,
        contestType: contest.type,
        contestCreatorName: contest.creatorName,
        contestDescription: contest.description,
        contestDeadline: contest.deadline,
        participant: {
          name: user.displayName,
          image: user.photoURL,
          email: user.email,
        },
      };

      const { data } = await axiosSecure.post(
        "/create-checkout-session",
        paymentInfo
      );

      window.location.href = data.url;
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      setIsRegistering(false);
    }
  };

  const { data: paymentStatus = {}, refetch } = useQuery({
    queryKey: ["payment-status", contest?._id],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/payments/payment-status?contestId=${contest._id}&contestParticipantEmail=${user?.email}`
      );
      return res.data;
    },
  });
  const handleSubmitTask = (e) => {
    e.preventDefault();

    const submittedInfo = {
      submitted: true,
      submissionLink: submissionLink,
      participantName: user?.displayName,
      participantImage: user?.photoURL,
      submittedAt: new Date(),
    };
    axiosSecure
      .patch(
        `/payments/${paymentStatus._id}?contestParticipantEmail=${user?.email}`,
        submittedInfo
      )
      .then((res) => {
        if (res.data.modifiedCount) {
          refetch();
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: "Task submitted successfully! Good luck.",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((e) => {
        toast.error(e.message);
      });

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsModalOpen(false);
    }, 1500);
  };

  if (isLoading) {
    return <Loader />;
  }

  const photoStyle =
    "absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent";

  return (
    <div className="min-h-screen mt-22 pb-20 px-4 xl:px-0 max-w-6xl mx-auto font-sans transition-colors duration-300 bg-base-100 text-base-content">
      <title>ContestHub - Contest Details</title>
      {/* image */}
      <div className="relative rounded overflow-hidden shadow-2xl mb-10 group">
        <img
          src={contest.image}
          alt="Banner"
          className="w-full h-96 sm:h-[500px] object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className={photoStyle}></div>

        <div className="container absolute bottom-0 z-10 w-full p-6 -translate-x-1/2 left-1/2 md:p-12">
          <div className="mx-auto max-w-7xl">
            <h1 className="mb-4 text-3xl font-extrabold text-white">
              {contest.name}
            </h1>

            <div className="flex justify-between flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-base-100/10 hover:text-yellow-300 text-white font-extrabold rounded-full">
                  <FiUsers />
                  {contest.participants || 0}
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-base-100/10 hover:text-yellow-300 text-white font-extrabold rounded-full">
                  ${contest.price}
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-base-100/10 hover:text-yellow-300 text-white font-extrabold rounded-full">
                  <FaCalendar />
                  {new Date(contest.deadline).toLocaleDateString()}
                </span>
              </div>
              <div className="flex gap-2">
                <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-base-100/10 hover:text-yellow-300 text-white font-extrabold rounded-full">
                  {contest.type}
                </span>
                {isEnded ? (
                  <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-base-100/10 hover:text-yellow-300 text-white font-extrabold rounded-full">
                    Contest Ended
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-base-100/10 hover:text-yellow-300 text-white font-extrabold rounded-full">
                    Active
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container relative z-20 mx-auto mt-8 max-w-7xl">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            {contest.winner ? (
              <div className="flex items-center gap-4 p-6 bg-base-200 shadow-sm rounded">
                <div className="relative">
                  <img
                    src={contest.winner.photo || "/avator.jpg"}
                    alt="Winner"
                    className="object-cover w-16 h-16 border-3 rounded-full shadow-md border-green-500"
                  />
                  <div className="absolute p-1 rounded-full text-accent-content bg-green-500 bottom-1 -right-1">
                    <Trophy size={12} className="text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-green-500">
                    Winner Declared!
                  </h3>
                  <p className="text-base-content/70">
                    Congratulations to{" "}
                    <span className="font-smibold text-green-500">
                      {contest.winner.name}
                    </span>{" "}
                    for winning this challenge.
                  </p>
                </div>
              </div>
            ) : null}

            <div className="p-8 border border-base-200 rounded bg-base-200 shadow overflow-hidden">
              <h2 className="text-3xl font-bold mb-5 flex text-green-500 items-center gap-3">
                <span className="w-2 h-10 bg-green-500 rounded-full"></span>
                Details
              </h2>

              <div className="p-6 bg-base-100/90 rounded-2xl shadow-sm">
                <TextRenderer text={contest.description} />
              </div>

              <div className="flex flex-wrap items-center gap-4 mt-8 text-sm">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-base-content">
                    Creator:
                  </span>
                  {contest.creatorName}
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-base-content">
                    Created:
                  </span>
                  {new Date(contest.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>

            {contest.instructions && (
              <div className="p-8 rounded bg-base-200 shadow overflow-hidden">
                <h2 className="text-3xl font-bold text-green-500 mb-5 flex items-center gap-3">
                  <span className="w-2 h-10 bg-green-500 rounded-full"></span>
                  Task Instruction
                </h2>

                <div className="p-6 bg-base-100/90 rounded-2xl shadow-sm">
                  <TextRenderer text={contest.instructions} />
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="space-y-6 lg:sticky lg:top-24">
              <div className="relative w-full max-w-md mx-auto overflow-hidden rounded bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 transition-all duration-500 group">
                {/* Glow / Shine overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/10 to-transparent blur-xl opacity-50 group-hover:opacity-80 transition-opacity duration-500 rounded-3xl"></div>

                {/* Trophy Icon */}
                <div className="relative z-10 flex flex-col gap-6 items-center justify-center mt-6">
                  <HiMiniTrophy
                    size={60}
                    className="text-yellow-400 drop-shadow-lg"
                  />
                  <span className="px-3 py-1 text-xl text-white font-extrabold  bg-yellow-500 shadow rounded-full">
                    Grand Prize
                  </span>
                </div>

                {/* Main Content */}
                <div className="relative z-10 text-center text-white px-6 py-8">
                  <h3 className="text-4xl md:text-6xl font-extrabold flex justify-center items-baseline gap-2 drop-shadow-lg">
                    ${contest.prizeMoney}
                  </h3>
                </div>

                {/* Animated overlay effect */}
                <div className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700 rounded-3xl"></div>
              </div>

              <div className="p-6 shadow bg-base-200 rounded">
                <h4 className="flex items-center gap-2 mb-6 text-sm font-bold text-green-500">
                  <Clock size={16} className="text-green-500" /> Time Remaining
                </h4>

                <div className="grid grid-cols-4 gap-2 mb-8 text-center">
                  {[
                    { label: "Days", value: timeLeft.days },
                    { label: "Hours", value: timeLeft.hours },
                    { label: "Mins", value: timeLeft.minutes },
                    { label: "Secs", value: timeLeft.seconds },
                  ].map((item, idx) => (
                    <div key={idx} className="flex flex-col items-center">
                      <div
                        className={`w-full py-3 rounded text-xl font-extrabold ${
                          isEnded
                            ? "bg-base-100 shadow"
                            : "bg-base-100  text-red-500"
                        }`}
                      >
                        {item.value.toString().padStart(2, "0")}
                      </div>
                      <span className="text-[10px] font-bold uppercase text-base-content/50 mt-2 tracking-wider">
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  {isEnded ? (
                    <button
                      disabled
                      className="flex items-center justify-center w-full gap-2 py-4 font-bold btn btn-disabled rounded-xl"
                    >
                      <AlertCircle size={20} /> Contest Ended
                    </button>
                  ) : paymentStatus.paymentStatus ? (
                    <button
                      disabled={paymentStatus.submitted}
                      onClick={() => setIsModalOpen(true)}
                      className="flex items-center justify-center w-full gap-2 py-2 text-lg font-bold shadow-lg bg-green-500 hover:bg-green-600 rounded disabled:bg-red-500 text-white disabled:cursor-not-allowed"
                    >
                      {" "}
                      {paymentStatus.submitted
                        ? "Already Submitted"
                        : "Submit Your Task"}
                    </button>
                  ) : (
                    <button
                      disabled={contest.winner || isRegistering}
                      onClick={handleRegister}
                      className="flex items-center justify-center w-full gap-2 py-3 text-lg font-bold rounded
                                 text-white bg-green-600 hover:bg-green-700 shadow shadow-green-600/30
                                 disabled:opacity-70 disabled:cursor-not-allowed transition-all"
                    >
                      {isRegistering ? (
                        <>
                          <span className="loading loading-spinner loading-sm"></span>
                          Processing...
                        </>
                      ) : (
                        <>Register Now • ${contest.price}</>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-xs"
              onClick={() => setIsModalOpen(false)}
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative z-10 w-full max-w-lg overflow-hidden shadow-2xl bg-base-100 rounded"
            >
              <div className="relative my-12 text-center">
                <h3 className="text-3xl text-green-500 font-extrabold">
                  Submit Your Contest
                </h3>
              </div>

              <div className="px-8 pb-8">
                <form onSubmit={handleSubmitTask}>
                  <div className="mb-6">
                    <textarea
                      required
                      value={submissionLink}
                      onChange={(e) => setSubmissionLink(e.target.value)}
                      placeholder="Submit your Google Drive / Figma / GitHub link..."
                      className="w-full h-32 resize-none textarea textarea-bordered textarea-lg text-base-content bg-base-200 rounded-md  text-sm focus:outline-none focus:ring-1 focus:ring-green-600"
                    ></textarea>
                  </div>

                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="flex-1 py-3 font-bold hover:bg-red-300 rounded border border-gray-200 cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded shadow transition-all flex justify-center items-center gap-2 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="loading loading-spinner loading-sm"></span>
                          Submitting...
                        </>
                      ) : (
                        <>Submit Now</>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}