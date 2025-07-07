const Sequelize = require("sequelize");
require('dotenv').config();

const sequelize = new Sequelize("fantasycardgame", "postgres", "qwerty", {
  dialect: 'postgres',
  host: process.env.hostdb,
  port: 5432,
  define: {
      timestamps: false
  }
});

sequelize.sync().then(result=>{}).catch(err=> console.log(err));

module.exports = {
  Sequelize,
  sequelize
}