const express = require('express')

const model = require('../../model/model')

const cardsRouter = express.Router()

cardsRouter.get('/', (req, res) => {
  model.getCardsJson().then(cards=>{
    return res.json(cards)
    });

  // const accessToken = req.headers['authorization'].split(' ')[1]
  // if(!accessToken){
  //   console.error('Отсутствует токен доступа')
  //   return res.sendStatus(401)
  // }
  
  // try {
  //   model.verifyToken(accessToken)
  // } catch (err) {
  //   console.error('Ошибка проверки токена', err)
  //   return res.sendStatus(401)
  // }

  // try {
  //   const usernameIsAddedPromise = model.addUsernameToDb(userData, accessToken)
  //   usernameIsAddedPromise.then(usernameIsAdded => {
  //     if(usernameIsAdded) return res.sendStatus(200)
  //     return res.sendStatus(500)
  //   })
  // } catch (err) {
  //   console.error('Ошибка добавления ника в таблицу БД', err)
  //   return res.sendStatus(500)
  // }
});

module.exports = cardsRouter;