// Importing the jwt library for verifying JSON Web Tokens
import jwt from 'jsonwebtoken';

// Middleware function to authenticate users based on JWT
export const authenticate = (req, res, next) => {
  // Extracting the Authorization header from the incoming request
  const authHeader = req.header('Authorization');

  // If the Authorization header is not present or does not start with 'Bearer', return a 401 error
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).send('Access Denied'); // 401 Unauthorized error
  }

  // Extracting the token from the Authorization header (after 'Bearer ')
  const token = authHeader.split(' ')[1]; // Extract only the token part

  try {
    // Verifying the token using the JWT secret key
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    // Attaching the verified user data to the request object (req.user)
    req.user = verified;
    // Proceeding to the next middleware or route handler
    next();
  } catch (err) {
    // If the token is invalid or expired, sending a 400 error
    res.status(400).send('Invalid Token'); // 400 Bad Request error
  }
};
