// Importing required libraries and modules
import express from 'express';  // For creating the Express router and handling HTTP requests
import Channel from '../models/Channel.js';  // Importing the Channel model
import { authenticate } from '../middleware/authMiddleware.js';  // Importing the authentication middleware

// Creating a new Express router
const router = express.Router();

// POST route to create a new channel (authentication required)
router.post('/', authenticate, async (req, res) => {
  // Creating a new Channel document using the data from the request body
  const channel = new Channel(req.body);

  // Saving the newly created channel to the database
  await channel.save();

  // Responding with a 201 status and the created channel data
  res.status(201).send(channel);
});

// GET route to fetch a specific channel by ID
router.get('/:id', async (req, res) => {
  // Finding the channel by ID and populating the 'videos' field with the related video data
  const channel = await Channel.findById(req.params.id).populate('videos');

  // Responding with the found channel data
  res.send(channel);
});

// Exporting the router to be used in other parts of the application
export default router;
