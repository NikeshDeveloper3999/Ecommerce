// middleware/authuser.js
const jwt = require("jsonwebtoken");

const authuser = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "No Token Provided",
      });
    }

const token = authHeader.split(" ")[1]; // remove 'Bearer '

const decoded = jwt.verify(token,  process.env.JWT_SECRET_KEY);
console.log(decoded)


    req.user =  decoded; // { id: user._id }
    next();


  } catch (err) {
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};

module.exports = authuser;
