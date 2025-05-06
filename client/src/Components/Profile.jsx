import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { fetchUserById, createOrUpdateUser } from '../api';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Particles from "@tsparticles/react";
import { loadAll } from "@tsparticles/all";
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [profilePic, setProfilePic] = useState('');
  const [skillsOffered, setSkillsOffered] = useState('');
  const [skillsWanted, setSkillsWanted] = useState('');
  const [loading, setLoading] = useState(true);

  const particlesInit = useCallback(async (engine) => {
    await loadAll(engine);
  }, []);

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
      return;
    }

    const getUser = async () => {
      try {
        const user = await fetchUserById(currentUser.uid);
        if (user.error) {
          console.error('Error fetching user:', user.error);
          return;
        }
        setName(user.name || '');
        setEmail(user.email || currentUser.email || '');
        setProfilePic(user.profilePic || 'https://avatars.dicebear.com/api/identicon/default.svg');
        setSkillsOffered(user.skillsOffered?.join(', ') || '');
        setSkillsWanted(user.skillsWanted?.join(', ') || '');
      } catch (error) {
        console.error('Error fetching user:', error);
        toast.error('Failed to load profile data');
      } finally {
        setLoading(false);
      }
    };
    getUser();
  }, [currentUser, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Prepare the user data
    const userData = {
      firebaseUID: currentUser.uid,
      name,
      email,
      profilePic,
      skillsOffered: skillsOffered.split(',').map(skill => skill.trim()),
      skillsWanted: skillsWanted.split(',').map(skill => skill.trim()),
    };

    try {
      const response = await createOrUpdateUser(userData);
      console.log('Profile updated successfully:', response);
      toast.success('Profile updated successfully!', {
        autoClose: 2000,
        onClose: () => navigate('/dashboard'),
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-900/90 z-50">
        <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 overflow-hidden relative">
      {/* Futuristic particles background */}
      <div className="fixed inset-0 z-0 opacity-30">
        <Particles
          id="tsparticles-profile"
          init={particlesInit}
          options={{
            fullScreen: { enable: false },
            particles: {
              number: { value: 50 },
              color: { value: ["#00FFFF", "#FF00FF", "#00FFAA"] },
              shape: { type: "circle" },
              opacity: { value: 0.5, random: true },
              size: { value: 3, random: true },
              move: {
                enable: true,
                speed: 1.5,
                direction: "none",
                random: true,
                straight: false,
                out_mode: "out",
                bounce: false,
                attract: { enable: false, rotateX: 600, rotateY: 1200 }
              }
            },
            interactivity: {
              detect_on: "canvas",
              events: {
                onhover: { enable: true, mode: "repulse" },
                onclick: { enable: true, mode: "push" },
                resize: true
              },
              modes: {
                repulse: { distance: 100, duration: 0.4 },
                push: { particles_nb: 4 }
              }
            },
            retina_detect: true
          }}
        />
      </div>

      {/* Floating elements */}
      <div className="absolute top-1/4 left-1/4 w-8 h-8 rounded-full bg-cyan-500 blur-xl opacity-20 animate-float1"></div>
      <div className="absolute bottom-1/3 right-1/4 w-12 h-12 rounded-full bg-purple-500 blur-xl opacity-20 animate-float2"></div>
      <div className="absolute top-1/3 right-1/3 w-6 h-6 rounded-full bg-pink-500 blur-xl opacity-20 animate-float3"></div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
        <div className="w-full max-w-2xl bg-gray-800/70 backdrop-blur-lg rounded-2xl border border-cyan-400/30 p-8 shadow-xl hover:shadow-cyan-400/20 transition-all duration-500 transform hover:scale-[1.01]">
          {/* Header */}
          <div className="flex flex-col items-center mb-8">
            {/* Profile Picture */}
            <div className="relative mb-4">
              <img
                src={profilePic}
                alt="Profile"
                className="w-24 h-24 rounded-full border-2 border-cyan-400/50 object-cover"
              />
              <div className="absolute inset-0 rounded-full border-2 border-transparent hover:border-cyan-400/30 transition-all duration-300 pointer-events-none"></div>
            </div>
            
            <h1 className="text-3xl font-bold text-center text-white">
              Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600">Profile</span>
            </h1>
            <p className="text-center text-gray-300 mt-2">
              Customize your <span className="text-cyan-400">digital identity</span>
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div className="relative group">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent peer placeholder-transparent"
                placeholder=" "
                required
              />
              <label className="absolute left-4 top-3 text-gray-400 text-sm transition-all duration-200 transform -translate-y-4 scale-75 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">
                Full Name
              </label>
              <div className="absolute inset-0 rounded-lg border border-cyan-400/0 group-hover:border-cyan-400/30 pointer-events-none transition-all duration-300"></div>
            </div>

            {/* Email Field */}
            <div className="relative group">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent peer placeholder-transparent"
                placeholder=" "
                required
              />
              <label className="absolute left-4 top-3 text-gray-400 text-sm transition-all duration-200 transform -translate-y-4 scale-75 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">
                Email Address
              </label>
              <div className="absolute inset-0 rounded-lg border border-cyan-400/0 group-hover:border-cyan-400/30 pointer-events-none transition-all duration-300"></div>
            </div>

            {/* Profile Picture URL */}
            <div className="relative group">
              <input
                type="text"
                value={profilePic}
                onChange={(e) => setProfilePic(e.target.value)}
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent peer placeholder-transparent"
                placeholder=" "
              />
              <label className="absolute left-4 top-3 text-gray-400 text-sm transition-all duration-200 transform -translate-y-4 scale-75 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">
                Profile Picture URL
              </label>
              <div className="absolute inset-0 rounded-lg border border-cyan-400/0 group-hover:border-cyan-400/30 pointer-events-none transition-all duration-300"></div>
            </div>

            {/* Skills Offered */}
            <div className="relative group">
              <input
                type="text"
                value={skillsOffered}
                onChange={(e) => setSkillsOffered(e.target.value)}
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent peer placeholder-transparent"
                placeholder=" "
              />
              <label className="absolute left-4 top-3 text-gray-400 text-sm transition-all duration-200 transform -translate-y-4 scale-75 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">
                Skills Offered (comma separated)
              </label>
              <div className="absolute inset-0 rounded-lg border border-cyan-400/0 group-hover:border-cyan-400/30 pointer-events-none transition-all duration-300"></div>
            </div>

            {/* Skills Wanted */}
            <div className="relative group">
              <input
                type="text"
                value={skillsWanted}
                onChange={(e) => setSkillsWanted(e.target.value)}
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent peer placeholder-transparent"
                placeholder=" "
              />
              <label className="absolute left-4 top-3 text-gray-400 text-sm transition-all duration-200 transform -translate-y-4 scale-75 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">
                Skills Wanted (comma separated)
              </label>
              <div className="absolute inset-0 rounded-lg border border-cyan-400/0 group-hover:border-cyan-400/30 pointer-events-none transition-all duration-300"></div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-cyan-600 to-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-cyan-500 hover:to-purple-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all"
            >
              Update Profile
            </button>
          </form>
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        pauseOnHover
        draggable
        theme="dark"
        toastClassName="bg-gray-800/90 backdrop-blur-sm border border-gray-700"
        progressClassName="bg-gradient-to-r from-cyan-500 to-purple-600"
      />

      {/* Animation styles */}
      <style>{`
        @keyframes float1 {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-20px) translateX(10px); }
        }
        @keyframes float2 {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(15px) translateX(-15px); }
        }
        @keyframes float3 {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-10px) translateX(-10px); }
        }
        .animate-float1 { animation: float1 8s ease-in-out infinite; }
        .animate-float2 { animation: float2 10s ease-in-out infinite; }
        .animate-float3 { animation: float3 12s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default Profile;