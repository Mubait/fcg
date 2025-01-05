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

  createDecks = (decksData) => {
    return decks.findOrCreate({
        where: { userId: decksData.userId },
        defaults: decksData // Значения по умолчанию для создания новой записи
    }).then(([deck, created]) => {
        if (!created) {
            return deck.update(decksData) // Обновляем существующую запись
        }
        return true
    }).catch(err => {
        console.error('Ошибка чтения или обновления колод:', err);
    })
  }
  getDecks = (id) => {
    try {
      return decks.findOne({ where: { userId: id } })
    } catch (err) {
      console.error('Ошибка чтения колод', err)
      return false
    }
  }
}

const dbmodel = new DbModel()

module.exports = {
  dbmodel
}

