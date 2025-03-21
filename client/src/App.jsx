import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Login from './Components/Login';
import Register from './Components/Register';
import Dashboard from './Components/Dashboard';
import SkillList from './Components/SkillList';
import Profile from './Components/Profile';
import Navbar from './Components/Navbar';
import LandingPage from './Components/LandingPage';
import Matches from './Components/Matches'; // Import the Matches component
import Reviews from './Components/Reviews'; // Import the Reviews component
import { requestNotificationPermission } from './Components/NotificationService';
import Notifications from './Components/Notifications'; 
import { ToastContainer } from 'react-toastify';

function App() {
  const { currentUser } = useAuth();

  useEffect(() => {
    requestNotificationPermission();
  }, [currentUser]);

  return (
    <>
      <Navbar />
      <Notifications />
      <ToastContainer position="top-right" autoClose={5000} /> 
      <Routes>
        {/* Default Route: Landing Page */}
        <Route path="/" element={<LandingPage />} />

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