const { FinancialRecord } = require('../models');
const { Op } = require('sequelize');

// CREATE
const createRecord = async (data) => {
  return await FinancialRecord.create(data);
};

// BULK CREATE
const bulkCreateRecords = async (records) => {
  return await FinancialRecord.bulkCreate(records);
};

// GET ALL WITH FILTERING
const getAllRecords = async (user, query) => {
  let where = {
    createdBy: user.id
  };

  // 🔍 Filter by type (income / expense)
  if (query.type) {
    where.type = query.type;
  }

  // 🔍 Filter by category
  if (query.category) {
    where.category = query.category;
  }

  // 🔍 Filter by date range
  if (query.startDate && query.endDate) {
    where.date = {
      [Op.between]: [query.startDate, query.endDate]
    };
  }

  return await FinancialRecord.findAll({ where });
};

// GET ONE (secure)
const getRecordById = async (id, userId) => {
  return await FinancialRecord.findOne({
    where: {
      id,
      createdBy: userId
    }
  });
};

// UPDATE (secure)
const updateRecord = async (id, data, userId) => {
  const record = await FinancialRecord.findOne({
    where: {
      id,
      createdBy: userId
    }
  });

  if (!record) return null;

  await record.update(data);
  return record;
};

// DELETE (secure)
const deleteRecord = async (id, userId) => {
  const record = await FinancialRecord.findOne({
    where: {
      id,
      createdBy: userId
    }
  });

  if (!record) return null;

  await record.destroy();
  return true;
};

module.exports = {
  createRecord,
  bulkCreateRecords,
  getAllRecords,
  getRecordById,
  updateRecord,
  deleteRecord
};