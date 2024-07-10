const jwt = require('jsonwebtoken');
const { Register } = require('../db/registerModel');

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.sendStatus(401); // Unauthorized if no token found
  }

  try {
    const decoded = jwt.verify(token, 'your_jwt_secret_key');
    req.user = decoded; // Attach decoded payload to request object

    // Fetch user details from database (optional)
    const user = await Register.findByPk(decoded.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    next(); // Proceed to next middleware or route handler
  } catch (err) {
    console.error(err);
    return res.status(403).json({ message: "Invalid token" });
  }
};

module.exports = { authenticateToken };
