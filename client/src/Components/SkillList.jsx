import React, { useEffect, useState, useMemo } from 'react';
import { fetchAllUsers, requestSkillSwap } from '../api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import debounce from 'lodash.debounce';
import { getAuth } from "firebase/auth";


const SkillList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSkills, setSelectedSkills] = useState({});
  const [isRequesting, setIsRequesting] = useState({});
  const [pendingRequests, setPendingRequests] = useState({});
  const usersPerPage = 6;

  useEffect(() => {
    const getUsers = async () => {
      try {
        const users = await fetchAllUsers();
        if (Array.isArray(users)) {
          setUsers(users);
          setFilteredUsers(users);
        } else {
          setError('Invalid data format received from the server.');
        }
      } catch (error) {
        console.error('Error fetching users:', error);
        setError('Failed to fetch users. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    getUsers();
  }, []);

  useEffect(() => {
    const filtered = users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.skillsOffered?.join(' ').toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.skillsWanted?.join(' ').toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredUsers(filtered);
    setCurrentPage(1);
  }, [searchQuery, users]);

  const handleSkillSelect = (userId, skill) => {
    setSelectedSkills((prev) => ({
      ...prev,
      [userId]: skill,
    }));
  };

  const handleSkillSwap = async (targetUserId, skillName) => {
    if (!skillName) {
      toast.error('Please select a skill to request');
      return;
    }
  
    const auth = getAuth();
    const currentUser = auth.currentUser;
  
    if (!currentUser) {
      toast.error('Please log in to request a skill swap');
      return;
    }
  
    if (targetUserId === currentUser.uid) {
      toast.warning('You cannot request a skill swap with yourself');
      return;
    }
  
    try {
      setIsRequesting(prev => ({ ...prev, [targetUserId]: true }));
      
      const { error, isDuplicate } = await requestSkillSwap(targetUserId, skillName);
      
      if (error) {
        toast.error(error, {
          className: isDuplicate ? 'duplicate-request' : '',
          autoClose: isDuplicate ? 5000 : 3000
        });
        return;
      }
  
      toast.success('Skill swap request sent successfully!');
      setSelectedSkills(prev => ({ ...prev, [targetUserId]: null }));
  
    } catch (error) {
      console.warn('Skill swap error:', error);
      toast.error('An unexpected error occurred');
    } finally {
      setIsRequesting(prev => ({ ...prev, [targetUserId]: false }));
    }
  };

  // Debounce the skill swap handler
  const debouncedSkillSwap = useMemo(
    () => debounce(handleSkillSwap, 500),
    []
  );

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-cyan-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900">
        <div className="text-red-400 text-xl font-semibold bg-gray-800/80 p-6 rounded-xl backdrop-blur-md">
          {error}
        </div>
      </div>
    );
  }

  if (filteredUsers.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900">
        <div className="text-gray-400 text-xl font-semibold bg-gray-800/80 p-6 rounded-xl backdrop-blur-md">
          No matching users found
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-8 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute -top-40 -left-40 w-80 h-80 rounded-full bg-cyan-500/10 blur-3xl animate-pulse-slow"></div>
      <div className="absolute -bottom-20 -right-20 w-60 h-60 rounded-full bg-purple-500/10 blur-3xl animate-pulse-slow delay-1000"></div>

      {/* Header */}
      <div className="relative z-10 text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600 mb-4">
          Skill Exchange Network
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Connect with talented individuals and exchange skills in our futuristic platform
        </p>
      </div>

      {/* Search Bar */}
      <div className="flex justify-center mb-12 relative z-10">
        <div className="relative w-full max-w-2xl">
          <input
            type="text"
            placeholder="Search by name or skill..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-6 py-3 rounded-xl bg-gray-800/70 backdrop-blur-md border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/30 transition-all duration-300"
          />
          <div className="absolute right-3 top-3 text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Skill List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
        {currentUsers.map((user) => (
          <div
            key={user._id}
            className="bg-gray-800/70 backdrop-blur-lg p-6 rounded-2xl shadow-xl border border-gray-700 hover:border-cyan-400/30 transition-all duration-300 transform hover:scale-[1.02]"
          >
            <div className="flex items-center space-x-4 mb-6">
              <div className="relative">
                <img
                  src={user.profilePic || "https://via.placeholder.com/150"}
                  alt={user.name}
                  className="w-14 h-14 rounded-full border-2 border-cyan-400/50"
                />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-800"></div>
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">{user.name}</h2>
                <p className="text-gray-400 text-sm">{user.email}</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-cyan-400 font-medium mb-2 flex items-center">
                  <span className="w-2 h-2 bg-cyan-400 rounded-full mr-2"></span>
                  Skills Offered
                </h3>
                <div className="flex flex-wrap gap-2">
                  {user.skillsOffered?.length ? (
                    user.skillsOffered.map((skill, index) => (
                      <span
                        key={index}
                        className={`text-sm px-3 py-1 rounded-full cursor-pointer transition-all duration-300 ${
                          selectedSkills[user.firebaseUID] === skill
                            ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white'
                            : 'bg-gray-700 text-cyan-400 hover:bg-gray-600'
                        }`}
                        onClick={() => handleSkillSelect(user.firebaseUID, skill)}
                      >
                        {skill}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-500 text-sm">No skills offered</span>
                  )}
                </div>
              </div>
              
              <div>
                <h3 className="text-purple-400 font-medium mb-2 flex items-center">
                  <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                  Skills Wanted
                </h3>
                <div className="flex flex-wrap gap-2">
                  {user.skillsWanted?.length ? (
                    user.skillsWanted.map((skill, index) => (
                      <span
                        key={index}
                        className="text-sm px-3 py-1 rounded-full bg-gray-700 text-purple-400"
                      >
                        {skill}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-500 text-sm">No skills wanted</span>
                  )}
                </div>
              </div>
            </div>
            
            <button
              className={`w-full mt-6 bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-4 py-3 rounded-xl hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 ${
                !selectedSkills[user.firebaseUID] || isRequesting[user.firebaseUID] 
                  ? 'opacity-50 cursor-not-allowed' 
                  : ''
              }`}
              onClick={() => debouncedSkillSwap(user.firebaseUID, selectedSkills[user.firebaseUID])}
              disabled={!selectedSkills[user.firebaseUID] || isRequesting[user.firebaseUID]}
            >
              {isRequesting[user.firebaseUID] ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                'Initiate Skill Swap'
              )}
            </button>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-12 relative z-10">
        <div className="flex space-x-2 bg-gray-800/70 backdrop-blur-md p-2 rounded-xl border border-gray-700">
          {Array.from({ length: Math.ceil(filteredUsers.length / usersPerPage) }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => paginate(index + 1)}
              className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 ${
                currentPage === index + 1
                  ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white'
                  : 'bg-gray-700 text-gray-400 hover:bg-gray-600 hover:text-white'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillList;