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
import { requestNotificationPermission } from './Components/NotificationService';

function App() {
  const { currentUser } = useAuth();

  useEffect(() => {
    requestNotificationPermission();
  }, []);

  return (
    <>
      <Navbar />
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

        {/* Fallback Route: Redirect to Landing Page */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;