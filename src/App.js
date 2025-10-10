import React, { useEffect } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";

// 🌐 Components
import Navbar from "./components/Navbar";
import RunningMessage from "./components/RunningMessage";
import Home from "./components/Home";
import Features from "./components/Features";
import Courses from "./components/Courses";
import FAQ from "./components/FAQ";
import Careers from "./components/Careers";
import Touch from "./components/Touch";
import Footer from "./components/Footer";

// 🔐 Pages
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import EnrollForm from "./pages/EnrollForm";
import AdminEnrollments from "./pages/AdminEnrollments";

// 🧭 Scroll-to-top when route changes
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// 🧩 Protected Route Wrapper (Stable)
const ProtectedRoute = ({ children, role }) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  // 🚫 No token or role → logout and redirect
  if (!token || !userRole) {
    localStorage.clear();
    return <Navigate to="/login" replace />;
  }

  // 🚫 Role mismatch → redirect to correct dashboard
  if (role && userRole !== role) {
    if (userRole === "admin") return <Navigate to="/admin-dashboard" replace />;
    if (userRole === "user") return <Navigate to="/dashboard" replace />;

    localStorage.clear();
    return <Navigate to="/login" replace />;
  }

  // ✅ Authorized access
  return children;
};

// 🧠 Main App Component
const App = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* 🌍 Public Landing Page */}
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <RunningMessage />
              <Home />
              <Features />
              <Courses />
              <FAQ />
              <Careers />
              <Touch />
              <Footer />
            </>
          }
        />

        {/* 🔑 Shared Login Page */}
        <Route path="/login" element={<Login />} />

        {/* 🧭 Admin Dashboard */}
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* 📋 Admin Enrollments */}
        <Route
          path="/admin/enrollments"
          element={
            <ProtectedRoute role="admin">
              <AdminEnrollments />
            </ProtectedRoute>
          }
        />

        {/* 👤 User Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute role="user">
              <UserDashboard />
            </ProtectedRoute>
          }
        />

        {/* 📝 Enrollment Form */}
        <Route
          path="/enroll"
          element={
            <ProtectedRoute role="user">
              <EnrollForm />
            </ProtectedRoute>
          }
        />

        {/* 🚫 404 Fallback */}
        <Route
          path="*"
          element={
            <div className="min-h-screen flex items-center justify-center text-gray-600 text-xl">
              404 — Page Not Found
            </div>
          }
        />
      </Routes>
    </>
  );
};

export default App;
