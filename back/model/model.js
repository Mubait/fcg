const jwt = require('jsonwebtoken');
const { dbcontroller } = require('../сontroller/dbcontroller');

class Model {

  createUser = (userData) => {
    return dbcontroller.createUser(userData)
  }
  verifyUserData = (userData) => {
    return dbcontroller.getUser(userData)
    .then(result => {
      if(result == null) {
        console.error('Данные пользователя не совпадают')
        return false
      }
      return true
    })
  }


  generateToken = (userData) => jwt.sign(userData, process.env.SECRET_KEY, { expiresIn: '24h' })
  verifyToken = (token) => jwt.verify(token, process.env.SECRET_KEY)
}

const model = new Model()

module.exports = model;