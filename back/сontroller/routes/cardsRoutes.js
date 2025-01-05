const express = require('express')

const model = require('../../model/model')

const cardsRouter = express.Router()

cardsRouter.get('/', (req, res) => {
  const authHeader = req.headers['authorization']
  if(!authHeader){
    console.error('Отсутствует токен доступа')
    return res.sendStatus(401)
  }
  const accessToken = authHeader.split(' ')[1]

  try {
    model.verifyToken(accessToken)
  } catch(err) {
    console.error('Ошибка проверки токена', err)
    return res.sendStatus(401)
  }

  try{
    model.getCardsJson().then(cards=>{
      return res.json(cards)
    });
  } catch(err) {
    console.error('Ошибка получения карт с директории', err)
    return res.sendStatus(500)
  }
});

cardsRouter.get('/getDecks', (req, res) => {
  const authHeader = req.headers['authorization']
  if(!authHeader){
    console.error('Отсутствует токен доступа')
    return res.sendStatus(401)
  }
  const accessToken = authHeader.split(' ')[1]

  try {
    model.verifyToken(accessToken)
  } catch(err) {
    console.error('Ошибка проверки токена', err)
    return res.sendStatus(401)
  }

  try{
    model.getDecks(accessToken)
    .then(decksData => {
      return res.json(decksData)
    })
  } catch(err) {
    console.error('Ошибка чтения колод с БД', err)
    return res.sendStatus(500)
  }
});

cardsRouter.post('/addDecks', (req, res) => {
  const decksData = req.body
  const emptyBody = !Object.keys(decksData).length ? true : false
  const authHeader = req.headers['authorization']
  if(emptyBody) {
    console.error('Отсутствует тело запроса')
    return res.sendStatus(400)
  }
  if(!authHeader){
    console.error('Отсутствует токен доступа')
    return res.sendStatus(401)
  }
  const accessToken = authHeader.split(' ')[1]
  
  try {
    model.verifyToken(accessToken)
  } catch(err) {
    console.error('Ошибка проверки токена', err)
    return res.sendStatus(401)
  }

  try{
    model.addDecksToDB(decksData, accessToken).then(decksAdded => {
      if(decksAdded) return res.sendStatus(200)
      return res.sendStatus(500)
    })
  } catch(err) {
    console.error('Ошибка добавления колод', err)
    return res.sendStatus(500)
  }
});
module.exports = cardsRouter;