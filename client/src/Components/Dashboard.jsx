import React from 'react';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { currentUser, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
        >
          Logout
        </button>
      </div>

      {/* Welcome Message */}
      <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
        <p className="text-xl font-semibold text-gray-800">
          Welcome back, <span className="text-indigo-600">{currentUser?.email}</span>!
        </p>
        <p className="text-gray-600 mt-2">
          Here's what's happening on your Skill Swap platform today.
        </p>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* User Profile Card */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Your Profile</h2>
          <div className="flex items-center space-x-4">
            <img
              src="https://via.placeholder.com/100"
              alt="Profile"
              className="w-16 h-16 rounded-full"
            />
            <div>
              <p className="text-lg font-semibold text-gray-800">{currentUser?.email}</p>
              <p className="text-gray-600">Skill Enthusiast</p>
            </div>
          </div>
          <button className="w-full mt-4 bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition duration-300">
            Edit Profile
          </button>
        </div>

        {/* Skills Listing */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Your Skills</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <p className="text-gray-800">Web Development</p>
              <button className="text-indigo-500 hover:text-indigo-600">Edit</button>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-gray-800">Graphic Design</p>
              <button className="text-indigo-500 hover:text-indigo-600">Edit</button>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-gray-800">Data Analysis</p>
              <button className="text-indigo-500 hover:text-indigo-600">Edit</button>
            </div>
          </div>
          <button className="w-full mt-4 bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition duration-300">
            Add New Skill
          </button>
        </div>

        {/* Recent Activities */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activities</h2>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
              <p className="text-gray-800">You added a new skill: Web Development</p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <p className="text-gray-800">You connected with John Doe</p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <p className="text-gray-800">You received a new message</p>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Notifications</h2>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <p className="text-gray-800">You have 3 pending requests</p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <p className="text-gray-800">New skill swap opportunity available</p>
            </div>
          </div>
        </div>

        {/* Analytics */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Analytics</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <p className="text-gray-800">Total Skills Listed</p>
              <p className="text-indigo-500 font-semibold">5</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-gray-800">Connections Made</p>
              <p className="text-indigo-500 font-semibold">12</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-gray-800">Messages Sent</p>
              <p className="text-indigo-500 font-semibold">23</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <button className="w-full bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition duration-300">
              Post a Skill
            </button>
            <button className="w-full bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300">
              Connect with Peers
            </button>
            <button className="w-full bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition duration-300">
              View Messages
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;