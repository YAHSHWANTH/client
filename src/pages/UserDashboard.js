import React from "react";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const navigate = useNavigate();
  const userEmail = localStorage.getItem("email") || "User";
  const firstLetter = userEmail.charAt(0).toUpperCase();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("email");
    navigate("/login");
  };

  const handleEnroll = () => {
    // ✅ Navigate to in-app enrollment page
    navigate("/enroll");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md text-center">
        {/* Profile Circle */}
        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white flex items-center justify-center text-4xl font-bold">
          {firstLetter}
        </div>

        <h1 className="text-2xl font-semibold text-gray-800">
          Welcome, {userEmail.split("@")[0]} 👋
        </h1>
        <p className="text-gray-500 mt-2 mb-8">
          Explore and enroll in exciting opportunities.
        </p>

        <div className="flex flex-col gap-4">
          <button
            onClick={handleEnroll}
            className="bg-gradient-to-r from-pink-500 to-purple-500 text-white py-2 rounded-xl font-semibold hover:scale-105 transition"
          >
            Enroll Now
          </button>

          <button
            onClick={handleLogout}
            className="border border-gray-300 text-gray-600 py-2 rounded-xl font-semibold hover:bg-gray-100 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
