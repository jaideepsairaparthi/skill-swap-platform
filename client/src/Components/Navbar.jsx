import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { currentUser, logout } = useAuth();

  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-xl font-bold">
          Skill Swap
        </Link>
        <div className="flex items-center space-x-4">
          {currentUser ? (
            <>
              <Link to="/dashboard" className="text-white hover:underline">
                Dashboard
              </Link>
              <Link to="/skills" className="text-white hover:underline">
                Skills
              </Link>
              <Link to="/profile" className="text-white hover:underline">
                Profile
              </Link>
              <button onClick={logout} className="text-white hover:underline">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-white hover:underline">
                Login
              </Link>
              <Link to="/register" className="text-white hover:underline">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;