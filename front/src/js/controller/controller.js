import { users } from "./routes/users";

class Controller {
  userSignin = (userData) => {
    return users.axiosPostUserSignin(userData)
    .then(function (response) {
      console.log(response.data)
      const token = response.data
      if(response.status == 200) {
        localStorage.setItem('accessToken', token.accessToken)
        localStorage.setItem('refreshToken', token.refreshToken)
        return true
      }
      return false
    })
    .catch(function (error) {
      console.log(error)
      return false
    })
  }
  userSignup = (userData) => {
    return users.axiosPostUserSignup(userData)
    .then(function (response) {
      console.log(response.data)
      if(response.status == 200)
        return true
      return false
    })
    .catch(function (error) {
      console.log(error)
      return false
    })
  }
  userCheckNickname = () => {
    return users.axiosGetUserCheckNickname()
    .then(function (response) {
      console.log(response.data, response.status)
      if(response.status == 200) {
        return true
      }
      return false
    })
    .catch(function (error) {
      console.log(error)
      return false
    })
  }
}

const controller = new Controller()

export { controller }