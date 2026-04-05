const recordService = require('../services/recordService');
const Record = require('../models/FinancialRecord');


// BULK CREATE
const bulkCreateRecords = async (req, res) => {
          try {
            const records = req.body;
        
            if (!Array.isArray(records)) {
              return res.status(400).json({
                error: "Expected an array of records"
              });
            }
        
            // ADD createdBy to each record
            const userId = req.user.id;
        
            const recordsWithUser = records.map(record => ({
              ...record,
              createdBy: userId
            }));
        
            const createdRecords = await Record.bulkCreate(recordsWithUser);
        
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


// GET ALL
const getAllRecords = async (req, res) => {
  try {
    const records = await recordService.getAllRecords(req.user);
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// GET ONE
const getRecord = async (req, res) => {
  try {
    const record = await recordService.getRecordById(req.params.id);

    if (!record) {
      return res.status(404).json({ error: 'Record not found' });
    }

    res.json(record);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// UPDATE
const updateRecord = async (req, res) => {
  try {
    const record = await recordService.updateRecord(req.params.id, req.body);

    if (!record) {
      return res.status(404).json({ error: 'Record not found' });
    }

    res.json(record);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// DELETE
const deleteRecord = async (req, res) => {
  try {
    const deleted = await recordService.deleteRecord(req.params.id);

    if (!deleted) {
      return res.status(404).json({ error: 'Record not found' });
    }

    res.json({ message: 'Record deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// EXPORT
module.exports = {
  createRecord,
  getAllRecords,
  getRecord,
  updateRecord,
  deleteRecord,
  bulkCreateRecords
};