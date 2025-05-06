import React, { useState, useCallback, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";

const HomePage = () => {
    const [value, setValue] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const [recentRooms, setRecentRooms] = useState([]);
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    // Set room ID if coming from a match
    useEffect(() => {
        if (location.state?.fromMatch) {
            setValue(`match-${location.state.matchId}-${Date.now()}`);
        }
    }, [location.state]);

    // Load recent rooms from localStorage
    useEffect(() => {
        const savedRooms = JSON.parse(localStorage.getItem('skillSwapRecentRooms') || '[]');
        setRecentRooms(savedRooms);
    }, []);

    const handleJoinRoom = useCallback(() => {
        const roomID = value.trim() ? value : uuidv4();
        
        // Update recent rooms
        const updatedRooms = [
            { id: roomID, timestamp: Date.now() },
            ...recentRooms.filter(room => room.id !== roomID).slice(0, 4)
        ];
        setRecentRooms(updatedRooms);
        localStorage.setItem('skillSwapRecentRooms', JSON.stringify(updatedRooms));
        
        navigate(`/room/${roomID}`, { 
            state: location.state 
        });
    }, [navigate, value, recentRooms, location.state]);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleJoinRoom();
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4 relative overflow-hidden">
            {/* Glowing background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-cyan-500/10 blur-3xl"></div>
                <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-purple-500/10 blur-3xl"></div>
            </div>

            {/* Main content */}
            <motion.div 
                className="w-full max-w-md bg-gray-900/80 backdrop-blur-lg border border-gray-800 rounded-xl shadow-2xl p-8 relative z-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="text-center mb-8">
                    <motion.h1 
                        className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 mb-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        SkillSwap Video
                    </motion.h1>
                    <motion.p 
                        className="text-gray-400"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        {currentUser ? `Welcome, ${currentUser.displayName || 'User'}` : 'Join or create a video room'}
                    </motion.p>
                </div>

                {/* Room input */}
                <motion.div 
                    className="mb-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    <div className="relative">
                        <motion.input
                            type="text"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            onKeyDown={handleKeyDown}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                            placeholder="Enter room code or leave blank"
                            className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 transition-all"
                            whileFocus={{ 
                                boxShadow: "0 0 0 2px rgba(34, 211, 238, 0.5)"
                            }}
                        />
                        <motion.div 
                            className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ 
                                width: isFocused ? '100%' : 0,
                                opacity: isFocused ? 1 : 0
                            }}
                            transition={{ duration: 0.3 }}
                        />
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                        Leave blank to generate a new room ID
                    </p>
                </motion.div>

                {/* Join button */}
                <motion.button
                    onClick={handleJoinRoom}
                    className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white py-3 rounded-lg font-medium relative overflow-hidden group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    <span className="relative z-10">
                        {value.trim() ? 'Join Room' : 'Create New Room'}
                    </span>
                    <motion.div 
                        className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-500 opacity-0 group-hover:opacity-100"
                        initial={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    />
                </motion.button>

                {/* Recent rooms */}
                {recentRooms.length > 0 && (
                    <motion.div 
                        className="mt-8"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                    >
                        <h3 className="text-sm font-medium text-gray-400 mb-2">Recent Rooms</h3>
                        <div className="space-y-2">
                            {recentRooms.map((room) => (
                                <motion.div
                                    key={room.id}
                                    whileHover={{ x: 5 }}
                                    transition={{ type: 'spring', stiffness: 400 }}
                                >
                                    <button
                                        onClick={() => {
                                            setValue(room.id);
                                            setTimeout(handleJoinRoom, 300);
                                        }}
                                        className="w-full text-left bg-gray-800/30 hover:bg-gray-800/50 px-4 py-2 rounded-lg text-sm text-gray-300 flex items-center justify-between transition-colors"
                                    >
                                        <span className="truncate">{room.id}</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
                {currentUser && (
                    <motion.div
                        className="mt-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7 }}
                    >
                        <button
                            onClick={() => navigate('/matches')}
                            className="w-full bg-gray-800/50 hover:bg-gray-800/70 text-white py-3 rounded-lg font-medium border border-gray-700 transition-all"
                        >
                            View Your Matches
                        </button>
                    </motion.div>
                )}
            </motion.div>

            {/* Footer */}
            <motion.div 
                className="mt-8 text-center text-gray-500 text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
            >
                <p>Share the room code with others to collaborate</p>
            </motion.div>
        </div>
    );
};

export default HomePage;