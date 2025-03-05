import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './Components/Login';
import Register from './Components/Register';
import Dashboard from './Components/Dashboard';
import SkillList from './Components/SkillList';
import Profile from './Components/Profile';
import Navbar from './Components/Navbar';
import { requestNotificationPermission } from './components/NotificationService';

function App() {
  useEffect(() => {
    requestNotificationPermission();
  }, []);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/skills" element={<SkillList />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;