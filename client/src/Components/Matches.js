import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { fetchMatches, updateMatchStatus } from '../api';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Matches = () => {
  const { currentUser } = useAuth();
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserMatches = async () => {
      try {
        const matches = await fetchMatches(currentUser.uid);
        if (matches.error) {
          console.error('Error fetching matches:', matches.error);
          return;
        }
        setMatches(matches);
      } catch (error) {
        console.error('Error fetching matches:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserMatches();
  }, [currentUser]);

  const handleUpdateStatus = async (matchId, status) => {
    try {
      const response = await updateMatchStatus(matchId, status);
      console.log('Match status updated successfully:', response);
      toast.success('Match status updated successfully!');

      // Refresh matches
      const updatedMatches = await fetchMatches(currentUser.uid);
      setMatches(updatedMatches);
    } catch (error) {
      console.error('Error updating match status:', error);
      toast.error('Failed to update match status. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Matches</h2>

      {/* Matches List */}
      <div className="space-y-6">
        {matches.map((match) => (
          <div key={match._id} className="border-b border-gray-200 pb-4">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{match.userA === currentUser.uid ? match.userBName : match.userAName}</h3>
                <p className="text-sm text-gray-600">Skill Exchanged: {match.skillExchanged}</p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  match.status === 'pending'
                    ? 'bg-yellow-100 text-yellow-800'
                    : match.status === 'accepted'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-blue-100 text-blue-800'
                }`}
              >
                {match.status}
              </span>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => handleUpdateStatus(match._id, 'accepted')}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-all"
              >
                Accept
              </button>
              <button
                onClick={() => handleUpdateStatus(match._id, 'completed')}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all"
              >
                Complete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default Matches;