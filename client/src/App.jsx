import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './Components/Login';
import Register from './Components/Register';
import Dashboard from './Components/Dashboard';
import SkillList from './Components/SkillList';
import Profile from './Components/Profile';
import Navbar from './Components/Navbar';
import LandingPage from './Components/LandingPage';
import Matches from './Components/Matches'; 
import Reviews from './Components/Reviews'; 
import Notifications from './Components/Notifications'; 
import { ToastContainer } from 'react-toastify';
import HomePage from './Components/HomePage';
import Room from './Components/Room'
import useNotificationService from './Components/NotificationService';
import { getAuth } from 'firebase/auth';


function App() {
  const auth = getAuth();
  const currentUser = auth.currentUser;
  const { requestNotificationPermission } = useNotificationService();

  useEffect(() => {
    // Only run in browser environment
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      requestNotificationPermission();
    }
  }, []);

  return (
    <>
    <ToastContainer
        position="top-right"
        autoClose={5000} // Ensures toast messages disappear
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        pauseOnHover
        draggable
        theme="light" // You can set it to "dark" if needed
      />
      <Navbar />
      <Notifications />
      <Routes>
        {/* Default Route: Landing Page */}
        <Route path="/" element={<LandingPage />} />
        
        <Route path="/home" element={<HomePage/>} />
        <Route path="/room/:id" element={<Room />} />

        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={currentUser ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/skills"
          element={currentUser ? <SkillList /> : <Navigate to="/login" />}
        />
        <Route
          path="/profile"
          element={currentUser ? <Profile /> : <Navigate to="/login" />}
        />
        <Route
          path="/matches"
          element={currentUser ? <Matches /> : <Navigate to="/login" />}
        />
        <Route
          path="/reviews/:userId"
          element={currentUser ? <Reviews /> : <Navigate to="/login" />}
        />

        {/* Fallback Route: Redirect to Landing Page */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;