const jwt = require('jsonwebtoken');
const { User } = require('../models');
const config = require('../config/config');
const bcrypt = require('bcryptjs');

const generateToken = (id) => {
  return jwt.sign({ id }, config.jwt.secret, {
    expiresIn: config.jwt.expire
  });
};

// REGISTER
const register = async (data) => {
  const existingUser = await User.findOne({ where: { email: data.email } });

  if (existingUser) {
    throw new Error('Email already exists');
  }

  const user = await User.create(data);

  const token = generateToken(user.id);

  return { user, token };
};

// LOGIN
const login = async (email, password) => {
  const user = await User.findOne({ where: { email } });

  if (!user) {
    throw new Error('Invalid email or password');
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error('Invalid email or password');
  }

  const token = generateToken(user.id);

  return { user, token };
};

module.exports = {
  register,
  login
};