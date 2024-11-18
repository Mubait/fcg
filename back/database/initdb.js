const Sequelize = require("sequelize");

const sequelize = new Sequelize("fantasycardgame", "root", "3572", {
  dialect: 'mysql',
  host: process.env.host,
  define: {
      timestamps: false
  }
});

sequelize.sync().then(result=>{}).catch(err=> console.log(err));

module.exports = {
  Sequelize,
  sequelize
}