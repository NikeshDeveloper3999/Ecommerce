const userModel = require("../models/userModel.js");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const { generateToken } = require("../Utility/GenerateToken.js");
const userService = require("../services/UserServices.js");

// REGISTER USER
const registerUser = async (req, res) => {
  try {
    const { name, email, password, contact } = req.body;

    if (!name || !email || !password || !contact) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: "Invalid email format" });
    }

    if (password.length < 8) {
      return res.status(400).json({ success: false, message: "Password must be at least 8 characters" });
    }

    if (!/^\d{10}$/.test(contact)) {
      return res.status(400).json({ success: false, message: "Enter a valid 10-digit contact number" });
    }

    const existingEmail = await userService.findUser({ email });
    if (existingEmail) {
      return res.status(409).json({ success: false, message: "Email already exists" });
    }

    const existingMobile = await userModel.findOne({ mobile_number: contact });
    if (existingMobile) {
      return res.status(409).json({ success: false, message: "Mobile number already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    let aadhar_number;
    let exists = true;

    while (exists) {
      aadhar_number = Math.floor(100000000000 + Math.random() * 900000000000).toString();
      exists = await userModel.findOne({ aadhar_number });
    }

    const newUser = await userModel.create({
      full_name: name,
      email,
      mobile_number: contact,
      password: hashedPassword,
      aadhar_number,
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        _id: newUser._id,
        full_name: newUser.full_name,
        email: newUser.email,
        mobile_number: newUser.mobile_number,
        aadhar_number: newUser.aadhar_number,
      },
      token: generateToken(newUser._id),
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};


// LOGIN USER
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Login body:", req.body);

    if (!email || !password)
      return res.status(400).json({ success: false, message: "Email and Password required" });

    const user = await userModel.findOne({ email });
    console.log("User found:", user);

    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ success: false, message: "Invalid Email or Password" });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        _id: user._id,
        full_name: user.full_name,
        email: user.email,
        mobile_number: user.mobile_number,
      },
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};



// UPDATE USER
const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const updateData = req.body;

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ success: false, message: "Provide data to update" });
    }

    if (updateData.password) {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(updateData.password, salt);
    }

    const updatedUser = await userModel
      .findByIdAndUpdate(userId, updateData, { new: true, runValidators: true })
      .select("-password");

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: updatedUser,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};


// DELETE USER
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const deletedUser = await userModel.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};



app.post("/api/user/forgot-password", async (req, res) => {
  const { email } = req.body;

  // 1. Check user exists
  const user = await User.findOne({ email });
  if (!user) {
    return res.json({ success: false, message: "User not found" });
  }

  // 2. Generate token
  const token = Math.random().toString(36).slice(2);

  // 3. Save token (DB)
  user.resetToken = token;
  await user.save();

  // 4. Send email (use nodemailer)
  console.log(`Reset link: http://localhost:5173/reset-password/${token}`);

  res.json({ success: true, message: "Reset link sent" });
});




module.exports = {
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
};