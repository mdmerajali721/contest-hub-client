import React from "react";
import { FaSearch, FaEdit, FaPaperPlane, FaAward } from "react-icons/fa";

const HowItWorks = () => {
  const steps = [
    {
      icon: <FaSearch />,
      title: "Find Contest",
      text: "Browse hundreds of contests daily.",
    },
    {
      icon: <FaEdit />,
      title: "Prepare Entry",
      text: "Create your best submission.",
    },
    {
      icon: <FaPaperPlane />,
      title: "Submit Entry",
      text: "Upload and join the competition.",
    },
    {
      icon: <FaAward />,
      title: "Win Rewards",
      text: "Receive prize & recognition.",
    },
  ];

  return (
    <section className="pb-8 pt-12">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="ttext-3xl md:text-4xl font-extrabold text-green-500 text-center">
          How It Works
        </h2>
        <p className="text-center text-gray-500 mt-4">
          Simple steps to participate in any contest
        </p>
        <div className="mt-6 h-1.5 w-40 mx-auto mb-10 bg-green-500 rounded-full" />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="bg-base-200 p-4 rounded-xl shadow hover:shadow-lg transition text-center"
            >
              <div className="text-green-500 text-4xl mb-4">{step.icon}</div>
              <h3 className="text-xl text-green-500 font-bold mb-2">
                {step.title}
              </h3>
              <p className="text-gray-500">{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;