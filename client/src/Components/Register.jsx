import React, { useState, useCallback } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Particles from "@tsparticles/react";
import { loadAll } from "@tsparticles/all";

const Register = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const particlesInit = useCallback(async (engine) => {
    await loadAll(engine);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!email || !password) {
      setError('Please fill in all fields.');
      setIsLoading(false);
      return;
    }

    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      const user = result.user;

      const token = await user.getIdToken();
      console.log('Firebase Token:', token);

      login(user);
      
      toast.success('Registration successful! Redirecting...', {
        autoClose: 2000,
        onClose: () => navigate('/dashboard'),
      });
    } catch (error) {
      console.error('Error during registration:', error);
      setIsLoading(false);
      switch (error.code) {
        case 'auth/email-already-in-use':
          setError('Email already in use.');
          break;
        case 'auth/invalid-email':
          setError('Invalid email address.');
          break;
        case 'auth/weak-password':
          setError('Password should be at least 6 characters.');
          break;
        default:
          setError('Failed to register. Please try again.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 overflow-hidden relative">
      {/* Futuristic particles background */}
      <div className="fixed inset-0 z-0 opacity-30">
        <Particles
          id="tsparticles-register"
          init={particlesInit}
          options={{
            fullScreen: { enable: false },
            particles: {
              number: { value: 60 },
              color: { value: ["#00FFFF", "#FF00FF", "#00FFAA"] },
              shape: { type: "circle" },
              opacity: { value: 0.5, random: true },
              size: { value: 3, random: true },
              move: {
                enable: true,
                speed: 2,
                direction: "none",
                random: true,
                straight: false,
                out_mode: "out",
                bounce: false,
                attract: { enable: false, rotateX: 600, rotateY: 1200 }
              }
            },
            interactivity: {
              detect_on: "canvas",
              events: {
                onhover: { enable: true, mode: "repulse" },
                onclick: { enable: true, mode: "push" },
                resize: true
              },
              modes: {
                repulse: { distance: 100, duration: 0.4 },
                push: { particles_nb: 4 }
              }
            },
            retina_detect: true
          }}
        />
      </div>

      {/* Floating elements */}
      <div className="absolute top-1/4 left-1/4 w-8 h-8 rounded-full bg-cyan-500 blur-xl opacity-20 animate-float1"></div>
      <div className="absolute bottom-1/3 right-1/4 w-12 h-12 rounded-full bg-purple-500 blur-xl opacity-20 animate-float2"></div>
      <div className="absolute top-1/3 right-1/3 w-6 h-6 rounded-full bg-pink-500 blur-xl opacity-20 animate-float3"></div>

      {/* Main content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-6">
        <div className="w-full max-w-md bg-gray-800/70 backdrop-blur-lg rounded-2xl border border-purple-400/30 p-8 shadow-xl hover:shadow-purple-400/20 transition-all duration-500 transform hover:scale-[1.02]">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center shadow-lg">
              <span className="text-white text-2xl font-bold">SS</span>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-3xl font-bold text-center text-white mb-6">
            Join <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600">SkillSwap</span>
          </h2>
          <p className="text-center text-gray-300 mb-8">
            Create your account and enter the <span className="text-purple-400">future of learning</span>
          </p>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-900/50 text-red-400 text-sm rounded-lg border border-red-400/30">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="relative group">
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent peer placeholder-transparent"
                placeholder=" "
                required
              />
              <label
                htmlFor="email"
                className="absolute left-4 top-3 text-gray-400 text-sm transition-all duration-200 transform -translate-y-4 scale-75 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
              >
                Email Address
              </label>
              <div className="absolute inset-0 rounded-lg border border-purple-400/0 group-hover:border-purple-400/30 pointer-events-none transition-all duration-300"></div>
            </div>

            {/* Password Field */}
            <div className="relative group">
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent peer placeholder-transparent"
                placeholder=" "
                required
              />
              <label
                htmlFor="password"
                className="absolute left-4 top-3 text-gray-400 text-sm transition-all duration-200 transform -translate-y-4 scale-75 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
              >
                Password
              </label>
              <div className="absolute inset-0 rounded-lg border border-purple-400/0 group-hover:border-purple-400/30 pointer-events-none transition-all duration-300"></div>
            </div>

            {/* Register Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-purple-500 hover:to-pink-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Creating Account...
                </div>
              ) : (
                'Register'
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-gray-600/30"></div>
            <span className="mx-4 text-gray-400">OR</span>
            <div className="flex-1 border-t border-gray-600/30"></div>
          </div>

          {/* Login Link */}
          <p className="mt-6 text-center text-gray-400">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-purple-400 hover:text-purple-300 font-semibold transition-colors"
            >
              Login
            </Link>
          </p>
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        pauseOnHover
        draggable
        theme="dark"
        toastClassName="bg-gray-800/90 backdrop-blur-sm border border-gray-700"
        progressClassName="bg-gradient-to-r from-purple-500 to-pink-600"
      />

      {/* Add these styles for animations */}
      <style>{`
        @keyframes float1 {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-20px) translateX(10px); }
        }
        @keyframes float2 {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(15px) translateX(-15px); }
        }
        @keyframes float3 {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-10px) translateX(-10px); }
        }
        .animate-float1 { animation: float1 8s ease-in-out infinite; }
        .animate-float2 { animation: float2 10s ease-in-out infinite; }
        .animate-float3 { animation: float3 12s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default Register;