// Importing mongoose library to interact with MongoDB
import mongoose from 'mongoose';

// Asynchronous function to connect to MongoDB using Mongoose
const connectDB = async () => {
  try {
    // Trying to connect to MongoDB using the connection string from environment variables (MONGO_URI)
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true, // Using the new URL parser for MongoDB connection
      useUnifiedTopology: true, // Using the new unified topology engine for MongoDB
    });
    console.log('MongoDB connected'); // Log message on successful connection
  } catch (err) {
    // Logging any error that occurs during the connection
    console.error(err.message);
    process.exit(1); // Exiting the process with a non-zero status if connection fails
  }
};

// Exporting the connectDB function so it can be used elsewhere in the app
export default connectDB;
