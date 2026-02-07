import React from "react";
import { FaTwitter, FaInstagram, FaLinkedinIn, FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full bg-linear-to-b from-white via-teal-50 to-teal-100 py-10 px-6 border-t">
      <div className="max-w-7xl mx-auto">
        {/* About + Social */}
        <div className="text-center mb-10">
          <h4 className="text-2xl font-bold mb-4 text-gray-900">
            About ThinkSpace
          </h4>
          <p className="text-base text-gray-700 opacity-80 mb-6 max-w-xl mx-auto">
            A modern platform for sharing ideas, stories, and knowledge. Join
            our community of passionate writers and curious readers.
          </p>

          {/* Social Icons */}
          <div className="flex justify-center gap-6">
            <Link
              target="_blank"
              to={"https://www.linkedin.com/in/arinyadav/"}
              className="text-2xl text-gray-600 hover:text-blue-600 transition-transform hover:scale-110"
            >
              <FaLinkedinIn />
            </Link>
            <Link
              target="_blank"
              to={"https://github.com/Arin-Yadav"}
              className="text-2xl text-gray-600 hover:text-gray-900 transition-transform hover:scale-110"
            >
              <FaGithub />
            </Link>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-6 text-center border-t border-gray-200">
          <p className="text-sm text-gray-900 opacity-80">
            © 2026 ThinkSpace. All rights reserved. Made with ❤️ for writers and
            readers.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
