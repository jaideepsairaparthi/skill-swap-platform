import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { fetchUserById, addReview } from '../api';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Reviews = ({ userId }) => {
  const { currentUser } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const user = await fetchUserById(userId);
        if (user.error) {
          console.error('Error fetching user:', user.error);
          return;
        }
        setReviews(user.reviews || []);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, [userId]);

  const handleSubmitReview = async (e) => {
    e.preventDefault();

    if (!reviewText || !rating) {
      toast.error('Please fill in all fields.');
      return;
    }

    try {
      const reviewData = {
        reviewer: currentUser.uid,
        reviewee: userId,
        review: reviewText,
        rating: parseInt(rating, 10),
      };

      const response = await addReview(reviewData);
      console.log('Review added successfully:', response);
      toast.success('Review added successfully!');

      // Refresh reviews
      const user = await fetchUserById(userId);
      setReviews(user.reviews || []);
    } catch (error) {
      console.error('Error adding review:', error);
      toast.error('Failed to add review. Please try again.');
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
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Reviews</h2>

      {/* Review Form */}
      <form onSubmit={handleSubmitReview} className="mb-8">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Your Review</label>
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            placeholder="Write your review..."
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Rating (1-5)</label>
          <input
            type="number"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            min="1"
            max="5"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
        >
          Submit Review
        </button>
      </form>

      {/* Reviews List */}
      <div className="space-y-6">
        {reviews.map((review, index) => (
          <div key={index} className="border-b border-gray-200 pb-4">
            <div className="flex items-center space-x-4 mb-2">
              <img
                src="https://via.placeholder.com/50" // Replace with reviewer's profile picture
                alt="Reviewer"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{review.reviewerName}</h3>
                <p className="text-sm text-gray-600">{new Date(review.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="text-gray-700">
              <p>{review.review}</p>
              <div className="flex items-center mt-2">
                <span className="text-yellow-500">{"★".repeat(review.rating)}</span>
                <span className="text-gray-400">{"★".repeat(5 - review.rating)}</span>
              </div>
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

export default Reviews;