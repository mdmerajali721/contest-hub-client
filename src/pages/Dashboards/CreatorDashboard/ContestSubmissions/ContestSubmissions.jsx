import { useNavigate, useParams } from "react-router";
import {
  Trophy,
  Calendar,
  Clock,
  FileText,
} from "lucide-react";
import { IoChevronBackCircle } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const ContestSubmissions = () => {
  const navigate = useNavigate();
  const { contestId } = useParams();

  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  // Fetch Submitted Entries
  const { data: submittedContests = [] } = useQuery({
    queryKey: ["submissions-contests", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/payments/task-submitted?contestId=${contestId}`
      );
      return res.data;
    },
  });

  
  const { data: contestData = {}, refetch } = useQuery({
    queryKey: ["contest", contestId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/contests/${contestId}`);
      return res.data;
    },
  });


  // Declare Winner Handler
  const handleDeclareWinner = (submission) => {
    const winner = {
      photo: submission.participantImage,
      name: submission.participantName,
      email: submission.contestParticipantEmail,
      winningDate: new Date(),
    };

    Swal.fire({
      title: "Are you sure?",
      text: `Confirm ${submission.participantName} as the winner?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/contests/${submission.contestId}/creator`, winner)
          .then((res) => {
            if (res.data.modifiedCount) {
              refetch();
              axiosSecure.patch(
                `/users/win-count/${submission.contestParticipantEmail}`
              );
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Winner has been declared!",
                showConfirmButton: false,
                timer: 1500,
              });
            }
          })
          .catch((e) => {
            toast.error(e.message);
          });
      }
    });
  };

  return (
    <div className="min-h-screen mt-24 md:mt-8 mb-8 text-base-content selection:bg-primary selection:text-white">
      {/* Decorative Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-secondary/5 rounded-full blur-[80px] translate-y-1/3 -translate-x-1/4"></div>
      </div>
      <div className="relative max-w-6xl px-5 pt-8 mx-auto">
        {/* Header */}
        <div className="flex flex-col items-start justify-between gap-4 mb-10 md:flex-row md:items-center">
          <div>
            <button
              onClick={() => navigate(-1)}
              className="rounded text-green-600 flex btn items-center gap-2 font-bold cursor-pointer"
            >
              <IoChevronBackCircle size="28" />
              Back
            </button>
          </div>
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-2xl font-extrabold text-green-600">
                Submissions
              </h1>
              <p className="mt-1 text-sm text-base-content/60">
                Contest ID : {contestId}
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="px-8 py-6 text-center bg-base-300 rounded-md">
              <span className="text-xs font-bold text-gray-400">Entries</span>
              <p className="text-lg font-bold text-green-500">
                {submittedContests.length}
              </p>
            </div>

            <div
              className={`px-8 py-6 text-center bg-base-300 rounded-md ${
                contestData?.winner ? " " : " "
              }`}
            >
              <span className="text-xs font-bold text-gray-400">Status</span>
              <p
                className={`text-lg font-bold ${
                  contestData?.winner ? "text-green-600" : "text-green-500"
                }`}
              >
                {contestData?.winner ? "Closed" : "Active"}
              </p>
            </div>
          </div>
        </div>

        {/* No Submission */}
        {submittedContests.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 bg-base-200/30 rounded-xl">
            <FileText className="w-12 h-12" />
            <h3 className="mt-3 text-xl font-bold">No submissions yet</h3>
            <p className="max-w-xs mt-2 text-center">
              Wait for participants to submit their work. Check back later.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            <AnimatePresence>
              {submittedContests.map((sub, i) => {
                const isWinner =
                  contestData?.winner?.name === sub.participantName &&
                  contestData?.winner?.photo === sub.participantImage;

                const isLoser = contestData?.winner && !isWinner;

                return (
                  <motion.div
                    key={sub._id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: isLoser ? 0.5 : 1,
                      y: 0,
                      scale: isWinner ? 1.03 : 1,
                    }}
                    transition={{ duration: 0.3, delay: i * 0.1 }}
                    className={`relative group p-1 rounded ${
                      isWinner ? " " : " "
                    }`}
                  >
                    {/* Card */}
                    <div
                      className={`bg-base-200 rounded shadow p-5 flex flex-col gap-6 transition  ${
                        isWinner ? " " : "  "
                      }`}
                    >
                      <div className="grid items-center grid-cols-1 gap-3 md:grid-cols-3 md:gap-5">
                        {/* Profile */}
                        <div className="flex items-center gap-4">
                          <div className="relative">
                            <img
                              className={`w-16 h-16 rounded-full object-cover ${
                                isWinner
                                  ? "ring-3 ring-green-500 ring-offset-2"
                                  : ""
                              }`}
                              src={sub.participantImage}
                            />
                            {isWinner && (
                              <div className="absolute -top-2 -right-2 bg-green-500 text-white p-1.5 rounded-full">
                                <Trophy size={14} />
                              </div>
                            )}
                          </div>
                          <div>
                            <h3 className="text-lg font-bold uppercase text-green-600">
                              {sub.participantName}
                            </h3>
                            <p className="flex items-center gap-2 text-sm truncate text-gray-400 max-w-40">
                              {sub.contestParticipantEmail}
                            </p>
                          </div>
                        </div>

                        {/* Project Link + Date */}
                        <a
                          href={sub.submissionLink}
                          target="_blank"
                          className="block"
                        >
                          <div className="p-4 transition  rounded border border-dashed border-green-500 ">
                            <p className="mb-1 text-xs font-bold text-gray-400">
                              Submitt Link
                            </p>
                            <p className="font-semibold text-green-500">
                              {sub.submissionLink}
                            </p>

                            <div className="flex items-center gap-3 mt-3 text-xs text-gray-400">
                              <span className="flex items-center gap-1">
                                <Calendar size={12} />
                                {new Date(sub.submittedAt).toLocaleDateString(
                                  "en-US",
                                  {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                  }
                                )}
                              </span>

                              <span className="flex items-center gap-1">
                                <Clock size={12} />
                                {new Date(sub.submittedAt).toLocaleTimeString(
                                  "en-US",
                                  { hour: "2-digit", minute: "2-digit" }
                                )}
                              </span>
                            </div>
                          </div>
                        </a>

                        {/* Action */}
                        <div className="flex justify-start md:justify-end">
                          {isWinner ? (
                            <div className="text-center">
                              <p className="flex items-center gap-2  font-bold text-green-500">
                                Winner Confirmed
                              </p>
                            </div>
                          ) : contestData?.winner ? (
                            <div className="flex items-center gap-2  font-bold text-green-500">
                              Passed
                            </div>
                          ) : (
                            <button
                              onClick={() => handleDeclareWinner(sub)}
                              className="flex items-center gap-2  font-bold text-green-500"
                            >
                              Declare Winner
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContestSubmissions;
