// Importing mongoose library to interact with MongoDB
import mongoose from 'mongoose';

// Defining the schema for the User model
const userSchema = new mongoose.Schema({
  // username field stores the username of the user (type String, required)
  username: { type: String, required: true },
  
  // email field stores the email address of the user (type String, required, unique)
  email: { type: String, required: true, unique: true },
  
  // password field stores the user's password (type String, required)
  password: { type: String, required: true },
  
  // avatar field stores the URL or path to the user's avatar image (type String, optional)
  avatar: String,
  
  // channels field is an array of ObjectIds, referencing the Channel model (ref: 'Channel')
  channels: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Channel' }],
});

// Creating and exporting the User model based on the defined userSchema
export default mongoose.model('User', userSchema);
