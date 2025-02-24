import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { fetchUserById, createOrUpdateUser } from '../api';

const Profile = () => {
  const { currentUser } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [skills, setSkills] = useState('');

  useEffect(() => {
    const getUser = async () => {
      const user = await fetchUserById(currentUser.uid);
      setName(user.name);
      setEmail(user.email);
      setSkills(user.skills?.join(', '));
    };
    getUser();
  }, [currentUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = { name, email, skills: skills.split(',') };
    await createOrUpdateUser(userData);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold mb-6">Profile</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Skills (comma-separated)</label>
          <input
            type="text"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default Profile;