const express = require('express');
const { register, login } = require('../controllers/authController');

const router = express.Router();

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example:
 *               name: Varun
 *               email: varun@test.com
 *               password: 123456
 *               role: admin
 *     responses:
 *       201:
 *         description: User registered successfully
 */

router.post('/register', register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user and get JWT token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example:
 *               email: varun@test.com
 *               password: 123456
 *     responses:
 *       200:
 *         description: Login successful
 */
router.post('/login', login);

module.exports = router;