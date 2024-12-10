import axios from "axios"

class Users {
  axiosPostUserSignin = (userData) => {
    return axios.post(`${import.meta.env.VITE_URLSERVER}/users/signin`, userData /*{ headers: { Authorization: `Bearer justtoken`}}*/)
  }
  axiosPostUserSignup = (userData) => {
    return axios.post(`${import.meta.env.VITE_URLSERVER}/users/signup`, userData)
  }
  axiosGetUserCheckNickname = () => {
    return axios.get(`${import.meta.env.VITE_URLSERVER}/users/checkNickname`, { headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}`}})
  }
}

const users = new Users()

export { users }