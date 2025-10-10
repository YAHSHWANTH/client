import React, { useState } from "react";

const EnrollForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    email: "",
    phone: "",
    college: "",
    location: "",
    course: "",
    duration: "",
    guidance: "",
    agree: false,
  });

  const [showTerms, setShowTerms] = useState(false);

  const courses = [
    "Python Programming",
    "Java Programming",
    "Frontend Development (React)",
    "Backend Development (Node.js)",
    "Full Stack Development (Java)",
    "Full Stack Development (Python)",
    "Mobile App Development",
    "UI/UX Design",
    "Data Science & Machine Learning",
    "Cybersecurity Fundamentals",
    "Cloud Computing (AWS/Azure)",
    "DevOps Engineering",
    "Database Management (MongoDB, SQL)",
    "AI & Deep Learning",
    "Blockchain Fundamentals",
    "Game Development (Unity)",
    "Embedded Systems",
    "Digital Marketing",
    "Web3 & Smart Contracts",
    "Software Testing (Manual & Automation)",
  ];

  const durations = ["1 Month", "2 Months", "3 Months", "6 Months"];
  const guidanceOptions = ["With Mentor Guidance", "Without Mentor Guidance"];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.agree) {
      alert("⚠️ Please agree to the Terms & Conditions before submitting.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/enroll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          acceptedTerms: formData.agree,
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert("✅ Enrollment submitted successfully! You’ll receive a confirmation email soon.");
        setFormData({
          name: "",
          dob: "",
          email: "",
          phone: "",
          college: "",
          location: "",
          course: "",
          duration: "",
          guidance: "",
          agree: false,
        });
      } else {
        alert("❌ " + data.message);
      }
    } catch (error) {
      console.error("Enrollment Error:", error);
      alert("❌ Failed to submit enrollment. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-pink-100 to-purple-100 p-6">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-3xl relative">
        <h2 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
          Course Enrollment Form
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Full Name */}
          <div className="flex flex-col">
            <label className="font-semibold mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              required
              className="p-3 border rounded-lg focus:ring-2 focus:ring-pink-400 outline-none"
            />
          </div>

          {/* DOB */}
          <div className="flex flex-col">
            <label className="font-semibold mb-1">Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              required
              className="p-3 border rounded-lg focus:ring-2 focus:ring-pink-400 outline-none"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label className="font-semibold mb-1">Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
              className="p-3 border rounded-lg focus:ring-2 focus:ring-pink-400 outline-none"
            />
          </div>

          {/* Phone */}
          <div className="flex flex-col">
            <label className="font-semibold mb-1">Phone Number</label>
            <input
              type="tel"
              name="phone"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={handleChange}
              required
              className="p-3 border rounded-lg focus:ring-2 focus:ring-pink-400 outline-none"
            />
          </div>

          {/* College Name */}
          <div className="flex flex-col">
            <label className="font-semibold mb-1">College Name</label>
            <input
              type="text"
              name="college"
              placeholder="Enter your college name"
              value={formData.college}
              onChange={handleChange}
              required
              className="p-3 border rounded-lg focus:ring-2 focus:ring-pink-400 outline-none"
            />
          </div>

          {/* Location */}
          <div className="flex flex-col">
            <label className="font-semibold mb-1">Location</label>
            <input
              type="text"
              name="location"
              placeholder="Enter your city or location"
              value={formData.location}
              onChange={handleChange}
              required
              className="p-3 border rounded-lg focus:ring-2 focus:ring-pink-400 outline-none"
            />
          </div>

          {/* Course */}
          <div className="flex flex-col md:col-span-2">
            <label className="font-semibold mb-1">Select Course</label>
            <select
              name="course"
              value={formData.course}
              onChange={handleChange}
              required
              className="p-3 border rounded-lg focus:ring-2 focus:ring-pink-400 outline-none"
            >
              <option value="">Choose a course</option>
              {courses.map((course, i) => (
                <option key={i} value={course}>
                  {course}
                </option>
              ))}
            </select>
          </div>

          {/* Duration */}
          <div className="flex flex-col md:col-span-2">
            <label className="font-semibold mb-1">Preferred Duration</label>
            <select
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              required
              className="p-3 border rounded-lg focus:ring-2 focus:ring-pink-400 outline-none"
            >
              <option value="">Choose duration</option>
              {durations.map((dur, i) => (
                <option key={i} value={dur}>
                  {dur}
                </option>
              ))}
            </select>
          </div>

          {/* Mentor Guidance */}
          <div className="flex flex-col md:col-span-2">
            <label className="font-semibold mb-1">Mentor Guidance</label>
            <select
              name="guidance"
              value={formData.guidance}
              onChange={handleChange}
              required
              className="p-3 border rounded-lg focus:ring-2 focus:ring-pink-400 outline-none"
            >
              <option value="">Choose an option</option>
              {guidanceOptions.map((opt, i) => (
                <option key={i} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          {/* Terms & Conditions */}
          <div className="md:col-span-2 flex items-start gap-3 mt-2">
            <input
              type="checkbox"
              name="agree"
              checked={formData.agree}
              onChange={handleChange}
              className="mt-1 w-5 h-5 text-pink-500 focus:ring-pink-400 border-gray-300 rounded"
            />
            <label className="text-sm text-gray-700">
              I agree to the{" "}
              <button
                type="button"
                onClick={() => setShowTerms(true)}
                className="text-pink-600 font-semibold hover:underline"
              >
                Terms & Conditions
              </button>{" "}
              and confirm that the details provided above are accurate.
            </label>
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2 mt-4">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 rounded-lg font-semibold text-lg hover:scale-105 transition"
            >
              Submit Enrollment
            </button>
          </div>
        </form>

        {/* 📄 Terms & Conditions Modal */}
        {showTerms && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-6 relative">
              <h3 className="text-2xl font-bold text-pink-600 mb-4">Terms & Conditions</h3>
              <div className="text-gray-700 text-sm space-y-3 max-h-80 overflow-y-auto">
                <p>1. All information provided by the student must be accurate and truthful.</p>
                <p>2. Enrollment does not guarantee placement, but dedicated mentorship and guidance will be provided.</p>
                <p>3. Students are expected to maintain professional behavior during sessions.</p>
                <p>4. Course materials provided are for personal educational use only and cannot be shared publicly.</p>
                <p>5. The organization reserves the right to modify schedules, mentors, or course content if necessary.</p>
                <p>6. Completion certificates will be issued based on performance and attendance.</p>
                <p>7. By enrolling, you consent to receive communications via email or phone about your course updates.</p>
              </div>
              <button
                onClick={() => setShowTerms(false)}
                className="mt-5 w-full bg-pink-500 text-white py-2 rounded-lg font-semibold hover:bg-pink-600 transition"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EnrollForm;
