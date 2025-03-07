import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Basic validation
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      const user = result.user;

      console.log('User Info:', user);
      const token = await user.getIdToken();
      console.log('Firebase Token:', token);

      login(user); // Call the login function
      toast.success('Registration successful! Redirecting to dashboard...');
      setTimeout(() => navigate('/dashboard'), 2000); // Redirect after 2 seconds
    } catch (error) {
      console.error('Error during registration:', error);
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-8">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <img
            src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
            alt="Company Logo"
            className="h-12 w-auto"
          />
        </div>

        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Create Your Account
        </h2>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div className="relative">
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="email"
              className="absolute left-4 top-3 text-gray-500 text-sm transition-all duration-200 transform -translate-y-4 scale-75 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
            >
              Email Address
            </label>
          </div>

          {/* Password Field */}
          <div className="relative">
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="password"
              className="absolute left-4 top-3 text-gray-500 text-sm transition-all duration-200 transform -translate-y-4 scale-75 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
            >
              Password
            </label>
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all"
          >
            Register
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="mx-4 text-gray-500">OR</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        {/* Login Link */}
        <p className="mt-6 text-center text-gray-600">
          Already have an account?{' '}
          <Link
            to="/login"
            className="text-indigo-600 hover:text-indigo-500 font-semibold"
          >
            Login
          </Link>
        </p>
      </div>

      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default Register;