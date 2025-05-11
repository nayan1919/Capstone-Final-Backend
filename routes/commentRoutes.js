// Importing required libraries and modules
import express from 'express';  // For creating the Express router and handling HTTP requests
import Comment from '../models/Comment.js';  // Importing the Comment model
import { authenticate } from '../middleware/authMiddleware.js';  // Importing the authentication middleware

// Creating a new Express router
const router = express.Router();

// POST route to add a new comment (authentication required)
router.post('/', authenticate, async (req, res) => {
  // Creating a new Comment document using the data from the request body
  const comment = new Comment(req.body);

  // Saving the newly created comment to the database
  await comment.save();

  // Responding with a 201 status and the created comment data
  res.status(201).send(comment);
});

// GET route to fetch comments for a specific video by videoId
router.get('/:videoId', async (req, res) => {
  // Finding all comments associated with the given videoId from the request parameters
  const comments = await Comment.find({ videoId: req.params.videoId });

  // Responding with the list of comments
  res.send(comments);
});

// Exporting the router to be used in other parts of the application
export default router;
