const jwt = require('jsonwebtoken')
const { dbcontroller } = require('../сontroller/dbcontroller')
const path = require('path')
const fs = require('fs').promises

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
  getUserNick = (accessToken) => {
    const userDataDecoded = jwt.decode(accessToken)
    const userDataPromise = dbcontroller.getUser(userDataDecoded)
    return userDataPromise.then(userData => {
      if(userData.username) return  { username: userData.username }
      return false
    })
  }

  generateToken = (userData) => jwt.sign(userData, process.env.SECRET_KEY, { expiresIn: '24h' })
  verifyToken = (token) => jwt.verify(token, process.env.SECRET_KEY)

  getCardsJson = async () =>{
    try {
      const orcCardsPath = path.join(__dirname, '../assets/cards/heroes/orc/')
      const elfCardsPath = path.join(__dirname, '../assets/cards/heroes/elf/')

      var cards = {orc: [],elf: []}

      const orcArrUrl = await fs.readdir(orcCardsPath).catch(err=>console.err("ошибка чтения директории", err))
      const elfArrUrl = await fs.readdir(elfCardsPath).catch(err=>console.err("ошибка чтения директории", err))

      orcArrUrl.forEach((imgUrl, i)=>{
        cards.orc.push({
          id: i,
          imgUrl: `/cards/heroes/orc/${imgUrl}`
        })
      })
      elfArrUrl.forEach((imgUrl, i)=>{
        cards.elf.push({
          id: i,
          imgUrl: `/cards/heroes/elf/${imgUrl}`
        })
      })

      return cards
    } catch(err){
      console.err(err)
    }
  }
}

const model = new Model()

module.exports = model;