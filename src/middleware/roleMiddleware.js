// src/middleware/roleMiddleware.js
const jwt = require("jsonwebtoken");

module.exports = (role) => (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(403).json({ message: "No token provided" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    if (req.user.role !== role) {
      return res
        .status(403)
        .json({ message: "Forbidden: Admin access required" });
    }

    next();
  } catch (error) {
    console.log("error => ", error);
    res.status(401).json({ message: "Unauthorized" });
  }
};
