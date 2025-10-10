import React from "react";
import { useNavigate } from "react-router-dom";

const UserHome = () => {
  const navigate = useNavigate();
  const userEmail = localStorage.getItem("email") || "User";
  const firstLetter = userEmail.charAt(0).toUpperCase();

  // ✅ Logout: clear everything and return to main page
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("email");
    navigate("/"); // back to main page
  };

  const handleEnroll = () => {
    window.open("https://forms.gle/VJzEwZ5iy2D6LZcp9", "_blank");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <div className="bg-white rounded-2xl shadow-xl p-10 text-center w-full max-w-md">
        {/* Profile Circle */}
        <div className="w-24 h-24 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center text-white text-4xl font-bold mx-auto mb-6">
          {firstLetter}
        </div>

        <h1 className="text-2xl font-semibold text-gray-800 mb-2">
          Welcome, {userEmail.split("@")[0]} 👋
        </h1>
        <p className="text-gray-500 mb-8">Glad to have you back!</p>

        {/* Buttons */}
        <div className="flex flex-col gap-4">
          <button
            onClick={handleEnroll}
            className="bg-gradient-to-r from-pink-500 to-purple-500 text-white py-2 rounded-xl font-semibold shadow hover:scale-105 transition"
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

export default UserHome;
