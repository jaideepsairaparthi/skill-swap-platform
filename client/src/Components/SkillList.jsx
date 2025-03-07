import React, { useEffect, useState } from 'react';
import { fetchAllUsers, requestSkillSwap } from '../api';

const SkillList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const data = await fetchAllUsers();
        console.log('API Response:', data); // Log the response
        if (Array.isArray(data)) {
          setUsers(data);
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

// SkillList.jsx
const handleSkillSwap = async (targetUserId, skillId) => {
  try {
    console.log('Requesting skill swap with target user:', targetUserId); // Debug
    const response = await requestSkillSwap(targetUserId, skillId);
    console.log('Skill swap request successful:', response);
  } catch (error) {
    console.error('Error requesting skill swap:', error);
  }
};

  if (loading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-8 text-red-500">{error}</div>;
  }

  if (users.length === 0) {
    return <div className="text-center mt-8">No users found.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold mb-6">Skill List</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map((user) => (
          <div key={user._id} className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold">{user.name}</h2>
            <p className="text-gray-600">{user.email}</p>
            <p className="mt-2">Skills Offered: {user.skillsOffered?.join(', ')}</p>
            <p className="mt-2">Skills Wanted: {user.skillsWanted?.join(', ')}</p>
            <button
              className="mt-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
              onClick={() => handleSkillSwap(user._id, user.skillsOffered[0])} // Pass a skill ID
            >
              Request Skill Swap
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillList;