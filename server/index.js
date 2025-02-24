const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const authenticate = require('./middlewares/auth'); // Import the middleware

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Database connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

// CORS
const allowedOrigins = [
  'http://localhost:5173',
  'https://skill-swap-platform-gp36u3nvj-jaideepsai.vercel.app',
  /\.vercel\.app$/ // Optional: Allows subdomains on Vercel
];

app.use(
  cors({
    origin: allowedOrigins,
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
  })
);

// Protect all /api routes
app.use('/api', authenticate, userRoutes);

// Routes
app.get('/', (req, res) => {
  res.send('Skill Swap Platform Backend');
});

// MongoDB Test Route
app.get('/test-mongo', async (req, res) => {
  try {
    const collections = await mongoose.connection.db.listCollections().toArray();
    res.json({
      message: 'MongoDB connection successful!',
      collections: collections.map((col) => col.name),
    });
  } catch (error) {
    console.error('MongoDB connection error:', error);
    res.status(500).json({ message: 'MongoDB connection failed', error });
  }
});

// Protected test route
app.get('/protected', authenticate, (req, res) => {
  res.json({ message: 'This is a protected route', user: req.user });
});

// Handle 404 errors
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
