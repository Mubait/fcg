const {sequelize, Sequelize } = require('../initdb')

const deps = sequelize.define("deps", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  namedep: {
    type: Sequelize.STRING,
    allowNull: false
  },
  pardep: {
    type: Sequelize.STRING,
    allowNull: false
  }
});


module.exports = {
  deps
}