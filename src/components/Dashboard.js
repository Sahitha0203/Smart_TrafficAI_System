import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [status, setStatus] = useState(null);
  const [error, setError] = useState(null);
  const API_URL = "http://127.0.0.1:8000/status"; // Your FastAPI URL

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const json = await response.json();
        console.log("Full API Response:", json);

        const statusData = {
          congestion: json.congestion || "N/A",
          trend: json.trend || "N/A",
          avg_count: json.avg_count ?? "N/A",
          timestamp: json.timestamp || "N/A",
          window_history: json.window_history || [],
        };

        setStatus(statusData);
        setError(null);
      } catch (err) {
        const errorMessage =
          "Fetching error: " +
          err.message +
          ". Check if your FastAPI server is running.";
        setError(errorMessage);
        console.error(errorMessage);
      }
    };

    fetchStatus();
    const intervalId = setInterval(fetchStatus, 5000);
    return () => clearInterval(intervalId);
  }, []);

  const getCongestionColor = (level) => {
    switch (level) {
      case "HIGH":
        return "text-red-600 border-red-400";
      case "MODERATE":
        return "text-yellow-600 border-yellow-400";
      case "LOW":
        return "text-green-600 border-green-400";
      case "ERROR":
      case "ERROR_RUNTIME":
        return "text-red-700 border-red-500";
      default:
        return "text-gray-600 border-gray-300";
    }
  };

  const getBadgeStyle = (level) => {
    switch (level) {
      case "HIGH":
        return "bg-red-100 text-red-700 border border-red-400";
      case "MODERATE":
        return "bg-yellow-100 text-yellow-700 border border-yellow-400";
      case "LOW":
        return "bg-green-100 text-green-700 border border-green-400";
      default:
        return "bg-gray-100 text-gray-600 border border-gray-300";
    }
  };

  // --- Render states ---
  if (error) {
    return (
      <div className="pt-24 pb-12 text-center">
        <div className="max-w-lg mx-auto bg-red-50 border border-red-400 text-red-700 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-2">🚨 Connection Error</h2>
          <p className="mb-2">
            Could not fetch data from the backend. Please ensure the FastAPI
            server is running at{" "}
            <a
              href={API_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              {API_URL}
            </a>
            .
          </p>
          <p className="text-sm">{error}</p>
        </div>
      </div>
    );
  }

  if (!status)
    return (
      <div className="pt-24 text-center text-gray-600">Loading data...</div>
    );

  // --- Main UI ---
  return (
    <div className="pt-24 pb-12 px-6 bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto">
        {/* Title */}
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">
          Traffic Dashboard
        </h1>

        {/* Current Status Card */}
        <div
          className={`bg-white border-2 rounded-2xl shadow-sm p-8 mb-10 ${
            status.congestion === "LOW"
              ? "border-green-400"
              : status.congestion === "MODERATE"
              ? "border-yellow-400"
              : "border-red-400"
          }`}
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Current Traffic Status
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div>
              <p className="text-gray-600 text-sm mb-1">Congestion Level:</p>
              <p
                className={`text-2xl font-bold ${
                  status.congestion === "LOW"
                    ? "text-green-600"
                    : status.congestion === "MODERATE"
                    ? "text-yellow-600"
                    : "text-red-600"
                }`}
              >
                {status.congestion}
              </p>
            </div>

            <div>
              <p className="text-gray-600 text-sm mb-1">Traffic Trend:</p>
              <p
                className={`text-2xl font-bold ${
                  status.trend === "INCREASING"
                    ? "text-red-600"
                    : status.trend === "DECREASING"
                    ? "text-green-600"
                    : "text-blue-600"
                }`}
              >
                {status.trend}
              </p>
            </div>

            <div>
              <p className="text-gray-600 text-sm mb-1">
                Average Vehicle Count:
              </p>
              <p className="text-2xl font-bold text-gray-800">
                {status.avg_count}
              </p>
            </div>
          </div>

          <hr className="my-6" />

          <p className="text-sm text-gray-500">
            Last Updated (UTC): {status.timestamp}
          </p>
        </div>

        {/* History Section */}
        <div className="bg-white rounded-2xl shadow-sm border p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            History ({status.window_history.length} most recent intervals)
          </h2>

          <div className="flex flex-wrap gap-3">
            {status.window_history.length > 0 ? (
              status.window_history.map((level, index) => (
                <span
                  key={index}
                  className={`px-6 py-2 rounded-full font-semibold text-sm ${getBadgeStyle(
                    level
                  )}`}
                >
                  {level}
                </span>
              ))
            ) : (
              <p className="text-gray-500">No recent data available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
