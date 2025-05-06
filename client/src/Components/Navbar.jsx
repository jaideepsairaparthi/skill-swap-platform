import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activePath, setActivePath] = useState('/');
  const location = useLocation();
  const navbarRef = useRef(null);

  // Track active path
  useEffect(() => {
    setActivePath(location.pathname);
  }, [location]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navItems = currentUser ? [
    { path: "/dashboard", label: "Dashboard", icon: "📊" },
    { path: "/skills", label: "Skills", icon: "🛠️" },
    { path: "/matches", label: "Matches", icon: "🤝" },
    { path: `/reviews/${currentUser.uid}`, label: "Reviews", icon: "⭐" },
    { path: "/profile", label: "Profile", icon: "👤" }
  ] : [];

  return (
    <nav 
      ref={navbarRef}
      className="bg-gray-900/90 backdrop-blur-lg border-b border-gray-800 shadow-2xl relative z-50"
      style={{ boxShadow: '0 4px 30px rgba(0, 255, 255, 0.1)' }}
    >
      {/* Glowing border effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 border-b border-transparent hover:border-cyan-500/30 transition-all duration-500"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo with enhanced effect */}
          <Link 
            to="/" 
            className="relative group"
          >
            <motion.span 
              className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 text-2xl font-bold tracking-tight"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              <span className="opacity-80 group-hover:opacity-100 transition-opacity">⚡</span> SkillSwap
            </motion.span>
            <motion.div 
              className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: activePath === '/' ? '100%' : 0 }}
              transition={{ duration: 0.3 }}
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1 h-full">
            {currentUser ? (
              <>
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="relative px-4 py-2 h-full flex items-center"
                  >
                    <motion.span
                      className={`text-sm font-medium ${
                        activePath.includes(item.path) 
                          ? 'text-white' 
                          : 'text-gray-400 hover:text-gray-200'
                      }`}
                      whileHover={{ y: -2 }}
                      transition={{ type: 'spring', stiffness: 500 }}
                    >
                      {item.label}
                    </motion.span>
                    <motion.div 
                      className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ 
                        width: activePath.includes(item.path) ? '100%' : 0,
                        opacity: activePath.includes(item.path) ? 1 : 0
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  </Link>
                ))}
                <motion.button
                  onClick={logout}
                  className="ml-4 px-4 py-2 bg-gradient-to-r from-red-500 to-pink-600 text-white text-sm font-medium rounded-lg relative overflow-hidden group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10">Logout</span>
                  <motion.span 
                    className="absolute inset-0 bg-gradient-to-r from-pink-600 to-red-500 opacity-0 group-hover:opacity-100"
                    initial={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="relative px-4 py-2 h-full flex items-center"
                >
                  <motion.span
                    className={`text-sm font-medium ${
                      activePath === '/login' 
                        ? 'text-white' 
                        : 'text-gray-400 hover:text-gray-200'
                    }`}
                    whileHover={{ y: -2 }}
                    transition={{ type: 'spring', stiffness: 500 }}
                  >
                    Login
                  </motion.span>
                  <motion.div 
                    className="absolute bottom-0 left-0 h-0.5 bg-cyan-400 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: activePath === '/login' ? '100%' : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </Link>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to="/register"
                    className="ml-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-600 text-white text-sm font-medium rounded-lg relative overflow-hidden group"
                  >
                    <span className="relative z-10">Register</span>
                    <motion.span 
                      className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-500 opacity-0 group-hover:opacity-100"
                      initial={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </Link>
                </motion.div>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <motion.div 
            className="flex md:hidden"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-400 hover:text-white p-2 rounded-lg focus:outline-none relative group"
            >
              {isMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
              <motion.span 
                className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full w-0 group-hover:w-full"
                initial={{ width: 0 }}
                animate={{ width: isMenuOpen ? '100%' : 0 }}
                transition={{ duration: 0.3 }}
              />
            </button>
          </motion.div>
        </div>

        {/* Mobile Menu with animations */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-gray-900/95 backdrop-blur-xl rounded-b-lg overflow-hidden border-t border-gray-800 shadow-2xl"
            >
              <div className="p-4 space-y-2">
                {currentUser ? (
                  <>
                    {navItems.map((item) => (
                      <motion.div
                        key={item.path}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Link
                          to={item.path}
                          className={`flex items-center px-3 py-3 rounded-lg transition-all ${
                            activePath.includes(item.path)
                              ? 'bg-gray-800/50 text-white'
                              : 'text-gray-300 hover:bg-gray-800/30 hover:text-white'
                          }`}
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <span className="mr-3 text-lg">{item.icon}</span>
                          <span>{item.label}</span>
                          {activePath.includes(item.path) && (
                            <motion.span 
                              className="ml-auto h-1 w-4 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ type: 'spring', stiffness: 500 }}
                            />
                          )}
                        </Link>
                      </motion.div>
                    ))}
                    <motion.div
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.2, delay: 0.1 }}
                    >
                      <button
                        onClick={() => {
                          logout();
                          setIsMenuOpen(false);
                        }}
                        className="w-full flex items-center px-3 py-3 text-red-400 hover:text-white hover:bg-red-500/20 rounded-lg transition-all"
                      >
                        <span className="mr-3 text-lg">🚪</span>
                        <span>Logout</span>
                      </button>
                    </motion.div>
                  </>
                ) : (
                  <>
                    <motion.div
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Link
                        to="/login"
                        className={`flex items-center px-3 py-3 rounded-lg transition-all ${
                          activePath === '/login'
                            ? 'bg-gray-800/50 text-white'
                            : 'text-gray-300 hover:bg-gray-800/30 hover:text-white'
                        }`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <span className="mr-3 text-lg">🔑</span>
                        <span>Login</span>
                      </Link>
                    </motion.div>
                    <motion.div
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.2, delay: 0.1 }}
                    >
                      <Link
                        to="/register"
                        className="flex items-center px-3 py-3 bg-gradient-to-r from-cyan-500/90 to-purple-600/90 text-white rounded-lg hover:shadow-lg hover:shadow-cyan-500/20 transition-all"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <span className="mr-3 text-lg">✨</span>
                        <span>Register</span>
                      </Link>
                    </motion.div>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;