// Importing mongoose library to interact with MongoDB
import mongoose from 'mongoose';

// Defining the schema for the Video model
const videoSchema = new mongoose.Schema({
  title: String,
  thumbnailUrl: String,
  videoUrl: String,
  description: String,
  // channelId field references a Channel object by its ObjectId (using mongoose.Schema.Types.ObjectId and ref to 'Channel')
  channelId: { type: mongoose.Schema.Types.ObjectId, ref: 'Channel' },
  // uploader field references a User object by its ObjectId (using mongoose.Schema.Types.ObjectId and ref to 'User')
  uploader: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  views: Number,
  likes: Number,
  dislikes: Number,
  uploadDate: Date,
});

// Creating and exporting the Video model based on the defined videoSchema
const Video = mongoose.model('Video', videoSchema);
export default Video;
