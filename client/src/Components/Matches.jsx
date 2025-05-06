import React, { useEffect, useState, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { fetchMatches, updateMatchStatus, startVideoCall } from '../api';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Particles from "@tsparticles/react";
import { loadAll } from "@tsparticles/all";
import { useNavigate } from 'react-router-dom';

const Matches = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const particlesInit = useCallback(async (engine) => {
    await loadAll(engine);
  }, []);

  const fetchUserMatches = async () => {
    try {
      const matches = await fetchMatches(currentUser.uid);
      if (matches.error) {
        throw new Error(matches.error);
      }
      setMatches(matches);
    } catch (error) {
      console.error('Error fetching matches:', error);
      toast.error(error.message || 'Failed to load matches');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
      return;
    }
    fetchUserMatches();
  }, [currentUser, navigate]);

  const handleUpdateStatus = async (matchId, status) => {
    try {
      setRefreshing(true);
      const response = await updateMatchStatus(matchId, status);
      if (response.error) {
        throw new Error(response.error);
      }
      toast.success(`Match ${status} successfully!`);
      await fetchUserMatches();
    } catch (error) {
      console.error('Error updating match status:', error);
      toast.error(error.message || 'Failed to update match status');
      setRefreshing(false);
    }
  };

  const handleStartVideoCall = async (matchId) => {
    try {
      setRefreshing(true);
      const { roomId, error } = await startVideoCall(matchId);
      if (error) {
        throw new Error(error);
      }
      navigate(`/room/${roomId}`, { 
        state: { 
          fromMatch: true,
          matchId,
          redirectTo: '/matches' 
        } 
      });
    } catch (error) {
      console.error('Error starting video call:', error);
      toast.error(error.message || 'Failed to start video call');
      setRefreshing(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchUserMatches();
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
      {/* Background elements */}
      <div className="fixed inset-0 z-0 opacity-30">
        <Particles
          id="tsparticles-matches"
          init={particlesInit}
          options={{
            fullScreen: { enable: false },
            particles: {
              number: { value: 40 },
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

      {/* Floating decoratives */}
      <div className="absolute top-1/4 left-1/4 w-8 h-8 rounded-full bg-cyan-500 blur-xl opacity-20 animate-float1"></div>
      <div className="absolute bottom-1/3 right-1/4 w-12 h-12 rounded-full bg-purple-500 blur-xl opacity-20 animate-float2"></div>
      <div className="absolute top-1/3 right-1/3 w-6 h-6 rounded-full bg-pink-500 blur-xl opacity-20 animate-float3"></div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
        <div className="w-full max-w-3xl bg-gray-800/70 backdrop-blur-lg rounded-2xl border border-purple-400/30 p-8 shadow-xl hover:shadow-purple-400/20 transition-all duration-500 transform hover:scale-[1.01]">
          {/* Header with refresh button */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white">
                Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600">Matches</span>
              </h1>
              <p className="text-gray-300 mt-2">
                Connect with your <span className="text-cyan-400">skill partners</span>
              </p>
            </div>
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="bg-gray-700/50 hover:bg-gray-700/70 p-2 rounded-full transition-all"
              title="Refresh matches"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className={`h-6 w-6 text-cyan-400 ${refreshing ? 'animate-spin' : ''}`} 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
          </div>

          {/* Matches List */}
          {matches.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-xl text-gray-200 mb-2">No matches found</h3>
              <p className="text-gray-400">Start swapping skills to see matches here!</p>
              <button
                onClick={() => navigate('/skills')}
                className="mt-6 bg-gradient-to-r from-cyan-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-cyan-500 hover:to-purple-500 transition-all"
              >
                Browse Skills
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {matches.map((match) => (
                <div key={match._id} className="bg-gray-700/50 rounded-xl p-6 border border-gray-600/30 hover:border-cyan-400/30 transition-all">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-white">
                        {match.userA === currentUser.uid ? match.userBName : match.userAName}
                      </h3>
                      <p className="text-cyan-300">Skill: {match.skillExchanged}</p>
                      {match.callHistory?.length > 0 && (
                        <p className="text-xs text-gray-400 mt-1">
                          Last call: {new Date(match.callHistory[0].startedAt).toLocaleString()}
                        </p>
                      )}
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold self-start ${
                      match.status === 'pending' ? 'bg-yellow-900/50 text-yellow-300 border border-yellow-500/30' :
                      match.status === 'accepted' ? 'bg-green-900/50 text-green-300 border border-green-500/30' :
                      'bg-blue-900/50 text-blue-300 border border-blue-500/30'
                    }`}>
                      {match.status}
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap gap-3">
                    {match.status === 'pending' && (
                      <button
                        onClick={() => handleUpdateStatus(match._id, 'accepted')}
                        disabled={refreshing}
                        className="bg-gradient-to-r from-green-600 to-cyan-600 text-white px-4 py-2 rounded-lg hover:from-green-500 hover:to-cyan-500 transition-all disabled:opacity-50"
                      >
                        Accept Match
                      </button>
                    )}
                    {match.status === 'accepted' && (
                      <button
                        onClick={() => handleStartVideoCall(match._id)}
                        disabled={refreshing}
                        className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg hover:from-purple-500 hover:to-pink-500 transition-all disabled:opacity-50"
                      >
                        Video Call
                      </button>
                    )}
                    <button
                      onClick={() => handleUpdateStatus(match._id, 'completed')}
                      disabled={refreshing}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-500 hover:to-purple-500 transition-all disabled:opacity-50"
                    >
                      Mark Complete
                    </button>
                    <button
                      onClick={() => navigate(`/profile/${match.userA === currentUser.uid ? match.userB : match.userA}`)}
                      className="border border-cyan-400/30 text-cyan-400 px-4 py-2 rounded-lg hover:bg-cyan-400/10 transition-all"
                    >
                      View Profile
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Toast Notifications */}
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
        progressClassName="bg-gradient-to-r from-purple-500 to-cyan-600"
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

export default Matches;