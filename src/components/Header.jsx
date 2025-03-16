import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <header className="fixed top-0 w-screen py-4 z-10">
      <div className="w-full px-6 mx-auto flex items-center justify-between">
        <h2 className="text-2xl md:text-3xl font-bold text-blue-800 tracking-tight cursor-pointer" onClick={() => navigate("/")}>
          Clive
        </h2>
        <nav className="hidden md:block">
          <ul className="flex space-x-8 text-gray-700">
            <li>
              <a
                href="#"
                className="hover:text-blue-800 hover:underline underline-offset-4 transition-all duration-200"
              >
                Logout
              </a>
            </li>
          </ul>
        </nav>
        {/* Mobile Menu Button (Add logic for toggle if needed) */}
        <button className="md:hidden text-gray-700 focus:outline-none">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;
