// Importing required libraries and modules
import express from 'express';
import bcrypt from 'bcryptjs';  // For hashing and comparing passwords
import jwt from 'jsonwebtoken';  // For creating JSON Web Tokens
import User from '../models/User.js';  // Importing the User model

// Creating a new Express router
const router = express.Router();

// REGISTER route for creating a new user
router.post('/register', async (req, res) => {
  try {
    // Destructuring the incoming data from the request body
    const { username, email, password } = req.body;

    // Checking if a user with the given email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: 'Email already in use' });

    // Hashing the user's password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Creating a new User document with the hashed password
    const user = new User({ username, email, password: hashedPassword });
    await user.save(); // Saving the new user to the database

    // Generating a JWT token for the new user
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '3d' });

    // Responding with the token and user data
    res.status(201).json({ token, user });
  } catch (err) {
    // Handling any errors that occur during the registration process
    res.status(500).json({ error: 'Registration failed' });
  }
});

// LOGIN route for authenticating an existing user
router.post('/login', async (req, res) => {
  try {
    // Destructuring the incoming data from the request body
    const { email, password } = req.body;

    // Finding the user in the database based on the provided email
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'User not found' });

    // Comparing the provided password with the stored hashed password
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ error: 'Invalid credentials' });

    // Generating a JWT token for the authenticated user
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '3d' });

    // Responding with the token and user data
    res.json({ token, user });
  } catch (err) {
    // Handling any errors that occur during the login process
    res.status(500).json({ error: 'Login failed' });
  }
});

// Exporting the router to be used in other parts of the application
export default router;
