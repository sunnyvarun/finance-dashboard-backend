const sequelize = require('../config/database');
const User = require('./User');
const FinancialRecord = require('./FinancialRecord');

// Relationship
User.hasMany(FinancialRecord, {
  foreignKey: 'createdBy',
  as: 'records'
});

FinancialRecord.belongsTo(User, {
  foreignKey: 'createdBy',
  as: 'user'
});

module.exports = {
  sequelize,
  User,
  FinancialRecord
};