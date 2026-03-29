const jwt = require("jsonwebtoken");

const adminAuth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ success: false, message: "No Token Provided" });
    }

    const token = authHeader.split(" ")[1]; // Bearer <token>
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (decoded.role !== "admin") {
      return res.status(403).json({ success: false, message: "Access Denied" });
    }

    req.admin = decoded; // optional: attach admin info to request
    next();
  } catch (error) {
    console.error("Admin Auth Error:", error.message);
    return res.status(401).json({ success: false, message: "Invalid Token" });
  }
};

module.exports = adminAuth;