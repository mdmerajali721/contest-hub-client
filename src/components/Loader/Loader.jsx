import React from "react";

export const Loader = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-base-100">
      <span className="loading bg-green-500 loading-spinner loading-xl"></span>
    </div>
  );
};
