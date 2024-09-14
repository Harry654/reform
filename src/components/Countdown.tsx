"use client";
import { addToBrevo } from "@/helpers/addToBrevo";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useState, useEffect } from "react";

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const launchDateISO = "2024-09-15T00:00:00";

  useEffect(() => {
    const launchDate = new Date(launchDateISO).getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = launchDate - now;

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });

      if (difference < 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const success = await addToBrevo(email);
    if (success) {
      toast.success("Successfully added to waitlist!");
    } else {
      toast.error("Failed to save email.");
    }
    setLoading(false);
    setEmail("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 flex flex-col justify-center items-center p-4">
      <ToastContainer /> {/* Toast container for notifications */}
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-2xl overflow-hidden">
        <div className="p-8 sm:p-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-center text-gray-800 mb-4">
            Reform is Coming Soon!
          </h1>
          <p className="text-xl text-center text-gray-600 mb-8">
            Get ready for an AI-powered survey platform that keeps your users
            interactively engaged throughout the survey process.
          </p>
          <div className="flex justify-center space-x-4 sm:space-x-8 mb-12">
            {Object.entries(timeLeft).map(([unit, value]) => (
              <div key={unit} className="flex flex-col items-center">
                <span className="text-4xl sm:text-5xl font-bold text-purple-600">
                  {value}
                </span>
                <span className="text-gray-500 capitalize">{unit}</span>
              </div>
            ))}
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4"
          >
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full sm:w-auto px-4 py-2 text-gray-700 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
              required
              disabled={loading} // Disable input when loading
            />
            <button
              type="submit"
              className={`w-full sm:w-auto px-6 py-2 text-white bg-purple-600 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-20 transition duration-300 ${
                loading ? "opacity-20 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? (
                <span>
                  <span
                    style={{
                      display: "inline-block",
                      width: "20px",
                      height: "20px",
                      marginRight: "8px",
                      border: "2px solid #ffffff",
                      borderTop: "2px solid transparent",
                      borderRadius: "50%",
                      animation: "spin 1s linear infinite",
                      verticalAlign: "middle",
                    }}
                  />
                  <style jsx>{`
                    @keyframes spin {
                      0% {
                        transform: rotate(0deg);
                      }
                      100% {
                        transform: rotate(360deg);
                      }
                    }
                  `}</style>
                  Processing...
                </span>
              ) : (
                "Notify Me"
              )}
            </button>
          </form>
        </div>

        <div className="bg-gray-100 p-8 sm:p-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Why Choose Reform?
          </h2>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-center">
              <svg
                className="w-5 h-5 mr-2 text-green-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              AI-powered engagement keeps users interested
            </li>
            <li className="flex items-center">
              <svg
                className="w-5 h-5 mr-2 text-green-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              Seamless and enjoyable user experience
            </li>
            <li className="flex items-center">
              <svg
                className="w-5 h-5 mr-2 text-green-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              Gather more valuable insights from your surveys
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
