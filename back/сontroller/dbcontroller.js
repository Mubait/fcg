const { dbmodel } = require("../database/model/dbmodel")

class DbController {
  createUser = (userData) => {
    return dbmodel.createUser(userData)
  }
  getUser = (userData) => {
    return dbmodel.getUser(userData)
  }
  updateUser = (userData) => {
    return dbmodel.updateUser(userData)
  }

  createDecks = (decksData) => {
    return dbmodel.createDecks(decksData)
  }
  getDecks = (userId) => {
    return dbmodel.getDecks(userId)
  }
}

const dbcontroller = new DbController()

module.exports = {
  dbcontroller
}