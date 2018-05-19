const Sequelize = require('sequelize');
const HOME_DIR = require('os').homedir()

const sequelizeDb = new Sequelize({
  host: 'localhost',
  dialect: 'sqlite',

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },

  // SQLite only
  storage: `${HOME_DIR}/Documents/IE_Project_Database`,
});


module.exports.sequelizeDb = sequelizeDb