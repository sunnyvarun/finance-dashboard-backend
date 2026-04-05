const authService = require('../services/authService');

// REGISTER
const register = async (req, res) => {
  try {
    const { user, token } = await authService.register(req.body);

    res.status(201).json({
      message: 'User registered successfully',
      user,
      token
    });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// LOGIN
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const { user, token } = await authService.login(email, password);

    res.status(200).json({
      message: 'Login successful',
      user,
      token
    });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  register,
  login
};