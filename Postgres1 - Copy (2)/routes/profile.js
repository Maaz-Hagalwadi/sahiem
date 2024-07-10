const express = require('express');
const { Register } = require('../db/registerModel');
const bcrypt = require('bcrypt');

const profileRoute = express.Router();

profileRoute.get("/:id", async (req, res) => {
  try {
    const user = await Register.findOne({ where: { registerId: req.params.id } });
    if (user) {
      res.json(user);
    } else {
      res.status(404).send("User not found");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching user profile");
  }
});

profileRoute.put("/:id", async (req, res) => {
  const data = req.body;
  try {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }
    await Register.update(data, { where: { registerId: req.params.id } });
    res.send("Profile updated successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating profile");
  }
});

module.exports = profileRoute;
