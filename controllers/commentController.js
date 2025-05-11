// Importing the Comment model to interact with the Comment collection in MongoDB
import Comment from '../models/Comment.js';

// Controller function to get all comments for a specific video
export const getComments = async (req, res) => {
  try {
    // Fetching all comments related to the videoId from the request parameters
    const comments = await Comment.find({ videoId: req.params.videoId });
    // Sending a successful response with the list of comments
    res.status(200).json(comments);
  } catch (err) {
    // If an error occurs, sending a 500 status code with the error message
    res.status(500).json({ error: err.message });
  }
};

// Controller function to add a new comment to the database
export const addComment = async (req, res) => {
  try {
    // Creating a new Comment instance with data from the request body
    const comment = new Comment(req.body);
    // Saving the new comment to the database
    await comment.save();
    // Sending a successful response with the created comment
    res.status(201).json(comment);
  } catch (err) {
    // If an error occurs, sending a 500 status code with the error message
    res.status(500).json({ error: err.message });
  }
};
