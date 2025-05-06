import React from 'react';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { currentUser, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-900 p-6 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute -top-40 -left-40 w-80 h-80 rounded-full bg-cyan-500/10 blur-3xl animate-pulse-slow"></div>
      <div className="absolute -bottom-20 -right-20 w-60 h-60 rounded-full bg-purple-500/10 blur-3xl animate-pulse-slow delay-1000"></div>
      
      {/* Header */}
      <div className="flex justify-between items-center mb-8 relative z-10">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600">
          Dashboard
        </h1>
      </div>

      {/* Welcome Message */}
      <div className="bg-gray-800/70 backdrop-blur-lg p-8 rounded-2xl shadow-xl mb-8 border border-gray-700 relative z-10">
        <p className="text-2xl font-semibold text-white">
          Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">{currentUser?.email}</span>!
        </p>
        <p className="text-gray-400 mt-3">
          Your personalized skill exchange hub at a glance
        </p>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
        {/* User Profile Card */}
        <div className="bg-gray-800/70 backdrop-blur-lg p-6 rounded-2xl shadow-xl border border-cyan-400/20 hover:border-cyan-400/40 transition-all duration-300">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center">
            <span className="w-2 h-2 bg-cyan-400 rounded-full mr-2"></span>
            Your Digital Profile
          </h2>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <img
                src="src\assets\Gemini_Generated_Image_q39v7pq39v7pq39v.jpeg"
                alt="Profile"
                className="w-16 h-16 rounded-full border-2 border-cyan-400/50"
              />
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-gray-800"></div>
            </div>
            <div>
              <p className="text-lg font-semibold text-white">{currentUser?.email}</p>
              <p className="text-cyan-400 text-sm">Skill Enthusiast</p>
            </div>
          </div>
          <button className="w-full mt-6 bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-4 py-3 rounded-xl hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300">
            Enhance Profile
          </button>
        </div>

        {/* Skills Listing */}
        <div className="bg-gray-800/70 backdrop-blur-lg p-6 rounded-2xl shadow-xl border border-purple-400/20 hover:border-purple-400/40 transition-all duration-300">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center">
            <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
            Skill Inventory
          </h2>
          <div className="space-y-3">
            {['Web Development', 'Graphic Design', 'Data Analysis'].map((skill, i) => (
              <div key={i} className="flex justify-between items-center bg-gray-700/50 p-3 rounded-lg">
                <p className="text-gray-300">{skill}</p>
                <button className="text-purple-400 hover:text-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white px-4 py-3 rounded-xl hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300">
            + Add New Skill
          </button>
        </div>

        {/* Recent Activities */}
        <div className="bg-gray-800/70 backdrop-blur-lg p-6 rounded-2xl shadow-xl border border-pink-400/20 hover:border-pink-400/40 transition-all duration-300">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center">
            <span className="w-2 h-2 bg-pink-400 rounded-full mr-2"></span>
            Activity Stream
          </h2>
          <div className="space-y-4">
            {[
              { text: 'Added Web Development skill', color: 'bg-cyan-400' },
              { text: 'Connected with John Doe', color: 'bg-green-400' },
              { text: 'Received new message', color: 'bg-yellow-400' }
            ].map((item, i) => (
              <div key={i} className="flex items-start space-x-3">
                <div className={`flex-shrink-0 mt-1 w-2 h-2 ${item.color} rounded-full animate-pulse`}></div>
                <p className="text-gray-300">{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-gray-800/70 backdrop-blur-lg p-6 rounded-2xl shadow-xl border border-cyan-400/20 hover:border-cyan-400/40 transition-all duration-300">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center">
            <span className="w-2 h-2 bg-cyan-400 rounded-full mr-2"></span>
            Alerts Hub
          </h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 mt-1 w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
              <p className="text-gray-300">3 pending requests</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 mt-1 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              <p className="text-gray-300">New skill swap opportunity</p>
            </div>
          </div>
        </div>

        {/* Analytics */}
        <div className="bg-gray-800/70 backdrop-blur-lg p-6 rounded-2xl shadow-xl border border-purple-400/20 hover:border-purple-400/40 transition-all duration-300">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center">
            <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
            Performance Metrics
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Skills Listed', value: '5', color: 'text-cyan-400' },
              { label: 'Connections', value: '12', color: 'text-purple-400' },
              { label: 'Messages', value: '23', color: 'text-pink-400' },
              { label: 'Swaps', value: '7', color: 'text-green-400' }
            ].map((metric, i) => (
              <div key={i} className="bg-gray-700/30 p-3 rounded-lg">
                <p className="text-gray-400 text-sm">{metric.label}</p>
                <p className={`text-2xl font-bold ${metric.color}`}>{metric.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-gray-800/70 backdrop-blur-lg p-6 rounded-2xl shadow-xl border border-pink-400/20 hover:border-pink-400/40 transition-all duration-300">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center">
            <span className="w-2 h-2 bg-pink-400 rounded-full mr-2"></span>
            Quick Launch
          </h2>
          <div className="space-y-3">
            <button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-3 rounded-xl hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
              </svg>
              Post Skill
            </button>
            <button className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white px-4 py-3 rounded-xl hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6z" />
              </svg>
              Find Peers
            </button>
            <button className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-3 rounded-xl hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
              </svg>
              Messages
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;