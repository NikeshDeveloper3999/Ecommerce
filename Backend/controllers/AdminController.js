const jwt = require("jsonwebtoken");

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and Password required" });
    }

    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      const token = jwt.sign({ role: "admin", email }, process.env.JWT_SECRET_KEY, { expiresIn: "1d" });

      return res.json({ success: true, token });
    }

    return res.status(401).json({ success: false, message: "Invalid credentials" });

  } catch (error) {
    console.error("Login Admin Error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { loginAdmin };