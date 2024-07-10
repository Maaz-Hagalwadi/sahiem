
const express = require('express');
const { Register } = require('../db/registerModel');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const { transporter, mailOptions } = require('./nodemailerConfig');
const jwt = require('jsonwebtoken');

const registerRoute = express.Router();

registerRoute.get("/", (req, res) => {
  res.send("register page");
});

// Initial registration
registerRoute.post("/", async (req, res) => {
  const data = req.body;
  try {
    const existingUser = await Register.findOne({
      where: { email: data.email },
      attributes: ['userName', 'email', 'phoneNumber', 'password']
    });

    if (existingUser) {
      return res.status(409).send("User already registered");
    }

    const hash = await bcrypt.hash(data.password, 10);

    const otp = Math.floor(100000 + Math.random() * 900000);

    const newUser = await Register.create({
      registerId: uuidv4(),
      userName: data.userName,
      email: data.email,
      phoneNumber: data.phoneNumber,
      password: hash,
      otp,
      status: 'pending',
    });

    // Generate JWT token with userId in payload
    const tokenPayload = {
      userId: newUser.registerId,
    };

    const token = jwt.sign(tokenPayload, 'your_jwt_secret_key', { expiresIn: '1h' });

    const emailOptions = {
      ...mailOptions,
      to: data.email,
      text: `Your OTP for account verification is: ${otp}`,
    };

    await transporter.sendMail(emailOptions);

    res.json({ message: "User registered successfully. OTP sent to email.", token });

  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).send("Error while user registration");
  }
});

// Verify OTP and update role, age, gender
registerRoute.post("/verifyOtp", async (req, res) => {
  const { email, otp, role, age, gender } = req.body;
  try {
    const user = await Register.findOne({ where: { email, otp } });

    if (!user) {
      return res.status(400).send("Invalid OTP");
    }

    user.role = role;
    user.age = age;
    user.gender = gender;
    user.status = 'active';  // Update status to active after successful OTP verification
    await user.save();

    // Generate JWT token with userId and role in payload
    const tokenPayload = {
      userId: user.registerId,
      role: user.role,
    };

    const token = jwt.sign(tokenPayload, 'your_jwt_secret_key', { expiresIn: '1h' });

    res.json({ message: "OTP verified successfully. User details updated.", token });

  } catch (error) {
    console.error('Error during OTP verification:', error);
    res.status(500).send("Error while verifying OTP");
  }
});

// Fetch all registered users
registerRoute.get("/all", async (req, res) => {
  try {
    const users = await Register.findAll({
      attributes: ['userName', 'email', 'phoneNumber', 'role', 'age', 'gender', 'status']
    });

    res.json(users);
  } catch (error) {
    console.error('Error fetching all users:', error);
    res.status(500).send("Error while fetching all users");
  }
});

module.exports = registerRoute;
