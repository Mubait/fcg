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

  createDeck = (decksData) => {
    return dbmodel.createDeck(decksData)
  }
}

const dbcontroller = new DbController()

module.exports = {
  dbcontroller
}