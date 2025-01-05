const {sequelize, Sequelize } = require('../initdb');
const { users } = require('./EUsers');

const decks = sequelize.define("decks", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  userId: {
    type: Sequelize.INTEGER,
    references: {
      model: users,
      key: 'id',
    },
  },
  attributes: {
    type: Sequelize.JSON
  }
});
users.hasMany(decks, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
});

module.exports = {
  decks
}