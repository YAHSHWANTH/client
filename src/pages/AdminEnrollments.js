import React, { useEffect, useState } from "react";

const AdminEnrollments = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch all enrollments
  const fetchEnrollments = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/enroll");
      const data = await res.json();
      setEnrollments(data);
    } catch (err) {
      console.error("Error fetching enrollments:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnrollments();
  }, []);

  // Delete enrollment
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this enrollment?")) return;
    try {
      await fetch(`http://localhost:5000/api/enroll/${id}`, { method: "DELETE" });
      alert("Enrollment deleted successfully!");
      fetchEnrollments();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  // Download CSV
  const handleDownloadCSV = () => {
    window.open("http://localhost:5000/api/enroll/export", "_blank");
  };

  // Filter search
  const filtered = enrollments.filter(
    (e) =>
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.email.toLowerCase().includes(search.toLowerCase()) ||
      e.course.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-50 to-purple-50 p-8">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-2xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
            📋 Enrollments Dashboard
          </h1>
          <button
            onClick={handleDownloadCSV}
            className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-5 py-2 rounded-xl font-semibold shadow hover:scale-105 transition"
          >
            ⬇️ Download CSV
          </button>
        </div>

        {/* Search */}
        <input
          type="text"
          placeholder="Search by name, email, or course..."
          className="border p-3 w-full rounded-lg mb-6 focus:ring-2 focus:ring-pink-400 outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Table */}
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : filtered.length === 0 ? (
          <p className="text-center text-gray-500">No enrollments found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gradient-to-r from-pink-500 to-purple-500 text-white">
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Email</th>
                  <th className="p-3 text-left">Phone</th>
                  <th className="p-3 text-left">Course</th>
                  <th className="p-3 text-left">Duration</th>
                  <th className="p-3 text-left">Guidance</th>
                  <th className="p-3 text-left">College</th>
                  <th className="p-3 text-left">Location</th>
                  <th className="p-3 text-left">Date</th>
                  <th className="p-3 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((e) => (
                  <tr key={e._id} className="border-b hover:bg-pink-50 transition">
                    <td className="p-3">{e.name}</td>
                    <td className="p-3">{e.email}</td>
                    <td className="p-3">{e.phone}</td>
                    <td className="p-3">{e.course}</td>
                    <td className="p-3">{e.duration}</td>
                    <td className="p-3">{e.guidance}</td>
                    <td className="p-3">{e.college}</td>
                    <td className="p-3">{e.location}</td>
                    <td className="p-3">
                      {new Date(e.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-3">
                      <button
                        onClick={() => handleDelete(e._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-red-600 transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminEnrollments;
