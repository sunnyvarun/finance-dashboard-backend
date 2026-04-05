// const { Sequelize } = require('sequelize');
// const config = require('./config');

// const sequelize = new Sequelize(
//   config.db.name,
//   config.db.user,
//   config.db.password,
//   {
//     host: config.db.host,
//     dialect: 'mysql',
//     logging: false
//   }
// );

// module.exports = sequelize;

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.MYSQLDATABASE,
  process.env.MYSQLUSER,
  process.env.MYSQLPASSWORD,
  {
    host: process.env.MYSQLHOST,
    port: process.env.MYSQLPORT,
    dialect: 'mysql',
    logging: false
  }
);

module.exports = sequelize;