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
}

const dbcontroller = new DbController()

module.exports = {
  dbcontroller
}