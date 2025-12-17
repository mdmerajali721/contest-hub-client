import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import "animate.css";

const faqs = [
  {
    q: "What is ContestHub?",
    a: "ContestHub is a modern platform where users can participate in contests and creators can host competitions in various categories such as design, writing, ideas, gaming, and more.",
  },
  {
    q: "Is ContestHub free to use?",
    a: "Yes! Participating in contests is completely free. Some creators may offer paid contests, but general access is free.",
  },
  {
    q: "How do I create a contest?",
    a: "After logging in, go to the Dashboard → Creator Panel → Create Contest to set up your contest details, rewards, deadlines, and judging criteria.",
  },
  {
    q: "How are winners selected?",
    a: "Creators or admin judges evaluate each submission based on the contest rules, and the platform ensures transparent result management.",
  },
  {
    q: "Can I participate in multiple contests?",
    a: "Yes! You can join as many contests as you want and track them in your dashboard.",
  },
  {
    q: "How do I update my profile?",
    a: "Go to Dashboard → My Profile to update your name, photo, or additional details.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (i) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <div className="mt-6 pb-16 bg-base-100">
      <div className="max-w-7xl mx-auto px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-green-500 animate__animated animate__fadeInDown">
            Frequently Asked Questions
          </h1>
          <p className="mt-3 text-gray-500 animate__animated animate__fadeInUp">
            Find answers to the most common questions about ContestHub.
          </p>
          <div className="mt-6 h-1.5 w-40 mx-auto mb-10 bg-green-500 rounded-full" />
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqs.map((item, i) => (
            <div
              key={i}
              className="bg-base-200 rounded shadow p-5 cursor-pointer transition"
              onClick={() => toggleFAQ(i)}
            >
              {/* Question */}
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-lg text-green-500">
                  {item.q}
                </h3>

                <FaChevronDown
                  className={`transition-transform duration-300 ${
                    openIndex === i
                      ? "rotate-180 text-green-600"
                      : "text-gray-500"
                  }`}
                />
              </div>

              {/* Answer */}
              {openIndex === i && (
                <p className="mt-3 text-gray-500 animate__animated animate__fadeIn">
                  {item.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;