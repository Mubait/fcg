class ModelUsers {
  userSignin = (userSigninPromise) => {
    return userSigninPromise
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
  userSignup = (userSignupPromise) => {
    return userSignupPromise
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
  userAddNick = (userAddNickPromise) => {
    return userAddNickPromise
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
  userCheckNick = (userCheckNickPromise) => {
    return userCheckNickPromise
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
  userGetNick = (userGetNickPromise) => {
    return userGetNickPromise
    .then(function (response) {
      console.log(response.data)
      if(response.status == 200)
        return response.data.username
      return false
    })
    .catch(function (error) {
      console.log(error)
      return false
    })
  }
}

const modelUsers = new ModelUsers()

export { modelUsers }