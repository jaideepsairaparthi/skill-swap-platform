import React, { useState } from 'react';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../firebase';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const { login, guestLogin } = useAuth();
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setError('');

    // Basic validation
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const user = result.user;

      console.log('User Info:', user);
      const token = await user.getIdToken();
      console.log('Firebase Token:', token);

      login(user); // Call the login function
      toast.success('Login successful! Redirecting to dashboard...');
      setTimeout(() => navigate('/dashboard'), 2000); // Redirect after 2 seconds
    } catch (error) {
      console.error('Error during sign-in:', error);
      switch (error.code) {
        case 'auth/invalid-email':
          setError('Invalid email address.');
          break;
        case 'auth/user-not-found':
          setError('User not found.');
          break;
        case 'auth/wrong-password':
          setError('Incorrect password.');
          break;
        default:
          setError('Failed to login. Please try again.');
      }
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      console.log('User Info:', user);
      const token = await user.getIdToken();
      console.log('Firebase Token:', token);

      login(user); // Call the login function
      toast.success('Login successful! Redirecting to dashboard...');
      setTimeout(() => navigate('/dashboard'), 2000); // Redirect after 2 seconds
    } catch (error) {
      console.error('Error during Google sign-in:', error);
      toast.error('Failed to login with Google. Please try again.');
    }
  };

  const handleGuestLogin = () => {
    guestLogin(); // Call guestLogin function
    toast.success('Guest login successful! Redirecting to dashboard...');
    setTimeout(() => navigate('/dashboard'), 2000); // Redirect after 2 seconds
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
          Welcome Back
        </h2>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleEmailLogin} className="space-y-6">
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

          {/* Forgot Password */}
          <div className="text-right">
            <a
              href="#"
              className="text-sm text-indigo-600 hover:text-indigo-500"
            >
              Forgot Password?
            </a>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all"
          >
            Sign In
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="mx-4 text-gray-500">OR</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        {/* Google Sign-In Button */}
        <button
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center bg-white border border-gray-300 rounded-lg py-3 px-4 text-gray-700 font-semibold hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all"
        >
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google Logo"
            className="w-5 h-5 mr-2"
          />
          Sign in with Google
        </button>

        {/* Guest Login Button */}
        <button
          onClick={handleGuestLogin}
          className="w-full mt-4 bg-gray-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all"
        >
          Login as Guest
        </button>

        {/* Sign Up Link */}
        <p className="mt-6 text-center text-gray-600">
          Don't have an account?{' '}
          <Link
            to="/register" // Redirect to the Register component
            className="text-indigo-600 hover:text-indigo-500 font-semibold"
          >
            Sign Up
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

export default Login;