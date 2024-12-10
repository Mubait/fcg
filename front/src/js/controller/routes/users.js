import axios from "axios"

class Users {
  axiosPostUserSignin = (userData) => {
    return axios.post(`${import.meta.env.VITE_URLSERVER}/users/signin`, userData)
  }
  axiosPostUserSignup = (userData) => {
    return axios.post(`${import.meta.env.VITE_URLSERVER}/users/signup`, userData)
  }
  axiosPostUserAddNick = (userData) => {
    return axios.post(`${import.meta.env.VITE_URLSERVER}/users/addnick`, userData, { headers: { authorization: `Bearer ${sessionStorage.getItem('accessToken')}`}})
  }
}

const users = new Users()

export { users }