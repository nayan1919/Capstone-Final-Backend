// Importing the Channel model to interact with the Channel collection in MongoDB
import Channel from '../models/Channel.js';

// Controller function to get all channels from the database
export const getChannels = async (req, res) => {
  try {
    // Fetching all channels from the Channel collection
    const channels = await Channel.find();
    // Sending a successful response with the list of channels
    res.status(200).json(channels);
  } catch (err) {
    // If an error occurs, sending a 500 status code with the error message
    res.status(500).json({ error: err.message });
  }
};

// Controller function to create a new channel
export const createChannel = async (req, res) => {
  try {
    // Creating a new Channel instance with data from the request body
    const channel = new Channel(req.body);
    // Saving the new channel to the database
    await channel.save();
    // Sending a successful response with the created channel
    res.status(201).json(channel);
  } catch (err) {
    // If an error occurs, sending a 500 status code with the error message
    res.status(500).json({ error: err.message });
  }
};
