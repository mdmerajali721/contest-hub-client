import React, { useEffect, useState } from "react";
import {
  CheckCircle,
  Trophy,
  Home,
  CreditCard,
  Copy,
  PartyPopper,
} from "lucide-react";
import { Link, useSearchParams } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const axiosSecure = useAxiosSecure();
  const [paymentInfo, setPaymentInfo] = useState({});
  const [loading, setLoading] = useState(true);

  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    if (sessionId) {
      axiosSecure.post("/payment-success", { sessionId }).then((res) => {
        setPaymentInfo(res.data);
        setLoading(false);
      });
    }
  }, [axiosSecure, sessionId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500 text-lg">Loading payment details...</p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen my-12 flex items-center justify-center  px-4 overflow-hidden">
      <title>ContestHub - Payment Success</title>
      <div className="relative w-full max-w-md">
        {/* Glass Card */}
        <div className="backdrop-blur-xl bg-base-300  shadow-md rounded-md p-8 md:p-10 text-center">
          <h1 className="text-3xl font-black text-green-600 tracking-tight mb-2">
            Payment Successful 🎉
          </h1>
          <p className="text-gray-500 font-medium mb-8">
            You have successfully registered for the contest. Good luck!
          </p>

          {/* Info Section */}
          <div className="space-y-3 mb-8 text-left">
            <InfoCard
              icon={<CreditCard className="w-4 h-4 text-gray-400" />}
              label="Transaction ID"
              value={paymentInfo?.transactionId || "--------"}
              mono
              copyable
            />
            <div className="grid grid-cols-2 gap-3">
              <InfoCard
                icon={<Trophy className="w-4 h-4 text-gray-400" />}
                label="Payment"
                value={`$${paymentInfo?.amount || "0"}`}
                highlight
              />
              <InfoCard
                icon={<PartyPopper className="w-4 h-4 text-gray-400" />}
                label="Status"
                value="Successful"
                isStatus
              />
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <Link
              to={`/contest/${paymentInfo?.contestId}`}
              className="flex items-center justify-center gap-2 w-full px-6 py-3 rounded bg-green-600 text-white font-bold hover:bg-green-700 transition-all"
            >
              Go to Contest
            </Link>

            <Link
              to="/"
              className="flex items-center justify-center gap-2 w-full px-6 py-3 rounded bg-base-200 text-gray-600 font-bold hover:text-green-600 transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

/* Card Component */
const InfoCard = ({
  icon,
  label,
  value,
  mono,
  highlight,
  copyable,
  isStatus,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (typeof value === "string") {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="group relative rounded p-4 transition-all shadow  border border-gray-100">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2 mb-1">
          {icon}
          <span className="text-[12px] font-bold uppercase tracking-widest text-gray-400">
            {label}
          </span>
        </div>

        <div className="flex items-center justify-between">
          {isStatus ? (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-bold text-emerald-600">
              {value}
            </span>
          ) : (
            <span
              className={`${
                mono ? "text-xs truncate max-w-[180px]" : "font-bold"
              } ${highlight ? "text-green-600" : "text-green-600"}`}
            >
              {value}
            </span>
          )}

          {copyable && (
            <button
              onClick={handleCopy}
              className="ml-2 p-1.5 rounded bg-base-200 hover:text-green-600 transition-colors"
              aria-label="Copy transaction ID"
            >
              {copied ? (
                <CheckCircle className="w-3.5 h-3.5" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
