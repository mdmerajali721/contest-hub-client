import React from "react";
import { motion } from "framer-motion";
import {
  XCircle,
  RefreshCcw,
  
} from "lucide-react";
import { Link, useNavigate } from "react-router";

const PaymentCancel = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex items-center mt-18 justify-center min-h-screen p-4 overflow-hidden font-sans">
      <title>ContestHub - Payment Cancel</title>
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="relative z-10 w-full max-w-md overflow-hidden border shadow bg-base-100 border-base-200 rounded-md"
      >
        <div className="p-8 text-center">
          {/* Cancel Icon */}
          <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 rounded-full bg-base-200">
            <XCircle size={40} className="text-red-500" />
          </div>

          <h2 className="mb-2 text-3xl font-bold text-red-600">
            Payment Cancelled
          </h2>
          <p className="px-2 mb-8 text-base-content/60">
            Your payment didn’t complete successfully. Please try again or
            choose a different payment method.
          </p>

          {/* Actions */}
          <div className="space-y-3">
            <button
              onClick={() => navigate(-1)}
              className="w-full py-3 rounded font-bold shadow-lg text-white flex items-center gap-2 justify-center bg-green-600 hover:bg-green-700"
            >
              <RefreshCcw size={18} /> Try Again
            </button>

            <Link
              to="/"
              className="w-full py-3 rounded font-bold shadow flex items-center gap-2 justify-center bg-base-300 hover:text-green-500"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentCancel;
