const jwt = require('jsonwebtoken');
const { secret } = require('../jwt-config'); // Import the secret from jwt-config

/**
 * Generate an access token.
 * @param {number} id - The user's ID
 * @param {string} expiresIn - Expiration time for the token (default 1 hour)
 * @returns {string} The generated access token
 */
const generateAccessToken = (id, expiresIn = '1h') => {
  return jwt.sign({ id }, secret, { expiresIn });  // Use the secret for both access and refresh tokens
};

/**
 * Verify a token.
 * @param {string} token - The token to verify
 * @returns {object|null} The decoded token or null if invalid
 */
const verifyToken = (token) => {
  try {
    return jwt.verify(token, secret);  // Only need to verify with the single secret
  } catch (err) {
    return null;  // Return null if the token is invalid
  }
};

module.exports = {
  generateAccessToken,
  verifyToken,
};
