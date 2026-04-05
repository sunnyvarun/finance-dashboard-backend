const { FinancialRecord } = require('../models');

// CREATE
const createRecord = async (data) => {
  return await FinancialRecord.create(data);
};

// GET ALL
const getAllRecords = async (user) => {
  return await FinancialRecord.findAll({
    where: { createdBy: user.id }
  });
};

// GET ONE
const getRecordById = async (id) => {
  return await FinancialRecord.findByPk(id);
};

// UPDATE
const updateRecord = async (id, data) => {
  const record = await FinancialRecord.findByPk(id);

  if (!record) return null;

  await record.update(data);
  return record;
};

// DELETE
const deleteRecord = async (id) => {
  const record = await FinancialRecord.findByPk(id);

  if (!record) return null;

  await record.destroy();
  return true;
};

module.exports = {
  createRecord,
  getAllRecords,
  getRecordById,
  updateRecord,
  deleteRecord
};