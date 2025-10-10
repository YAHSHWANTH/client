import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("token");
      const role = localStorage.getItem("role");

      // 🚫 If not admin, redirect to home
      if (role !== "admin") {
        window.location.href = "/";
        return;
      }

      try {
        const res = await axios.get("http://localhost:5000/admin/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("✅ Users from backend:", res.data.length);
        setUsers(res.data);
      } catch (err) {
        console.error("❌ Error fetching users:", err.response?.data || err.message);
        if (err.response?.status === 403 || err.response?.status === 401) {
          alert("Session expired or unauthorized. Please login again.");
          localStorage.clear();
          window.location.href = "/";
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDownload = () => {
    const token = localStorage.getItem("token");
    window.open(`http://localhost:5000/admin/export-csv`, "_blank");
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-500">
        Loading users...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
            Admin Dashboard
          </h2>

          <div className="flex gap-3">
            <button
              onClick={handleDownload}
              className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-2 rounded-xl font-semibold shadow hover:scale-105 transition"
            >
              Download CSV
            </button>

            <button
              onClick={handleLogout}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded-xl font-semibold shadow hover:bg-gray-400 transition"
            >
              Logout
            </button>
          </div>
        </div>

        {users.length === 0 ? (
          <p className="text-gray-500 text-center">No users found</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {users.map((user, i) => (
              <div
                key={i}
                className="border border-gray-100 rounded-xl p-5 shadow hover:shadow-lg hover:-translate-y-1 transition bg-white"
              >
                <h3 className="text-lg font-semibold text-gray-800">
                  {user.firstName} {user.lastName}
                </h3>
                <p className="text-gray-600 text-sm mt-1">{user.email}</p>
                <p className="text-gray-500 text-sm">{user.phone}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
