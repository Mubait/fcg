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

  checkUserNickname = (accessToken) => {
    const userDataDecoded = jwt.decode(accessToken)
    const userDataPromise = dbcontroller.getUser(userDataDecoded)
    return userDataPromise.then(userData => {
      if(userData.username) return true
      return false
    })
  }

  addUsernameToDb = (userData, accessToken) => {
    const userDataDecoded = jwt.decode(accessToken)
    userDataDecoded.username = userData.username

    return dbcontroller.updateUser(userDataDecoded)
  }

  generateToken = (userData) => jwt.sign(userData, process.env.SECRET_KEY, { expiresIn: '24h' })
  verifyToken = (token) => jwt.verify(token, process.env.SECRET_KEY)
}

const model = new Model()

module.exports = model;