// Importing mongoose library to interact with MongoDB
import mongoose from 'mongoose';

// Defining the schema for the Comment model
const commentSchema = new mongoose.Schema({
  // videoId field references a Video object by its ObjectId (using mongoose.Schema.Types.ObjectId and ref to 'Video')
  videoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Video' },
  
  // userId field references a User object by its ObjectId (using mongoose.Schema.Types.ObjectId and ref to 'User')
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  
  // text field stores the content of the comment (type String)
  text: String,
  
  // timestamp field stores the date and time when the comment was created (default is the current date and time)
  timestamp: { type: Date, default: Date.now },
});

// Creating and exporting the Comment model based on the defined commentSchema
const Comment = mongoose.model('Comment', commentSchema);
export default Comment;
