const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const skillSwapRoutes = require('./routes/skillSwapRoutes');
const matchRoutes = require('./routes/matchRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const skillRoutes = require('./routes/skillRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const authenticate = require('./middlewares/auth');
const errorHandler = require('./middlewares/errorHandler');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Database connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));



// Body parser
app.use(express.json());

app.use(cors(
  {
    methods:["GET", "POST", "PATCH", "PUT", "DELETE"],
    origin:["http://localhost:5173"],
    credentials:true,
  }
))

// Routes
app.use('/api', authenticate, userRoutes);
app.use('/api', authenticate, skillSwapRoutes);
app.use('/api', authenticate, matchRoutes);
app.use('/api', authenticate, reviewRoutes);
app.use('/api', authenticate, skillRoutes);
app.use('/api', authenticate, notificationRoutes);

// Default Route
app.get('/', (req, res) => {
  res.send('Skill Swap Platform Backend is Running!');
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

// Protected Test Route
app.get('/protected', authenticate, (req, res) => {
  res.json({ message: 'This is a protected route', user: req.user });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error Handler
app.use(errorHandler);

// Server startup
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Global error handlers
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});