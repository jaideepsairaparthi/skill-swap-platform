import React, { useCallback,useRef } from 'react';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Particles from "@tsparticles/react";
import { loadAll } from "@tsparticles/all";

const testimonials = [
  {
    text: "SkillSwap's neural matching connected me with the perfect coding mentor. I went from beginner to job-ready in 3 months! The virtual pair programming sessions were game-changing.",
    initials: "JD",
    name: "John D.",
    role: "Software Developer",
    borderColor: "border-cyan-400/30 hover:border-cyan-400/50",
    glowColor: "bg-cyan-500/20",
    avatarGradient: "bg-gradient-to-r from-cyan-500 to-purple-600",
    roleColor: "text-cyan-400"
  },
  {
    text: "The AR teaching environment is revolutionary. I can demonstrate design techniques as if we're in the same room! My students learn 3x faster with the immersive tools.",
    initials: "SM",
    name: "Sarah M.",
    role: "UX Designer",
    borderColor: "border-purple-400/30 hover:border-purple-400/50",
    glowColor: "bg-purple-500/20",
    avatarGradient: "bg-gradient-to-r from-purple-500 to-pink-600",
    roleColor: "text-purple-400"
  },
  {
    text: "Earning crypto while teaching my language skills? This is the future of education and income! I've built a global student base and doubled my teaching income.",
    initials: "AK",
    name: "Aisha K.",
    role: "Language Tutor",
    borderColor: "border-pink-400/30 hover:border-pink-400/50",
    glowColor: "bg-pink-500/20",
    avatarGradient: "bg-gradient-to-r from-pink-500 to-cyan-600",
    roleColor: "text-pink-400"
  }
];

