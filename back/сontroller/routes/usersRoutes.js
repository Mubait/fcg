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
    return res.sendStatus(500)
  })

});

usersRouter.post('/addnick', (req, res) => {
  const userData = req.body
  const authHeader = req.headers['authorization']
  const emptyBody = !Object.keys(userData).length ? true : false
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
  } catch (err) {
    console.error('Ошибка проверки токена', err)
    return res.sendStatus(401)
  }

  try {
    const usernameIsAddedPromise = model.addUsernameToDb(userData, accessToken)
    usernameIsAddedPromise.then(usernameIsAdded => {
      if(usernameIsAdded) return res.sendStatus(200)
      return res.sendStatus(500)
    })
  } catch (err) {
    console.error('Ошибка добавления ника в таблицу БД', err)
    return res.sendStatus(500)
  }
});

usersRouter.get('/checkNickname', (req, res) => {
  const authHeader = req.headers['authorization']
  if(!authHeader){
    console.error('Отсутствует токен доступа')
    return res.sendStatus(401)
  }
  
  const accessToken = authHeader.split(' ')[1]
  try {
    model.verifyToken(accessToken)
  } catch (err) {
    console.error('Ошибка проверки токена', err)
    return res.sendStatus(401)
  }

  try {
    const userNicknameIsExistPromise = model.checkUserNickname(accessToken)
    userNicknameIsExistPromise.then(userNicknameIsExist => {
      if(userNicknameIsExist) return res.sendStatus(200)
      return res.sendStatus(404)
    })
  } catch (err) {
    console.error("Ошибка проверки никнейма", err)
    return res.sendStatus(500)
  }
});

usersRouter.get('/getNick', (req, res) => {
  const authHeader = req.headers['authorization']
  if(!authHeader){
    console.error('Отсутствует токен доступа')
    return res.sendStatus(401)
  }
  
  const accessToken = authHeader.split(' ')[1]
  try {
    model.verifyToken(accessToken)
  } catch (err) {
    console.error('Ошибка проверки токена', err)
    return res.sendStatus(401)
  }

  try {
    const userNickPromise = model.getUserNick(accessToken)
    userNickPromise.then(userNick => {
      if(userNick) return res.json(userNick)
      return res.sendStatus(404)
    })
  } catch (err) {
    console.error("Ошибка получения ника", err)
    return res.sendStatus(500)
  }
});


module.exports = usersRouter;

