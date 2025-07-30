const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Middleware to protect routes
const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Extract token from header: "Bearer <token>"
      token = req.headers.authorization.split(" ")[1];

      // Decode token using JWT secret
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach user to request object, excluding password
      req.user = await User.findById(decoded.user.id).select("-password");

      next(); // Pass control to the next middleware/route
    } catch (error) {
      console.log("Token verification failed!", error);
      res.status(401).json({ message: "Not authorized, token failed!" });
    }
  } else {
    res.status(401).json({ message: "Not authorized, no token provided!" });
  }
};

module.exports = { protect };
