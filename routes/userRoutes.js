const express = require('express');
const { protect } = require('../middlewares/authMiddleware');
const { restrictTo } = require('../middlewares/roleMiddleware');

const router = express.Router();

// Only admin can access
router.get('/', protect, restrictTo('admin'), (req, res) => {
  res.send('Only admin can see users');
});

module.exports = router;