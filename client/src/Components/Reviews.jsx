import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { fetchUserById, addReview } from '../api';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import StarRating from './StarRating';
import { format } from 'date-fns';

const Reviews = () => {
  const { userId } = useParams();
  const { currentUser } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('newest');
  const [filterRating, setFilterRating] = useState(0);

  useEffect(() => {
    const fetchReviews = async () => {
      if (!userId) {
        console.error('User ID is required.');
        return;
      }

      try {
        const user = await fetchUserById(userId);
        if (!user) {
          console.error('User not found.');
          return;
        }
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

    if (!reviewText || rating === 0) {
      toast.error('Please fill in all fields.');
      return;
    }

    try {
      const reviewData = {
        reviewer: currentUser.uid,
        reviewee: userId,
        review: reviewText,
        rating: rating,
        reviewerName: currentUser.displayName || 'Anonymous',
        reviewerPhoto: currentUser.photoURL || 'https://via.placeholder.com/50',
        createdAt: new Date().toISOString(),
      };

      const response = await addReview(reviewData);
      console.log('Review added successfully:', response);
      toast.success('Review added successfully!');

      // Refresh reviews
      const user = await fetchUserById(userId);
      setReviews(user.reviews || []);
      setReviewText('');
      setRating(0);
    } catch (error) {
      console.error('Error adding review:', error);
      toast.error('Failed to add review. Please try again.');
    }
  };

  const sortedAndFilteredReviews = reviews
    .filter((review) => review.rating >= filterRating)
    .sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else if (sortBy === 'highest') {
        return b.rating - a.rating;
      } else {
        return a.rating - b.rating;
      }
    });

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Reviews</h2>

        {/* Review Form */}
        <div className="bg-white p-8 rounded-xl shadow-lg mb-8">
          <form onSubmit={handleSubmitReview}>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Your Review</label>
              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none"
                placeholder="Write your review..."
                rows="4"
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
              <StarRating rating={rating} onRatingChange={setRating} />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
            >
              Submit Review
            </button>
          </form>
        </div>

        {/* Sorting and Filtering */}
        <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div>
              <label className="text-sm font-medium text-gray-700 mr-2">Sort by:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="newest">Newest</option>
                <option value="highest">Highest Rating</option>
                <option value="lowest">Lowest Rating</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mr-2">Filter by rating:</label>
              <select
                value={filterRating}
                onChange={(e) => setFilterRating(Number(e.target.value))}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value={0}>All</option>
                <option value={4}>4 stars & above</option>
                <option value={3}>3 stars & above</option>
                <option value={2}>2 stars & above</option>
                <option value={1}>1 star & above</option>
              </select>
            </div>
          </div>
        </div>

        {/* Reviews List */}
        <div className="space-y-6">
          {sortedAndFilteredReviews.map((review, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl"
            >
              <div className="flex items-center space-x-4 mb-4">
                <img
                  src={review.reviewerPhoto || 'https://via.placeholder.com/50'}
                  alt={review.reviewerName}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{review.reviewerName}</h3>
                  <p className="text-sm text-gray-600">
                    {format(new Date(review.createdAt), 'MMMM dd, yyyy')}
                  </p>
                </div>
              </div>
              <div className="text-gray-700">
                <p>{review.review}</p>
                <div className="flex items-center mt-3">
                  <span className="text-yellow-500">{"★".repeat(review.rating)}</span>
                  <span className="text-gray-400">{"★".repeat(5 - review.rating)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
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