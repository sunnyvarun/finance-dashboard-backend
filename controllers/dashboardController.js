const dashboardService = require('../services/dashboardService');

const getDashboard = async (req, res) => {
  try {
    const user = req.user;

    const totalIncome = await dashboardService.getTotalIncome(user);
    const totalExpenses = await dashboardService.getTotalExpenses(user);
    const netBalance = await dashboardService.getNetBalance(user);
    const categoryTotals = await dashboardService.getCategoryTotals(user);
    const recentTransactions = await dashboardService.getRecentTransactions(user);

    res.json({
      totalIncome,
      totalExpenses,
      netBalance,
      categoryTotals,
      recentTransactions
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getDashboard };