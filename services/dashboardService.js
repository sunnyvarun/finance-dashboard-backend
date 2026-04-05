const { FinancialRecord } = require('../models');
const { Op } = require('sequelize');

// TOTAL INCOME
const getTotalIncome = async (user) => {
  return await FinancialRecord.sum('amount', {
    where: {
      type: 'income',
      createdBy: user.id
    }
  }) || 0;
};

// TOTAL EXPENSES
const getTotalExpenses = async (user) => {
  return await FinancialRecord.sum('amount', {
    where: {
      type: 'expense',
      createdBy: user.id
    }
  }) || 0;
};

// NET BALANCE
const getNetBalance = async (user) => {
  const income = await getTotalIncome(user);
  const expense = await getTotalExpenses(user);
  return income - expense;
};

// CATEGORY TOTALS
const getCategoryTotals = async (user) => {
  return await FinancialRecord.findAll({
    attributes: [
      'category',
      [FinancialRecord.sequelize.fn('SUM', FinancialRecord.sequelize.col('amount')), 'total']
    ],
    where: {
      createdBy: user.id
    },
    group: ['category']
  });
};

// RECENT TRANSACTIONS
const getRecentTransactions = async (user) => {
  return await FinancialRecord.findAll({
    where: { createdBy: user.id },
    order: [['createdAt', 'DESC']],
    limit: 5
  });
};

module.exports = {
  getTotalIncome,
  getTotalExpenses,
  getNetBalance,
  getCategoryTotals,
  getRecentTransactions
};