// src/middleware/authMiddleware.js
const jwt = require("jsonwebtoken");

const isVerified = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(403).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    if (req.user.isVerified) {
      next();
    } else {
      res.status(403).json({ message: "User is not verified" });
    }
  } catch (error) {
    console.log("error => ", error);
    res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = { isVerified };
