const express = require('express');
const {
  createRecord,
  getAllRecords,
  getRecord,
  updateRecord,
  deleteRecord,
  bulkCreateRecords
} = require('../controllers/recordController');

const { protect } = require('../middlewares/authMiddleware');
const { restrictTo } = require('../middlewares/roleMiddleware');

const router = express.Router();

// CREATE → admin + analyst
/**
 * @swagger
 * /api/records:
 *   post:
 *     summary: Create a financial record
 *     tags: [Records]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             amount: 2000
 *             type: income
 *             category: salary
 *             date: 2026-04-05
 *             notes: April salary
 *     responses:
 *       201:
 *         description: Record created successfully
 */
router.post('/', protect, restrictTo('admin', 'analyst'), createRecord);

/**
 * @swagger
 * /api/records/bulk:
 *   post:
 *     summary: Bulk create financial records
 *     tags: [Records]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             - amount: 5000
 *               type: income
 *               category: salary
 *               date: 2026-04-01
 *             - amount: 1000
 *               type: expense
 *               category: food
 *               date: 2026-04-02
 *     responses:
 *       201:
 *         description: Records created successfully
 */
router.post(
  '/bulk',
  protect,
  restrictTo('admin', 'analyst'),
  bulkCreateRecords
);

// READ → all
/**
 * @swagger
 * /api/records:
 *   get:
 *     summary: Get all financial records with filtering
 *     tags: [Records]
 *     parameters:
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           example: income
 *         description: Filter by type (income/expense)
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *           example: food
 *         description: Filter by category
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           example: 2026-04-01
 *         description: Start date for filtering
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           example: 2026-04-30
 *         description: End date for filtering
 *     responses:
 *       200:
 *         description: List of filtered records
 */
router.get('/', protect, getAllRecords);

/**
 * @swagger
 * /api/records/{id}:
 *   get:
 *     summary: Get a single record by ID
 *     tags: [Records]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Record ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Record found
 *       404:
 *         description: Record not found
 */
router.get('/:id', protect, getRecord);

// UPDATE → admin + analyst

/**
 * @swagger
 * /api/records/{id}:
 *   put:
 *     summary: Update a financial record
 *     tags: [Records]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         application/json:
 *           example:
 *             amount: 2500
 *             notes: Updated salary
 *     responses:
 *       200:
 *         description: Record updated
 */
router.put('/:id', protect, restrictTo('admin', 'analyst'), updateRecord);

// DELETE → admin only
/**
 * @swagger
 * /api/records/{id}:
 *   delete:
 *     summary: Delete a financial record
 *     tags: [Records]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Record deleted
 */
router.delete('/:id', protect, restrictTo('admin'), deleteRecord);



module.exports = router;