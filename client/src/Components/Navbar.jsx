import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="text-white text-2xl font-bold hover:text-gray-200 transition duration-300">
            Skill Swap
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {currentUser ? (
              <>
                <Link
                  to="/dashboard"
                  className="text-white hover:text-gray-200 hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium transition duration-300"
                >
                  Dashboard
                </Link>
                <Link
                  to="/skills"
                  className="text-white hover:text-gray-200 hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium transition duration-300"
                >
                  Skills
                </Link>
                <Link
                  to="/matches"
                  className="text-white hover:text-gray-200 hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium transition duration-300"
                >
                  Matches
                </Link>
                <Link
                  to={`/reviews/${currentUser.uid}`}
                  className="text-white hover:text-gray-200 hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium transition duration-300"
                >
                  Reviews
                </Link>
                <Link
                  to="/profile"
                  className="text-white hover:text-gray-200 hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium transition duration-300"
                >
                  Profile
                </Link>
                <button
                  onClick={logout}
                  className="text-white hover:text-gray-200 hover:bg-red-600 px-3 py-2 rounded-md text-sm font-medium transition duration-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-white hover:text-gray-200 hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium transition duration-300"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="text-white hover:text-gray-200 hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium transition duration-300"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={toggleMenu}
              className="text-white hover:text-gray-200 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {currentUser ? (
                <>
                  <Link
                    to="/dashboard"
                    className="block text-white hover:text-gray-200 hover:bg-blue-700 px-3 py-2 rounded-md text-base font-medium transition duration-300"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/skills"
                    className="block text-white hover:text-gray-200 hover:bg-blue-700 px-3 py-2 rounded-md text-base font-medium transition duration-300"
                  >
                    Skills
                  </Link>
                  <Link
                    to="/matches"
                    className="block text-white hover:text-gray-200 hover:bg-blue-700 px-3 py-2 rounded-md text-base font-medium transition duration-300"
                  >
                    Matches
                  </Link>
                  <Link
                    to={`/reviews/${currentUser.uid}`}
                    className="block text-white hover:text-gray-200 hover:bg-blue-700 px-3 py-2 rounded-md text-base font-medium transition duration-300"
                  >
                    Reviews
                  </Link>
                  <Link
                    to="/profile"
                    className="block text-white hover:text-gray-200 hover:bg-blue-700 px-3 py-2 rounded-md text-base font-medium transition duration-300"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={logout}
                    className="block w-full text-left text-white hover:text-gray-200 hover:bg-red-600 px-3 py-2 rounded-md text-base font-medium transition duration-300"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block text-white hover:text-gray-200 hover:bg-blue-700 px-3 py-2 rounded-md text-base font-medium transition duration-300"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="block text-white hover:text-gray-200 hover:bg-blue-700 px-3 py-2 rounded-md text-base font-medium transition duration-300"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;