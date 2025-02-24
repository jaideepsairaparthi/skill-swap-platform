import React from 'react';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { currentUser, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <p className="mb-4">Welcome, {currentUser?.email}!</p>
      <button
        onClick={logout}
        className="bg-red-500 text-white p-2 rounded"
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;