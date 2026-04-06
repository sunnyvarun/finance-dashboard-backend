const recordService = require('../services/recordService');

// BULK CREATE
const bulkCreateRecords = async (req, res) => {
  try {
    const records = req.body;

    if (!Array.isArray(records)) {
      return res.status(400).json({
        error: "Expected an array of records"
      });
    }

    const userId = req.user.id;

    const recordsWithUser = records.map(record => ({
      ...record,
      createdBy: userId
    }));

    const createdRecords = await recordService.bulkCreateRecords(recordsWithUser);

    res.status(201).json({
      message: "Bulk records created successfully",
      data: createdRecords
    });

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};

// CREATE
const createRecord = async (req, res) => {
  try {
    const data = {
      ...req.body,
      createdBy: req.user.id
    };

    const record = await recordService.createRecord(data);

    res.status(201).json(record);

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// GET ALL (WITH FILTERS)
const getAllRecords = async (req, res) => {
  try {
    const records = await recordService.getAllRecords(req.user, req.query);
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET ONE (SECURE)
const getRecord = async (req, res) => {
  try {
    const record = await recordService.getRecordById(req.params.id, req.user.id);

    if (!record) {
      return res.status(404).json({ error: 'Record not found' });
    }

    res.json(record);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE (SECURE)
const updateRecord = async (req, res) => {
  try {
    const record = await recordService.updateRecord(
      req.params.id,
      req.body,
      req.user.id
    );

    if (!record) {
      return res.status(404).json({ error: 'Record not found' });
    }

    res.json(record);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE (SECURE)
const deleteRecord = async (req, res) => {
  try {
    const deleted = await recordService.deleteRecord(
      req.params.id,
      req.user.id
    );

    if (!deleted) {
      return res.status(404).json({ error: 'Record not found' });
    }

    res.json({ message: 'Record deleted' });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createRecord,
  getAllRecords,
  getRecord,
  updateRecord,
  deleteRecord,
  bulkCreateRecords
};