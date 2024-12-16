const jwt = require('jsonwebtoken');
const jwtConfig = require('../jwt-config'); // Import the jwt-config file

module.exports = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  
  if (!authHeader) {
    console.error('No Authorization header found');
    return res.status(403).send({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];
  console.log('Received Token:', token); // Log the received token for debugging

  if (!token) {
    console.error('Token not found in Authorization header');
    return res.status(403).send({ message: 'No token provided' });
  }

  jwt.verify(token, jwtConfig.secret, (err, decoded) => {
    if (err) {
      console.error('Token verification failed:', err.message);
      return res.status(401).send({ message: 'Unauthorized' });
    }

    console.log('Token successfully verified:', decoded); // Log the decoded token payload
    req.user = decoded; // Attach the decoded payload to the request object
    next(); // Proceed to the next middleware or route
  });
};
