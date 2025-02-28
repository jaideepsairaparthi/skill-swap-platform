import React, { useEffect, useState } from 'react';
import { fetchAllUsers, requestSkillSwap } from '../api';


const SkillList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const data = await fetchAllUsers();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };
    getUsers();
  }, []);

  const handleSkillSwap = async (userId, skillId) => {
    try {
      const response = await requestSkillSwap(userId, skillId);
      console.log("Skill swap request successful:", response);
      alert("Skill swap request sent successfully!");
    } catch (error) {
      console.error("Error requesting skill swap:", error);
      alert("Failed to send skill swap request.");
    }
  };

  if (loading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold mb-6">Skill List</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map((user) => (
          <div key={user._id} className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold">{user.name}</h2>
            <p className="text-gray-600">{user.email}</p>
            <p className="mt-2">Skills: {user.skills?.join(', ')}</p>
            <button
              className="mt-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
              onClick={() => handleSkillSwap(user._id)}
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