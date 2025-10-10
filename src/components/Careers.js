// src/components/Careers.js
import React, { useState } from "react";

const Careers = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const [showLogin, setShowLogin] = useState(false);

  const sendOtp = async () => {
    if (!email) return alert("Please enter an email first");

    try {
      const res = await fetch("http://localhost:5000/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setOtpSent(true);
        alert(data.message || "OTP sent successfully!");
      } else {
        alert(data.message || "Failed to send OTP.");
        setOtpSent(false);
      }
    } catch (err) {
      console.error("send-otp error:", err);
      alert("Failed to send OTP. Check backend console.");
      setOtpSent(false);
    }
  };

  const verifyOtp = async () => {
    if (!otp) return alert("Please enter OTP");

    try {
      const res = await fetch("http://localhost:5000/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setIsVerified(true);
        alert(data.message || "Email verified successfully!");
      } else {
        alert(data.message || "Invalid OTP.");
      }
    } catch (err) {
      console.error("verify-otp error:", err);
      alert("Error verifying OTP.");
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!isVerified) return alert("Please verify your email before signing up.");
    if (!firstName || !lastName || !email || !password) return alert("Fill all required fields.");

    try {
      const res = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, phone, email, password }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        alert(data.message || "Successfully signed up!");
        setShowLogin(true);
      } else {
        alert(data.message || "Signup failed.");
      }
    } catch (err) {
      console.error("signup error:", err);
      alert("Error signing up. Check backend logs.");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) return alert("Enter email and password");

    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        alert(data.message || "Login successful!");
        window.location.href = "/dashboard";
      } else {
        alert(data.message || "Invalid credentials");
      }
    } catch (err) {
      console.error("login error:", err);
      alert("Error logging in. Check backend logs.");
    }
  };

  return (
    <div className="bg-white">
      {/* Careers Top Section */}
      <section id="careers-top" className="bg-white min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-24 items-center w-full">
          <div>
            <h2 className="text-5xl font-bold text-gray-900 mb-8">Join With Us, Shape Your Future</h2>
            <p className="text-lg text-gray-600 mb-6">
              At Code Nexus, we are passionate about transforming ideas into reality. We foster a culture of innovation, collaboration, and continuous learning, empowering our team to take on challenging projects and create meaningful impact. Whether you are a developer, designer, or strategist, every contribution here drives progress and shapes the future of technology.
            </p>
            <button
              onClick={() => {
                const element = document.getElementById("signup-form");
                if (element) element.scrollIntoView({ behavior: "smooth" });
              }}
              className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-10 py-4 rounded-lg shadow-md hover:opacity-90 transition text-lg"
            >
              Start your journey with Code Nexus
            </button>
          </div>
          <div>
            <img src="/stlogo.png" alt="Careers"  />
          </div>
        </div>
      </section>

      {/* Signup / Login Section */}
      <section id="signup-form" className="bg-gray-50 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-32 items-center w-full">
          <div>
            <img src="/logos.png" alt="Sign Up" />
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 w-full max-w-md mx-auto">
            {!showLogin ? (
              <>
                <h3 className="text-2xl font-bold text-center text-purple-600 mb-6">Create your account</h3>
                <form className="space-y-5" onSubmit={handleSignup}>
                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500" />
                    <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500" />
                  </div>
                  <input type="text" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500" />
                  <div className="flex gap-2">
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="flex-1 p-3 border rounded-lg focus:ring-2 focus:ring-purple-500" required />
                    <button type="button" onClick={sendOtp} disabled={!email || otpSent} className={`px-4 py-2 rounded-lg font-medium transition ${email && !otpSent ? "bg-purple-600 text-white hover:bg-purple-700" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}>
                      {otpSent ? "OTP Sent" : "Send OTP"}
                    </button>
                  </div>
                  {otpSent && !isVerified && (
                    <div className="flex gap-2">
                      <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="Enter OTP" className="flex-1 p-3 border rounded-lg focus:ring-2 focus:ring-purple-500" />
                      <button type="button" onClick={verifyOtp} disabled={!otp} className={`px-4 py-2 rounded-lg font-medium transition ${otp ? "bg-green-600 text-white hover:bg-green-700" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}>
                        Verify
                      </button>
                    </div>
                  )}
                  <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500" />
                  <button type="submit" disabled={!isVerified} className={`w-full py-3 rounded-lg font-semibold text-lg transition ${isVerified ? "bg-purple-600 text-white hover:bg-purple-700" : "bg-gray-300 text-gray-600 cursor-not-allowed"}`}>
                    Sign Up
                  </button>
                </form>

                <p className="text-center text-sm text-gray-600 mt-4">
                  Already have an account?{' '}
                  <button type="button" onClick={() => setShowLogin(true)} className="text-pink-500 font-semibold hover:underline">Login</button>
                </p>
              </>
            ) : (
              <>
                <h3 className="text-2xl font-bold text-center text-purple-600 mb-6">Login</h3>
                <form className="space-y-5" onSubmit={handleLogin}>
                  <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500" required />
                  <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500" required />
                  <button type="submit" className="w-full py-3 rounded-lg font-semibold text-lg bg-purple-600 text-white hover:bg-purple-700 transition">Login</button>
                </form>

                <p className="text-center text-sm text-gray-600 mt-4">
                  Don't have an account?{' '}
                  <button type="button" onClick={() => setShowLogin(false)} className="text-pink-500 font-semibold hover:underline">Sign Up</button>
                </p>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Careers;
