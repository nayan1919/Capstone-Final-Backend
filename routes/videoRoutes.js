// Importing required libraries and modules
import express from 'express';  // For creating the Express router and handling HTTP requests
import Video from '../models/Video.js';  // Importing the Video model
import { authenticate } from '../middleware/authMiddleware.js';  // Importing the authentication middleware
import { getVideoById, uploadVideo } from '../controllers/videoController.js';  // Importing controller functions for video-related logic

// Creating a new Express router
const router = express.Router();

// GET route to fetch all videos (with pagination and sorted by uploadDate)
router.get('/', async (req, res) => {
  try {
    // Finding videos with limit of 50, sorted by upload date in descending order, and populating uploader field to get username
    const videos = await Video.find().limit(50).sort({ uploadDate: -1 }).populate('uploader', 'username');
    res.send(videos);  // Responding with the list of videos
  } catch (err) {
    res.status(500).json({ error: err.message });  // Handling errors if any
  }
});

// GET route to fetch a specific video by ID (using the controller function)
router.get('/:id', getVideoById);

// POST route for uploading a new video (authentication required)
router.post('/upload', authenticate, uploadVideo);

// PUT route to update a specific video by ID (authentication required)
router.put('/:id', authenticate, async (req, res) => {
  // Finding the video by ID and updating it with the provided request body
  const video = await Video.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.send(video);  // Responding with the updated video
});

// DELETE route to delete a specific video by ID (authentication required)
router.delete('/:id', authenticate, async (req, res) => {
  // Deleting the video by ID
  await Video.findByIdAndDelete(req.params.id);
  res.sendStatus(204);  // Sending status 204 for successful deletion with no content
});

// Exporting the router to be used in other parts of the application
export default router;
