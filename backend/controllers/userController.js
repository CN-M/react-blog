const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;
const User = require('../models/User');

// Generate JWT
const generateToken = (id) => jwt.sign({ id }, JWT_SECRET, { expiresIn: '60d' });

// NOTE: Remember to sanitize

// Register New User // POST
exports.registerUser = async (req, res, next) => {
  const { email, password } = req.body;
  const username = req.body.username.toLowerCase();

  if (!username || !email || !password) {
    res.status(400);
    throw new Error('Please fill in all fields');
  }

  // Does user with this email exist?
  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error('User with email already exists');
  }

  // is this username taken?
  const usernameExist = await User.findOne({ username });
  if (usernameExist) {
    res.status(400);
    throw new Error('Username already taken');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
};

// Login User // POST
exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(201).json({
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid credentials');
  }
};

// Get list of all users // GET
exports.getAllUsers = async (req, res, next) => {
  const allUsers = await User.find();
  if (!allUsers) {
    res.status(400);
    throw new Error('No users found');
  } else {
    res.status(200).json(allUsers);
  }
};

// Get specific user // GET
exports.getUserDetails = async (req, res, next) => {
  const user = await User.findOne({ username: req.params.username });
  if (!user) {
    res.status(400);
    throw new Error('User not found');
  } else {
    const { id, username, email } = user;
    res.status(200).json({
      id,
      username,
      email,
    });
  }
};

// Update a user // PUT
exports.updateUser = async (req, res, next) => {
  const username = req.params.username.toLowerCase();
  res.status(200).json(`Update user:  ${username}`);
};

// Delete a specifc user // DELETE
exports.deleteUser = async (req, res, next) => {
  const username = req.params.username.toLowerCase();
  const user = await User.findOne({ username });
  if (!user) {
    res.status(400);
    throw new Error('User not found');
  } else {
    await User.findByIdAndDelete(user.id);
    res.status(200).json(`User ${user.username} deleted`);
  }
};
