import React from 'react';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Import carousel styles

const LandingPage = () => {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Section 1: Hero Section */}
      <section className="min-h-screen flex items-center justify-center text-center p-8">
        <div className="max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 animate-fade-in">
            Welcome to <span className="text-indigo-600">SkillSwap</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 animate-fade-in">
            Connect, Learn, and Grow by Exchanging Skills with Others.
          </p>
          <div className="space-x-4 animate-fade-in">
            <Link
              to="/register"
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-all"
            >
              Get Started
            </Link>
            <Link
              to="/login"
              className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all"
            >
              Login
            </Link>
          </div>
        </div>
      </section>

      {/* Section 2: What is SkillSwap? */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8 animate-fade-in">
            What is <span className="text-indigo-600">SkillSwap</span>?
          </h2>
          <p className="text-xl text-gray-600 text-center max-w-2xl mx-auto animate-fade-in">
            SkillSwap is a platform where you can exchange your skills with others. Whether you're a
            developer, designer, writer, or anything in between, SkillSwap helps you connect with
            like-minded individuals to learn and grow together.
          </p>
        </div>
      </section>

      {/* Section 3: How It Works */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-6xl mx-auto px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8 animate-fade-in">
            How It <span className="text-indigo-600">Works</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 animate-fade-in">
              <h3 className="text-xl font-bold text-gray-900 mb-4">1. Sign Up</h3>
              <p className="text-gray-600">
                Create an account and list the skills you offer and the skills you want to learn.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 animate-fade-in">
              <h3 className="text-xl font-bold text-gray-900 mb-4">2. Find Matches</h3>
              <p className="text-gray-600">
                Discover users who have the skills you need and are interested in your skills.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 animate-fade-in">
              <h3 className="text-xl font-bold text-gray-900 mb-4">3. Start Swapping</h3>
              <p className="text-gray-600">
                Connect with others, schedule sessions, and start exchanging skills.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Why Choose SkillSwap? */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8 animate-fade-in">
            Why Choose <span className="text-indigo-600">SkillSwap</span>?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 animate-fade-in">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Learn New Skills</h3>
              <p className="text-gray-600">
                Expand your knowledge by learning from experts in various fields.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 animate-fade-in">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Teach Others</h3>
              <p className="text-gray-600">
                Share your expertise and help others achieve their goals.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 animate-fade-in">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Build Connections</h3>
              <p className="text-gray-600">
                Connect with like-minded individuals and grow your network.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 animate-fade-in">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Flexible Learning</h3>
              <p className="text-gray-600">
                Learn at your own pace and on your own schedule.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Testimonials Carousel */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-6xl mx-auto px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8 animate-fade-in">
            What Our <span className="text-indigo-600">Users</span> Say
          </h2>
          <Carousel
            showArrows={true}
            infiniteLoop={true}
            showThumbs={false}
            showStatus={false}
            autoPlay={true}
            interval={5000}
            className="animate-fade-in"
          >
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <p className="text-gray-600 italic">
                "SkillSwap helped me learn React in just a few weeks! The community is amazing."
              </p>
              <p className="text-gray-900 font-semibold mt-4">- John Doe</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <p className="text-gray-600 italic">
                "I love teaching others and learning new skills. SkillSwap is a game-changer!"
              </p>
              <p className="text-gray-900 font-semibold mt-4">- Jane Smith</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <p className="text-gray-600 italic">
                "The platform is easy to use, and I've made so many connections. Highly recommend!"
              </p>
              <p className="text-gray-900 font-semibold mt-4">- Alex Johnson</p>
            </div>
          </Carousel>
        </div>
      </section>

      {/* Section 6: Call to Action */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto text-center px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 animate-fade-in">
            Ready to Start <span className="text-indigo-600">Swapping Skills</span>?
          </h2>
          <p className="text-xl text-gray-600 mb-8 animate-fade-in">
            Join SkillSwap today and start your journey of learning and growth.
          </p>
          <div className="space-x-4 animate-fade-in">
            <Link
              to="/register"
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-all"
            >
              Get Started
            </Link>
            <Link
              to="/login"
              className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all"
            >
              Login
            </Link>
          </div>
        </div>
      </section>

      {/* Section 7: Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-6xl mx-auto px-8 text-center">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} SkillSwap. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;