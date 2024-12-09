const {sequelize, Sequelize } = require('../initdb')

const users = sequelize.define("users", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  username: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  }
});

module.exports = {
  users
}