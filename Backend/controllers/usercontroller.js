const userModel = require("../models/userModel.js");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const { generateToken } = require("../Utility/GenerateToken.js");
const userService = require("../services/UserServices.js");

const crypto = require("crypto");
const nodemailer = require("nodemailer");


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



// FORGOT PASSWORD
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate Token
    const resetToken = crypto.randomBytes(32).toString("hex");

    // Hash Token
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 min

    await user.save();

    // Reset URL
    const resetUrl = `http://${process.env.VITE_BACKEND_URL}/reset-password/${resetToken}`;

    // Send Email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "YOUR_EMAIL@gmail.com",
        pass: "YOUR_APP_PASSWORD",
      },
    });

    const message = `
      You requested password reset.

      Click here:
      ${resetUrl}

      If not requested, ignore this email.
    `;

    await transporter.sendMail({
      to: user.email,
      subject: "Password Reset",
      text: message,
    });

    res.json({ message: "Reset link sent to email" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    // Hash token from URL
    const hashedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    const user = await userModel.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    // Update password
    const bcrypt = require("bcryptjs");
    user.password = await bcrypt.hash(password, 10);

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.json({ message: "Password reset successful" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = {
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
  forgotPassword,
  resetPassword,
};