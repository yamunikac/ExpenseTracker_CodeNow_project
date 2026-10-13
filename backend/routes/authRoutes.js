
const express = require("express");

const router = express.Router();

const {
  registerUser,
  loginUser,
  forgotPassword,
  updateProfile,
  sendOtp,
  validateOtp,
} = require("../controllers/authController");

// OTP routes
router.post("/sendotp", sendOtp);
router.post("/validateotp", validateOtp);

// Existing authentication routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/forgot-password", forgotPassword);
router.put("/update-profile/:id", updateProfile);

module.exports = router;
