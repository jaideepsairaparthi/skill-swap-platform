import React, { useEffect, useState } from 'react';
import { fetchAllUsers, requestSkillSwap } from '../api';

const SkillList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(6); // 6 users per page

  useEffect(() => {
    const getUsers = async () => {
      try {
        const users = await fetchAllUsers();
        console.log('Users:', users); // Log the users for debugging
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
    setCurrentPage(1); // Reset to first page after search
  }, [searchQuery, users]);

  const handleSkillSwap = async (targetUserId, skillName) => {
    if (!targetUserId || !skillName) {
      console.error("Invalid skill swap request: Missing data", { targetUserId, skillName });
      return alert("Invalid request: Please select a skill and user.");
    }
  
    console.log("Requesting skill swap with:", { targetUserId, skillName });
  
    try {
      const response = await requestSkillSwap(targetUserId, skillName);
      if (response.error) {
        console.error("Error in skill swap request:", response.error);
        return alert(`Failed: ${response.error}`);
      }
  
      console.log("Skill swap request successful:", response);
      alert("Skill swap request sent successfully!");
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  };
  

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="text-red-500 text-lg font-semibold">{error}</div>
      </div>
    );
  }

  if (filteredUsers.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="text-gray-600 text-lg font-semibold">No users found.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-8">
      <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">Skill List</h1>

      {/* Search Bar */}
      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Search by name or skill..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full max-w-md px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Skill List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentUsers.map((user) => (
          <div
            key={user._id}
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:scale-105"
          >
            <div className="flex items-center space-x-4 mb-4">
              <img
                src={user.profilePic || "https://via.placeholder.com/150"} // Use profilePic or default
                alt={user.name}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
                <p className="text-gray-600">{user.email}</p>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-gray-700">
                <span className="font-semibold">Skills Offered:</span>{' '}
                {user.skillsOffered?.map((skill, index) => (
                  <span
                    key={index}
                    className="inline-block bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded-full mr-2 mb-2"
                  >
                    {skill}
                  </span>
                ))}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Skills Wanted:</span>{' '}
                {user.skillsWanted?.map((skill, index) => (
                  <span
                    key={index}
                    className="inline-block bg-purple-100 text-purple-800 text-sm px-2 py-1 rounded-full mr-2 mb-2"
                  >
                    {skill}
                  </span>
                ))}
              </p>
            </div>
            <button
              className="w-full mt-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
              onClick={() => handleSkillSwap(user.firebaseUID, user.skillsOffered[0])} // Pass skillName
            >
              Request Skill Swap
            </button>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8">
        {Array.from({ length: Math.ceil(filteredUsers.length / usersPerPage) }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={`mx-1 px-4 py-2 rounded-lg ${
              currentPage === index + 1
                ? 'bg-indigo-500 text-white'
                : 'bg-white text-indigo-500 hover:bg-indigo-100'
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SkillList;