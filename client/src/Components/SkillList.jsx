import React, { useEffect, useState } from 'react';
import { fetchAllUsers } from '../api';

const SkillList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      const data = await fetchAllUsers();
      setUsers(data);
    };
    getUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold mb-6">Skill List</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map((user) => (
          <div key={user._id} className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold">{user.name}</h2>
            <p className="text-gray-600">{user.email}</p>
            <p className="mt-2">Skills: {user.skills?.join(', ')}</p>
            <button className="mt-4 bg-blue-500 text-white p-2 rounded">
              Request Skill Swap
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillList;