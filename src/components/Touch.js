import React from "react";
import { FaYoutube, FaLinkedin, FaTwitter, FaInstagram, FaTelegramPlane } from "react-icons/fa";

const Touch = () => {
  return (
    <section
      className="relative text-white w-full "
      style={{ backgroundColor: "#002147", padding: "3rem 2rem" }}
    >
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        
        {/* LEFT SIDE - Logo + Do follow + Social Media */}
        <div className="flex flex-col items-start md:items-center md:flex-row md:space-x-12 ml-8"> {/* Added ml-8 for left space */}
          
          {/* Logo */}
          <img src="/logo.png" alt="Code Nexus Logo" className="w-40 mb-4 md:mb-0" />

          {/* Social media section */}
          <div className="flex flex-col items-start md:items-center">
            {/* Text above icons */}
            <p className="text-sm text-gray-300 mb-2">Do follow and support</p>

            {/* Social Media Icons */}
            <div className="flex space-x-4 text-2xl">
              <a
                href="https://www.youtube.com/@CODENexus-032"
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-600 hover:text-red-700"
              >
                <FaYoutube />
              </a>
              <a
                href="https://www.linkedin.com/in/code-nexus-0a511b386/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-500"
              >
                <FaLinkedin />
              </a>
              <a
                href="https://x.com/CODENexus032"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white"
              >
                <FaTwitter />
              </a>
              <a
                href="https://www.instagram.com/codenexus032/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-400 hover:text-pink-500"
              >
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>
        

        {/* RIGHT SIDE - Join + Telegram + Contact */}
        <div className="flex flex-col md:flex-row md:items-center md:space-x-12 mt-8 md:mt-0 mr-8"> {/* Added mr-8 for right space */}
          
          {/* Join with us */}
          <div className="flex items-center space-x-2 md:space-x-4">
            <h4 className="text-2xl">Join with us :</h4>
            <a
              href="https://t.me/CODENexus032"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 text-blue-400 hover:text-blue-500 transition"
            >
              <FaTelegramPlane className="text-2xl" />
              <span>Telegram</span>
            </a>
          </div>

          {/* Contact */}
          <div className="flex items-center space-x-2 md:space-x-4">
            <p>Contact us :</p>
            <a
              href="mailto:codenexus032@gmail.com"
              className="text-pink-500 hover:text-pink-600 underline transition"
            >
              codenexus032@gmail.com
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Touch;
