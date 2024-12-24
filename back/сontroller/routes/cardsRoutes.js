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

module.exports = cardsRouter;