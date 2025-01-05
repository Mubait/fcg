const { users } = require('../entities/EUsers')
const { decks } = require('../entities/EDecks')

class DbModel {
  createUser = (userData) => {
    return users.create(userData).then(userCreated => {
      return true
    }).catch(err => {
      console.error('Ошибка создания пользователя. Возможно, пользователь с такими email уже существует', err)
      return false
    })
  }
  getUser = (userData) => {
    try {
      return users.findOne({ where: { email: userData.email, password: userData.password }})
    } catch (err) {
      console.error('Ошибка чтения пользователя', err)
      return false
    }
  }
  updateUser = (userData) => {
    return users.update(userData, { where: { email: userData.email } }).then(userUpdated => {
      return true
    }).catch(err => {
      console.error('Ошибка обновления данных пользователя', err)
      return false
    })
  }

  createDeck = (deckData) => {
    return decks.create(deckData).then(deckCreated => {
      return true
    }).catch(err => {
      console.error('Ошибка создания колоды. Возможно, такого ид пользователя нет', err)
      return false
    })
  }
}

const dbmodel = new DbModel()

module.exports = {
  dbmodel
}

