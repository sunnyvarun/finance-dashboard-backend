const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const FinancialRecord = sequelize.define('FinancialRecord', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  amount: {
    type: DataTypes.FLOAT,
    allowNull: false
  },

  type: {
    type: DataTypes.ENUM('income', 'expense'),
    allowNull: false
  },

  category: {
    type: DataTypes.STRING,
    allowNull: false
  },

  date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },

  notes: {
    type: DataTypes.TEXT
  },

  createdBy: {
    type: DataTypes.INTEGER,
    allowNull: false
  }

}, {
  timestamps: true
});

module.exports = FinancialRecord;