class UserInfo {
  #username = undefined

  setUserName = (userName) => {
    this.#username = userName
  }
  getUserName = () => {
    return this.#username
  }
}

const userInfo = new UserInfo()

export { userInfo }