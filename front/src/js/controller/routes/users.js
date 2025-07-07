import axios from "axios"

class Users {
  axiosPostUserSignin = (userData) => {
    return axios.post(`${import.meta.env.BACKEND_URL}/users/signin`, userData )
  }
  axiosPostUserSignup = (userData) => {
    return axios.post(`${import.meta.env.BACKEND_URL}/users/signup`, userData)
  }
  axiosPostUserAddnick = (userData) => {
    return axios.post(`${import.meta.env.BACKEND_URL}/users/addnick`, userData, 
      { headers: { Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`}})
  }
  axiosGetUserCheckNick = () => {
    return axios.get(`${import.meta.env.BACKEND_URL}/users/checkNickname`,
      { headers: { Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`}}
    )
  }
  axiosGetUserNick = () => {
    return axios.get(`${import.meta.env.BACKEND_URL}/users/getNick`,
      { headers: { Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`}}
    )
  }
}

const users = new Users()

export { users }