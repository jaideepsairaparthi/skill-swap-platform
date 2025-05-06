import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { fetchUserById, addReview } from '../api';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import StarRating from './StarRating';
import { format } from 'date-fns';
import Particles from "@tsparticles/react";
import { loadAll } from "@tsparticles/all";

const Reviews = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('newest');
  const [filterRating, setFilterRating] = useState(0);

  const particlesInit = useCallback(async (engine) => {
    await loadAll(engine);
  }, []);

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
      return;
    }

    const fetchReviews = async () => {
      if (!userId) {
        console.error('User ID is required.');
        return;
      }

      try {
        setLoading(true);
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
        toast.error('Failed to load reviews');
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, [userId, currentUser, navigate]);

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
        reviewerPhoto: currentUser.photoURL || 'https://avatars.dicebear.com/api/identicon/default.svg',
        createdAt: new Date().toISOString(),
      };

      const response = await addReview(reviewData);
      toast.success('Review added successfully!', {
        autoClose: 2000,
        onClose: async () => {
          const user = await fetchUserById(userId);
          setReviews(user.reviews || []);
          setReviewText('');
          setRating(0);
        }
      });
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
      <div className="fixed inset-0 flex items-center justify-center bg-gray-900/90 z-50">
        <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 overflow-hidden relative">
      {/* Futuristic particles background */}
      <div className="fixed inset-0 z-0 opacity-30">
        <Particles
          id="tsparticles-reviews"
          init={particlesInit}
          options={{
            fullScreen: { enable: false },
            particles: {
              number: { value: 50 },
              color: { value: ["#00FFFF", "#FF00FF", "#00FFAA"] },
              shape: { type: "circle" },
              opacity: { value: 0.5, random: true },
              size: { value: 3, random: true },
              move: {
                enable: true,
                speed: 1.5,
                direction: "none",
                random: true,
                straight: false,
                out_mode: "out",
                bounce: false,
                attract: { enable: false, rotateX: 600, rotateY: 1200 }
              }
            },
            interactivity: {
              detect_on: "canvas",
              events: {
                onhover: { enable: true, mode: "repulse" },
                onclick: { enable: true, mode: "push" },
                resize: true
              },
              modes: {
                repulse: { distance: 100, duration: 0.4 },
                push: { particles_nb: 4 }
              }
            },
            retina_detect: true
          }}
        />
      </div>

      {/* Floating elements */}
      <div className="absolute top-1/4 left-1/4 w-8 h-8 rounded-full bg-cyan-500 blur-xl opacity-20 animate-float1"></div>
      <div className="absolute bottom-1/3 right-1/4 w-12 h-12 rounded-full bg-purple-500 blur-xl opacity-20 animate-float2"></div>
      <div className="absolute top-1/3 right-1/3 w-6 h-6 rounded-full bg-pink-500 blur-xl opacity-20 animate-float3"></div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
        <div className="w-full max-w-4xl">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-white mb-2">
              User <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600">Reviews</span>
            </h1>
            <p className="text-gray-300">
              Share your experience and read others'
            </p>
          </div>

          {/* Review Form */}
          <div className="bg-gray-800/70 backdrop-blur-lg rounded-2xl border border-cyan-400/30 p-8 shadow-xl hover:shadow-cyan-400/20 transition-all duration-500 mb-10">
            <form onSubmit={handleSubmitReview}>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-3">Your Review</label>
                <textarea
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent transition-all resize-none text-gray-200"
                  placeholder="Write your review..."
                  rows="4"
                  required
                />
              </div>

              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-300 mb-3">Rating</label>
                <StarRating 
                  rating={rating} 
                  onRatingChange={setRating} 
                  starClassName="w-8 h-8"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-cyan-600 to-purple-600 text-white px-4 py-3 rounded-lg font-semibold hover:from-cyan-500 hover:to-purple-500 transition-all duration-300"
              >
                Submit Review
              </button>
            </form>
          </div>

          {/* Sorting and Filtering */}
          <div className="bg-gray-800/70 backdrop-blur-lg rounded-2xl border border-purple-400/30 p-6 shadow-xl mb-10">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="w-full md:w-auto">
                <label className="block text-sm font-medium text-gray-300 mb-2">Sort by:</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-gray-200"
                >
                  <option value="newest">Newest</option>
                  <option value="highest">Highest Rating</option>
                  <option value="lowest">Lowest Rating</option>
                </select>
              </div>
              <div className="w-full md:w-auto">
                <label className="block text-sm font-medium text-gray-300 mb-2">Filter by rating:</label>
                <select
                  value={filterRating}
                  onChange={(e) => setFilterRating(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-gray-200"
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
            {sortedAndFilteredReviews.length === 0 ? (
              <div className="bg-gray-800/70 backdrop-blur-lg rounded-2xl border border-pink-400/30 p-8 text-center">
                <div className="text-pink-400 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <h3 className="text-xl text-gray-200 mb-2">No reviews yet</h3>
                <p className="text-gray-400">Be the first to leave a review!</p>
              </div>
            ) : (
              sortedAndFilteredReviews.map((review, index) => (
                <div
                  key={index}
                  className="bg-gray-800/70 backdrop-blur-lg rounded-2xl border border-gray-600/30 p-6 shadow-xl transition-all duration-300 hover:border-cyan-400/30 hover:shadow-cyan-400/20"
                >
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="relative">
                      <img
                        src={review.reviewerPhoto}
                        alt={review.reviewerName}
                        className="w-12 h-12 rounded-full border-2 border-cyan-400/30"
                      />
                      <div className="absolute inset-0 rounded-full border-2 border-transparent hover:border-cyan-400/50 transition-all duration-300 pointer-events-none"></div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{review.reviewerName}</h3>
                      <p className="text-sm text-gray-400">
                        {format(new Date(review.createdAt), 'MMMM dd, yyyy')}
                      </p>
                    </div>
                  </div>
                  <div className="text-gray-300">
                    <p className="mb-3">{review.review}</p>
                    <div className="flex items-center">
                      <span className="text-yellow-400 text-xl">{"★".repeat(review.rating)}</span>
                      <span className="text-gray-500 text-xl">{"★".repeat(5 - review.rating)}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        pauseOnHover
        draggable
        theme="dark"
        toastClassName="bg-gray-800/90 backdrop-blur-sm border border-gray-700"
        progressClassName="bg-gradient-to-r from-cyan-500 to-purple-600"
      />

      {/* Animation styles */}
      <style>{`
        @keyframes float1 {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-20px) translateX(10px); }
        }
        @keyframes float2 {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(15px) translateX(-15px); }
        }
        @keyframes float3 {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-10px) translateX(-10px); }
        }
        .animate-float1 { animation: float1 8s ease-in-out infinite; }
        .animate-float2 { animation: float2 10s ease-in-out infinite; }
        .animate-float3 { animation: float3 12s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default Reviews;