const User = require('../models/user');
const bcrypt = require('bcrypt');
const saltRounds = 1; // Number of salt rounds for bcrypt

const userController = {
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  createUser: async (req, res) => {
    try {
      // Generate a salt and hash the password
      const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
      const newUser = new User({
        username: req.body.username,
        password: hashedPassword, // Store the hashed password
        name: req.body.name,
        email: req.body.email,
        contactNumber: req.body.contactNumber,
        role: 'user', // Set the default role to 'user'
      });

      const createdUser = await newUser.save();
      res.status(201).json(createdUser);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
  getUserById: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  deleteUser: async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json({ message: 'User deleted' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};

module.exports = userController;
