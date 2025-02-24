import React from 'react';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../firebase';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate(); // Use the useNavigate hook
  const provider = new GoogleAuthProvider();

  const handleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      console.log('User Info:', user);
      const token = await user.getIdToken();
      console.log('Firebase Token:', token);

      login(user); // Call the login function
      navigate('/dashboard'); // Redirect to dashboard
    } catch (error) {
      console.error('Error during sign-in:', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-bold mb-6">Welcome to Skill Swap</h1>
        <p className="mb-6 text-gray-600">Sign in to continue</p>
        <button
          onClick={handleSignIn}
          className="flex items-center justify-center bg-white border border-gray-300 rounded-lg px-6 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google Logo"
            className="w-5 h-5 mr-2"
          />
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Login;