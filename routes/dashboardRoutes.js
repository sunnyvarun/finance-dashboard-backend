const express = require('express');
const { getDashboard } = require('../controllers/dashboardController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

// All logged-in users can access dashboard
/**
 * @swagger
 * /api/dashboard:
 *   get:
 *     summary: Get dashboard analytics
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard data including totals and recent transactions
 */
router.get('/', protect, getDashboard);

module.exports = router;