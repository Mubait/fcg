import axios from "axios"

class Users {
  axiosPostUserSignin = (userData) => {
    return axios.post(`${import.meta.env.VITE_URLSERVER}/users/signin`, userData /*{ headers: { Authorization: `Bearer justtoken`}}*/)
  }
  axiosPostUserSignup = (userData) => {
    return axios.post(`${import.meta.env.VITE_URLSERVER}/users/signup`, userData)
  }
  axiosPostUserAddnick = (userData) => {
    return axios.post(`${import.meta.env.VITE_URLSERVER}/users/addnick`, userData, 
      { headers: { Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`}})
  }
  axiosGetUserCheckNick = () => {
    return axios.get(`${import.meta.env.VITE_URLSERVER}/users/checkNickname`,
      { headers: { Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`}}
    )
  }
  axiosGetUserNick = () => {
    return axios.get(`${import.meta.env.VITE_URLSERVER}/users/getNick`,
      { headers: { Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`}}
    )
  }
}

const users = new Users()

export { users }