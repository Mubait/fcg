import { modelUsers } from "../model/modelUsers";
import { users } from "./routes/users";

class ControllerUsers {
  userSignin = (userData) => {
    return modelUsers.userSignin(users.axiosPostUserSignin(userData))
  }
  userSignup = (userData) => {
    return modelUsers.userSignup(users.axiosPostUserSignup(userData))
  }
  userAddNick = (userData) => {
    return modelUsers.userAddNick(users.axiosPostUserAddnick(userData))
  }
  userCheckNick = () => {
    return modelUsers.userCheckNick(users.axiosGetUserCheckNick())
  }
  userGetNick = () => {
    return modelUsers.userGetNick(users.axiosGetUserNick())
  }
}

const controllerUsers = new ControllerUsers()

export { controllerUsers }