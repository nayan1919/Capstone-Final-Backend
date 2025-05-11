// Importing mongoose library to interact with MongoDB
import mongoose from 'mongoose';

// Defining the schema for the Channel model
const channelSchema = new mongoose.Schema({
  channelName: String,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  description: String,
  channelBanner: String,
  subscribers: Number,
  videos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Video' }],
});

// Exporting the Channel model, based on the defined channelSchema
export default mongoose.model('Channel', channelSchema);
