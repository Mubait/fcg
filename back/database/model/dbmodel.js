const { users } = require('../entities/EUsers')
const { deps } = require('../entities/EDeps')

class DbModel {
  createUser = (userData) => {
  return users.create(userData).then(userCreated => {
      return true
    }).catch(err => {
      console.error('Ошибка создания пользователя', err)
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
  getDeps = async() => { deps.findAll({raw:true}).then(result=>{
    console.log(result);
  }).catch(err=>console.log(err));
  }
}

const dbmodel = new DbModel()

module.exports = {
  dbmodel
}

