const Sequelize = require('sequelize');
const HOME_DIR = require('os').homedir()

const sequelizeDb = new Sequelize({
  host: 'localhost',
  dialect: 'sqlite',
  port: 8080,

  // SQLite only
  storage: `${HOME_DIR}/Documents/IE_Project_Database/khanehbedoush.db`,
});


module.exports.sequelizeDb = sequelizeDb