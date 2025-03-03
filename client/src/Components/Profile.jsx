import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { fetchUserById, createOrUpdateUser } from '../api';

const Profile = () => {
  const { currentUser } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [skillsOffered, setSkillsOffered] = useState('');
  const [skillsWanted, setSkillsWanted] = useState('');

  useEffect(() => {
    console.log('Current User UID:', currentUser.uid); // Log the UID
    const getUser = async () => {
      try {
        const user = await fetchUserById(currentUser.uid);
        if (user.error) {
          console.error('Error fetching user:', user.error);
          return;
        }
        setName(user.name || '');
        setEmail(user.email || '');
        setSkillsOffered(user.skillsOffered?.join(', ') || ''); // Populate skillsOffered
        setSkillsWanted(user.skillsWanted?.join(', ') || ''); // Populate skillsWanted
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };
    getUser();
  }, [currentUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the user data
    const userData = {
      firebaseUID: currentUser.uid, // Include the Firebase UID
      name,
      email,
      skillsOffered: skillsOffered.split(',').map(skill => skill.trim()), // Convert to array
      skillsWanted: skillsWanted.split(',').map(skill => skill.trim()), // Convert to array
    };

    try {
      const response = await createOrUpdateUser(userData);
      console.log('Profile updated successfully:', response);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold mb-6">Profile</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        {/* Name Field */}
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

        {/* Email Field */}
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

        {/* Skills Offered Field */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Skills Offered (comma-separated)</label>
          <input
            type="text"
            value={skillsOffered}
            onChange={(e) => setSkillsOffered(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="e.g., JavaScript, React"
          />
        </div>

        {/* Skills Wanted Field */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Skills Wanted (comma-separated)</label>
          <input
            type="text"
            value={skillsWanted}
            onChange={(e) => setSkillsWanted(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="e.g., Node.js, MongoDB"
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default Profile;