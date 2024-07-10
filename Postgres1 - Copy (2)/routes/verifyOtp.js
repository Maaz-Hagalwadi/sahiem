
const express = require('express');
const { Register } = require('../db/registerModel');

const verifyOtpRoute = express.Router();

verifyOtpRoute.post("/", async (req, res) => {
  const { email, otp } = req.body;
  try {
    const user = await Register.findOne({ where: { email, otp } });

    if (user) {
      await Register.update({ otp: null, status: 'active' }, { where: { email } });
      res.send("OTP verified successfully. Account is now active.");
    } else {
      res.status(400).send("Invalid OTP.");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error verifying OTP.");
  }
});

module.exports = verifyOtpRoute;
