import React from "react";
import { Link as ScrollLink } from "react-scroll";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 flex justify-between h-16 items-center">
        {/* Logo + Gradient Text */}
        <div className="flex items-center space-x-3">
          <img src="/logoo.jpg" alt="Code Nexus Logo" className="h-10 w-auto" />
          <span
            className="text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent"
            style={{ fontFamily: "Garalama, sans-serif" }}
          >
            CODE NEXUS
          </span>
        </div>

        {/* Navigation Links */}
        <div className="flex space-x-8">
          <ScrollLink
            to="home"
            smooth={true}
            duration={800}
            offset={-70}
            className="cursor-pointer hover:text-indigo-600 transition"
          >
            Home
          </ScrollLink>

          <ScrollLink
            to="features"
            smooth={true}
            duration={800}
            offset={-70}
            className="cursor-pointer hover:text-indigo-600 transition"
          >
            Features
          </ScrollLink>

          <ScrollLink
            to="how-it-works"
            smooth={true}
            duration={800}
            offset={-70}
            className="cursor-pointer hover:text-indigo-600 transition"
          >
            Courses
          </ScrollLink>

          <ScrollLink
            to="faq"
            smooth={true}
            duration={800}
            offset={-70}
            className="cursor-pointer hover:text-indigo-600 transition"
          >
            FAQ
          </ScrollLink>

          <ScrollLink
            to="careers-top"
            smooth={true}
            duration={800}
            offset={-70}
            className="cursor-pointer hover:text-indigo-600 transition"
          >
            Career
          </ScrollLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
