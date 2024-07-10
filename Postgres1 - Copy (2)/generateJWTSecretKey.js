const crypto = require('crypto');

// Generate a random string of 32 characters
const generateJWTSecretKey = () => {
  return crypto.randomBytes(32).toString('hex');
};

console.log(generateJWTSecretKey());
