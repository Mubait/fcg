const jwt = require('jsonwebtoken')
const { dbcontroller } = require('../сontroller/dbcontroller')
const { decks } = require('./decks')
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
      // const orcCardsPath = path.join(__dirname, '../assets/cards/heroes/orc/')
      // const elfCardsPath = path.join(__dirname, '../assets/cards/heroes/elf/')

      // const orcArrUrl = await fs.readdir(orcCardsPath).catch(err=>console.err("ошибка чтения директории", err))
      // const elfArrUrl = await fs.readdir(elfCardsPath).catch(err=>console.err("ошибка чтения директории", err))

      // const cards = {orc:[], elf:[]}
      // orcArrUrl.forEach((imgUrl, i)=>{
      //   cards.orc.push({
      //     id: i,
      //     imgUrl: `/cards/heroes/orc/${imgUrl}`,
      //     mana: Math.floor(Math.random() * 10) + 1,
      //     hp: Math.floor(Math.random() * 10) + 1,
      //     damage: Math.floor(Math.random() * 10) + 1,
      //   })
      // })
      // elfArrUrl.forEach((imgUrl, i)=>{
      //   cards.elf.push({
      //     id: i,
      //     imgUrl: `/cards/heroes/elf/${imgUrl}`,
      //     mana: Math.floor(Math.random() * 10) + 1,
      //     hp: Math.floor(Math.random() * 10) + 1,
      //     damage: Math.floor(Math.random() * 10) + 1,
      //   })
      // })
      // return cards

      const cards = await fs.readFile(`${__dirname}/cards.json`, 'utf8')
      const jsonCards = JSON.parse(cards)

      return jsonCards
    } catch(err){
      console.error(err)
    }
  }
  getHeroesCards = async () => {
    const heroesCards = await fs.readFile(`${__dirname}/heroes.json`, 'utf8')
    const jsonHeroesCards = JSON.parse(heroesCards)

    return jsonHeroesCards
  }

  addDecksToDB = (decksData, accessToken) => {
    const userDataDecoded = jwt.decode(accessToken)
    
    // Берем данные пользователя из бд, чтоб получить ид пользователя... Нужно было добавлять в токен сразу при авторизации....
    return dbcontroller.getUser(userDataDecoded)
    .then(userData => {
      decksData.userId = userData.id
      return dbcontroller.createDecks(decksData)
    })
  }
  getDecks = (accessToken) => {
    const userDataDecoded = jwt.decode(accessToken)
    return dbcontroller.getUser(userDataDecoded)
    .then(userData => {
      return dbcontroller.getDecks(userData.id)
    })
  }
}

const model = new Model()

module.exports = model;