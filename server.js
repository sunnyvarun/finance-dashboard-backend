const app = require('./app');
// const config = require('./config/config');
const { sequelize } = require('./models');

// const PORT = config.port;
const PORT = process.env.PORT || 3000;
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected');

    // 🔥 Sync models → creates tables
    await sequelize.sync();
    console.log('✅ Tables created/updated');

    app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error('❌ Error:', error);
  }
};

startServer();