const LandingPage = () => {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const particlesInit = useCallback(async (engine) => {
    await loadAll(engine); // Loads all plugins/particles
  }, []);

  return (
    <div className="bg-gray-900 overflow-hidden">
      {/* Futuristic particles background */}
      <div className="fixed inset-0 z-0 opacity-30">
        <Particles
          id="tsparticles"
          init={particlesInit}
          options={{
            fullScreen: { enable: false },
            particles: {
              number: { value: 80 },
              color: { value: ["#00FFFF", "#FF00FF", "#00FFAA"] },
              shape: { type: "circle" },
              opacity: { value: 0.5, random: true },
              size: { value: 3, random: true },
              move: {
                enable: true,
                speed: 2,
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

      {/* Section 1: Hero Section */}
      <section 
        ref={heroRef}
        className="min-h-screen flex items-center justify-center text-center p-8 relative z-10"
      >
        <div className="max-w-5xl">

          {/* Floating elements */}
          <div className="absolute top-1/4 left-1/4 w-8 h-8 rounded-full bg-cyan-500 blur-xl opacity-20 floating-1"></div>
          <div className="absolute bottom-1/3 right-1/4 w-12 h-12 rounded-full bg-purple-500 blur-xl opacity-20 floating-2"></div>
          <div className="absolute top-1/3 right-1/3 w-6 h-6 rounded-full bg-pink-500 blur-xl opacity-20 floating-1"></div>

          <h1 
            ref={titleRef}
            className="text-6xl md:text-8xl font-bold text-white mb-6"
          >
            Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600">SkillSwap</span>
          </h1>
          <p className="text-2xl text-gray-300 mb-12 hero-subtitle">
            The future of <span className="text-cyan-400">skill exchange</span> is here. <br />
            Connect, learn, and grow in our <span className="text-purple-400">metaverse</span> of knowledge.
          </p>
          <div className="flex justify-center items-center gap-6 hero-cta mt-6 flex-wrap">
          {/* Get Started Button */}
          <Link
            to="/register"
            className="relative inline-flex items-center justify-center px-8 py-4 font-bold text-white rounded-xl overflow-hidden group transition-all duration-300 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-purple-600 hover:to-cyan-500 shadow-md hover:shadow-purple-500/40"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></span>
            <span className="relative z-10">Get Started</span>
          </Link>

          {/* Login Button */}
          <Link
            to="/login"
            className="relative inline-flex items-center justify-center px-8 py-4 font-bold text-cyan-400 border-2 border-cyan-400 rounded-xl overflow-hidden group transition-all duration-300 hover:text-white hover:bg-cyan-400/10 hover:shadow-md hover:shadow-cyan-400/30"
          >
            <span className="absolute inset-0 bg-cyan-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></span>
            <span className="relative z-10">Login</span>
          </Link>
        </div>

        </div>

        {/* Animated grid background */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gray-900"></div>
        </div>
      </section>

      {/* Section 2: What is SkillSwap? */}
      <section className="section py-20 relative z-10">
        <div className="max-w-6xl mx-auto px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <h2 className="text-4xl font-bold text-white mb-8">
                What is <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600">SkillSwap</span>?
              </h2>
              <p className="text-xl text-gray-300 mb-6">
                SkillSwap is a revolutionary platform that leverages blockchain and AI to create a decentralized skill exchange ecosystem.
              </p>
              <p className="text-xl text-gray-300 mb-6">
                Our neural matching algorithm connects you with the perfect skill partners across the globe in real-time.
              </p>
              <div className="flex space-x-4">
                <div className="p-4 bg-gray-800/50 backdrop-blur-md rounded-xl border border-gray-700">
                  <h3 className="text-cyan-400 font-bold mb-2">AI-Powered</h3>
                  <p className="text-gray-300">Smart matching using machine learning</p>
                </div>
                <div className="p-4 bg-gray-800/50 backdrop-blur-md rounded-xl border border-gray-700">
                  <h3 className="text-purple-400 font-bold mb-2">Decentralized</h3>
                  <p className="text-gray-300">Powered by blockchain technology</p>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 relative">
              <div className="relative aspect-video bg-gradient-to-br from-cyan-900/30 to-purple-900/30 rounded-2xl overflow-hidden border border-cyan-400/30">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 rounded-full bg-cyan-500/10 border-2 border-cyan-400/30 animate-pulse"></div>
                </div>
                <div className="absolute top-1/4 left-1/4 w-16 h-16 rounded-full bg-purple-500/10 border-2 border-purple-400/30 animate-pulse delay-300"></div>
                <div className="absolute bottom-1/4 right-1/4 w-20 h-20 rounded-full bg-cyan-500/10 border-2 border-cyan-400/30 animate-pulse delay-700"></div>
              </div>
              <div className="absolute -top-4 -left-4 w-full h-full border-2 border-cyan-400/20 rounded-2xl -z-10"></div>
              <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-purple-400/20 rounded-2xl -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: How It Works */}
      <section className="section py-20 bg-gradient-to-br from-gray-900 to-gray-800 relative z-10">
        <div className="max-w-6xl mx-auto px-8">
          <h2 className="text-4xl font-bold text-center text-white mb-16">
            How It <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600">Works</span>
          </h2>
          
          <div className="relative">
            {/* Timeline */}
            <div className="hidden lg:block absolute left-1/2 h-full w-1 bg-gradient-to-b from-cyan-500 to-purple-600 -ml-px"></div>
            
            <div className="space-y-16 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-8">
              {/* Step 1 */}
              <div className="feature-card relative lg:mt-0">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 lg:left-auto lg:right-0 lg:translate-x-1/2 w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center z-10">
                  <span className="text-gray-900 font-bold">1</span>
                </div>
                <div className="p-8 bg-gray-800/50 backdrop-blur-md rounded-2xl border border-gray-700 hover:border-cyan-400/50 transition-all duration-300 h-full">
                  <h3 className="text-2xl font-bold text-cyan-400 mb-4">Create Your Profile</h3>
                  <p className="text-gray-300">
                    Set up your digital identity with skills you offer and want to learn. Our AI analyzes your profile for optimal matches.
                  </p>
                </div>
              </div>
              
              {/* Step 2 */}
              <div className="feature-card relative lg:mt-32">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 lg:left-auto lg:right-0 lg:translate-x-1/2 w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center z-10">
                  <span className="text-gray-900 font-bold">2</span>
                </div>
                <div className="p-8 bg-gray-800/50 backdrop-blur-md rounded-2xl border border-gray-700 hover:border-purple-400/50 transition-all duration-300 h-full">
                  <h3 className="text-2xl font-bold text-purple-400 mb-4">Find Perfect Matches</h3>
                  <p className="text-gray-300">
                    Our neural network connects you with ideal partners based on skills, learning styles, and availability.
                  </p>
                </div>
              </div>
              
              {/* Step 3 */}
              <div className="feature-card relative lg:mt-0">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 lg:left-auto lg:right-0 lg:translate-x-1/2 w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center z-10">
                  <span className="text-gray-900 font-bold">3</span>
                </div>
                <div className="p-8 bg-gray-800/50 backdrop-blur-md rounded-2xl border border-gray-700 hover:border-pink-400/50 transition-all duration-300 h-full">
                  <h3 className="text-2xl font-bold text-pink-400 mb-4">Start Swapping</h3>
                  <p className="text-gray-300">
                    Engage in our immersive virtual exchange spaces with AR/VR capabilities for realistic skill transfer.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Features */}
      <section className="section py-20 relative z-10">
        <div className="max-w-6xl mx-auto px-8">
          <h2 className="text-4xl font-bold text-center text-white mb-16">
            Why <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600">SkillSwap</span> Stands Out
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="feature-card p-8 bg-gray-800/50 backdrop-blur-md rounded-2xl border border-gray-700 hover:border-cyan-400/50 transition-all duration-300 group">
              <div className="w-16 h-16 bg-cyan-900/30 rounded-xl mb-6 flex items-center justify-center group-hover:bg-cyan-500/20 transition-all duration-300">
                <div className="text-3xl text-cyan-400">⚡</div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Lightning Fast</h3>
              <p className="text-gray-300">
                Our quantum-inspired algorithms deliver matches in milliseconds.
              </p>
            </div>
            
            <div className="feature-card p-8 bg-gray-800/50 backdrop-blur-md rounded-2xl border border-gray-700 hover:border-purple-400/50 transition-all duration-300 group">
              <div className="w-16 h-16 bg-purple-900/30 rounded-xl mb-6 flex items-center justify-center group-hover:bg-purple-500/20 transition-all duration-300">
                <div className="text-3xl text-purple-400">🔒</div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Secure</h3>
              <p className="text-gray-300">
                Blockchain-verified identity and encrypted communications.
              </p>
            </div>
            
            <div className="feature-card p-8 bg-gray-800/50 backdrop-blur-md rounded-2xl border border-gray-700 hover:border-pink-400/50 transition-all duration-300 group">
              <div className="w-16 h-16 bg-pink-900/30 rounded-xl mb-6 flex items-center justify-center group-hover:bg-pink-500/20 transition-all duration-300">
                <div className="text-3xl text-pink-400">🌐</div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Global</h3>
              <p className="text-gray-300">
                Connect with experts across 150+ countries in real-time.
              </p>
            </div>
            
            <div className="feature-card p-8 bg-gray-800/50 backdrop-blur-md rounded-2xl border border-gray-700 hover:border-cyan-400/50 transition-all duration-300 group">
              <div className="w-16 h-16 bg-cyan-900/30 rounded-xl mb-6 flex items-center justify-center group-hover:bg-cyan-500/20 transition-all duration-300">
                <div className="text-3xl text-cyan-400">🧠</div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">AI Enhanced</h3>
              <p className="text-gray-300">
                Smart recommendations and personalized learning paths.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Testimonials */}
      <section className="section py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative z-10 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-8">

          {/* Background animation blobs */}
          <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-cyan-500/10 blur-3xl animate-pulse-slow"></div>
          <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-purple-500/10 blur-3xl animate-pulse-slow delay-1000"></div>

          {/* Heading */}
          <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-16 relative">
            <span className="relative inline-block">
              What Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600">Community</span> Says
              <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-full"></span>
            </span>
          </h2>

          {/* Carousel */}
          <div className="relative">
            <Carousel
              showArrows={true}
              infiniteLoop={true}
              showThumbs={false}
              showStatus={false}
              autoPlay={true}
              interval={8000}
              stopOnHover={true}
              swipeable={true}
              emulateTouch={true}
              renderArrowPrev={(clickHandler) => (
                <button
                  onClick={clickHandler}
                  aria-label="Previous testimonial"
                  className="absolute left-4 top-1/2 z-10 -translate-y-1/2 w-12 h-12 sm:w-14 sm:h-14 bg-gray-800/80 backdrop-blur-md rounded-full flex items-center justify-center border border-cyan-400/30 hover:bg-cyan-500/30 hover:border-cyan-400/50 transition-all duration-300 shadow-lg hover:shadow-cyan-400/20 group"
                >
                  <span className="text-cyan-400 text-xl sm:text-2xl group-hover:text-white transition-colors">❮</span>
                </button>
              )}
              renderArrowNext={(clickHandler) => (
                <button
                  onClick={clickHandler}
                  aria-label="Next testimonial"
                  className="absolute right-4 top-1/2 z-10 -translate-y-1/2 w-12 h-12 sm:w-14 sm:h-14 bg-gray-800/80 backdrop-blur-md rounded-full flex items-center justify-center border border-purple-400/30 hover:bg-purple-500/30 hover:border-purple-400/50 transition-all duration-300 shadow-lg hover:shadow-purple-400/20 group"
                >
                  <span className="text-purple-400 text-xl sm:text-2xl group-hover:text-white transition-colors">❯</span>
                </button>
              )}
              renderIndicator={(onClickHandler, isSelected, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={onClickHandler}
                  aria-label={`Testimonial ${index + 1}`}
                  className={`mx-1.5 w-3 h-3 rounded-full transition-all duration-300 ${isSelected ? 'bg-gradient-to-r from-cyan-400 to-purple-600 w-8' : 'bg-gray-600'}`}
                />
              )}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="px-4 sm:px-12 py-8">
                  <div className={`bg-gray-800/70 backdrop-blur-lg rounded-3xl p-8 border ${testimonial.borderColor} relative overflow-hidden transform transition-all duration-500 hover:scale-[1.02]`}>
                    
                    {/* Glowing background */}
                    <div className={`absolute -top-20 -right-20 w-40 h-40 rounded-full ${testimonial.glowColor} blur-3xl opacity-70`}></div>
                    
                    {/* Quote icon */}
                    <div className="absolute top-6 left-6 text-5xl opacity-10 text-white">❝</div>
                    
                    {/* Testimonial text */}
                    <p className="text-lg md:text-xl italic text-gray-300 relative z-10 pl-8 leading-relaxed text-center">
                      {testimonial.text}
                    </p>

                    {/* Centered author info */}
                    <div className="mt-8 flex flex-col items-center text-center">
                      <div className={`w-16 h-16 rounded-full ${testimonial.avatarGradient} flex items-center justify-center mb-4 shadow-md`}>
                        <span className="text-white font-bold text-lg">{testimonial.initials}</span>
                      </div>
                      <div>
                        <p className="font-bold text-white text-lg">{testimonial.name}</p>
                        <p className={`${testimonial.roleColor} text-sm font-medium`}>{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Carousel>
          </div>
        </div>
      </section>


      {/* Section 6: Call to Action */}
      <section className="section py-32 relative z-10 overflow-hidden">
        <div className="max-w-4xl mx-auto text-center px-8 relative">
          <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-cyan-500/10 blur-3xl glow"></div>
          <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-purple-500/10 blur-3xl glow"></div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 relative z-10">
            Ready to Join the <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600">Future</span> of Learning?
          </h2>
          <p className="text-xl text-gray-300 mb-12 relative z-10">
            Be part of the revolution. 50,000+ knowledge seekers are already swapping skills on our platform.
          </p>

          {/* Buttons */}
          <div className="flex justify-center space-x-8 relative z-10">
            <Link
              to="/register"
              className="relative overflow-hidden bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-8 py-4 rounded-xl font-bold hover:shadow-xl hover:shadow-cyan-500/40 transition-all duration-300 group"
            >
              <span className="relative z-10">Start Now</span>
              <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </Link>

            <Link
              to="/about"
              className="relative overflow-hidden border-2 border-cyan-400 text-cyan-400 px-8 py-4 rounded-xl font-bold hover:bg-cyan-400/10 hover:shadow-xl hover:shadow-cyan-400/30 transition-all duration-300 group"
            >
              <span className="relative z-10">Learn More</span>
              <span className="absolute inset-0 bg-cyan-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </Link>
          </div>
        </div>

        {/* Animated floating elements */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute top-1/4 left-1/6 w-6 h-6 rounded-full bg-cyan-400/20 floating-1"></div>
          <div className="absolute top-3/4 right-1/5 w-8 h-8 rounded-full bg-purple-400/20 floating-2"></div>
          <div className="absolute bottom-1/3 left-1/3 w-4 h-4 rounded-full bg-pink-400/20 floating-1"></div>
        </div>
      </section>


      {/* Footer */}
      <footer className="py-12 border-t border-gray-800 relative z-10">
        <div className="max-w-6xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold text-white mb-4">SkillSwap</h3>
              <p className="text-gray-400">
                The next-generation platform for decentralized skill exchange.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Explore</h4>
              <ul className="space-y-2">
                <li><Link to="/features" className="text-gray-400 hover:text-cyan-400 transition-colors">Features</Link></li>
                <li><Link to="/community" className="text-gray-400 hover:text-cyan-400 transition-colors">Community</Link></li>
                <li><Link to="/pricing" className="text-gray-400 hover:text-cyan-400 transition-colors">Pricing</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2">
                <li><Link to="/about" className="text-gray-400 hover:text-purple-400 transition-colors">About</Link></li>
                <li><Link to="/careers" className="text-gray-400 hover:text-purple-400 transition-colors">Careers</Link></li>
                <li><Link to="/blog" className="text-gray-400 hover:text-purple-400 transition-colors">Blog</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Connect</h4>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-cyan-500/20 hover:text-cyan-400 transition-all">
                  <span className="sr-only">Twitter</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-purple-500/20 hover:text-purple-400 transition-all">
                  <span className="sr-only">GitHub</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-pink-500/20 hover:text-pink-400 transition-all">
                  <span className="sr-only">Discord</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} SkillSwap. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;