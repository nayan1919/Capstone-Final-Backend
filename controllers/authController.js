// Importing required libraries
import jwt from 'jsonwebtoken'; // JSON Web Token library for creating tokens
import bcrypt from 'bcryptjs'; // Bcrypt library for hashing passwords
import User from '../models/User.js'; // Importing the User model to interact with the User collection in MongoDB

// Function to create a JWT token for a user
const createToken = (user) => {
  // Signing the JWT token with the user's ID and email, and using a secret key from environment variables
  return jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: '3d', // The token will expire in 3 days
  });
};

// The register controller function for user registration
export const register = async (req, res) => {
  const { email, password } = req.body; // Destructuring email and password from the request body
  try {
    // Checking if a user with the same email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' }); // If user exists, send error response

    // Hashing the user's password with a salt round of 12
    const hashedPassword = await bcrypt.hash(password, 12);
    // Creating a new user in the database with the hashed password
    const user = await User.create({ email, password: hashedPassword });

    // Creating a JWT token for the newly registered user
    const token = createToken(user);

    // Sending a successful response with the token and user information (id and email)
    res.status(201).json({ token, user: { id: user._id, email: user.email } });
  } catch (error) {
    // If an error occurs, send a 500 status code and an error message
    res.status(500).json({ message: 'Error registering user' });
  }
};
