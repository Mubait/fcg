const express = require('express');
const model = require('../../model/model')

const usersRouter = express.Router()

usersRouter.get('/', (req, res) => {
  res.json({message: '/'})
});

usersRouter.post('/signin', (req, res) => {
  const userData = req.body
  const emptyBody = !Object.keys(userData).length ? true : false
  if(emptyBody) {
    console.error('Отсутствует тело запроса')
    return res.sendStatus(400)
  }

  try {
    const userDataIsOkpromise = model.verifyUserData(userData)
    userDataIsOkpromise.then(userDataIsOk => {
      if(userDataIsOk) {
        const token = {
          accessToken: model.generateToken(userData),
          refreshToken: model.generateToken(userData)
        }
        return res.json(token)
      }
      return res.sendStatus(401)
    })
  } catch (err) {
    console.error(err)
    return res.sendStatus(500)
  }
});

usersRouter.post('/signup', (req, res) => {
  const userData = req.body
  const emptyBody = !Object.keys(userData).length ? true : false
  if(emptyBody) {
    console.error('Отсутствует тело запроса')
    return res.sendStatus(400)
  }

  const userCreatedpromise = model.createUser(userData)
  userCreatedpromise.then(userCreated => {
    if(userCreated) return res.sendStatus(200)
    console.error('Ошибка создания пользователя в БД')
    return res.sendStatus(500)
  })

});

module.exports = usersRouter;

