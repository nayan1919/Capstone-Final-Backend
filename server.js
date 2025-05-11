// Importing required libraries and modules
import express from 'express';  // For creating the Express app and handling HTTP requests
import mongoose from 'mongoose';  // For interacting with MongoDB
import dotenv from 'dotenv';  // For loading environment variables from .env file
import cors from 'cors';  // For enabling Cross-Origin Resource Sharing (CORS)
import authRoutes from './routes/authRoutes.js';  // Importing authentication routes
import videoRoutes from './routes/videoRoutes.js';  // Importing video routes
import commentRoutes from './routes/commentRoutes.js';  // Importing comment routes
import channelRoutes from './routes/channelRoutes.js';  // Importing channel routes

// Load environment variables from .env file
dotenv.config();

// Creating the Express app
const app = express();

// Define allowed origins for CORS (Frontend URLs)
const allowedOrigins = ['http://localhost:5173', 'http://localhost:5174'];

// Enable CORS with custom settings
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin like Postman or mobile apps
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));  // Block requests from disallowed origins
    }
  },
  credentials: true,  // Allow credentials like cookies to be sent with requests
}));

// Middleware to parse incoming JSON requests
app.use(express.json());

// Register API routes for authentication, videos, comments, and channels
app.use('/api/auth', authRoutes);
app.use('/api/videos', videoRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/channels', channelRoutes);

// MongoDB connection and starting the server
mongoose
  .connect(process.env.MONGO_URI)  // Connect to MongoDB using the URI from environment variables
  .then(() => {
    // Start the server on the specified port (default 5000)
    app.listen(process.env.PORT || 5000, () =>
      console.log('Server running on port', process.env.PORT || 5000)
    );
  })
  .catch((err) => console.log(err));  // Log any connection errors
