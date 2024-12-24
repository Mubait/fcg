const express = require('express')

const model = require('../../model/model')

const cardsRouter = express.Router()

cardsRouter.get('/', (req, res) => {
  try {
    const accessToken = req.headers['authorization'].split(' ')[1]
    model.verifyToken(accessToken)
  } catch(err) {
    console.error('Ошибка проверки токена или токен отсутствует', err)
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