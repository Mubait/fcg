import axios from "axios"

class Users {
  axiosPostUserSignin = (userData) => {
    return axios.post(`${import.meta.env.VITE_URLSERVER}/users/signin`, userData /*{ headers: { Authorization: `Bearer justtoken`}}*/)
  }
  axiosPostUserSignup = (userData) => {
    return axios.post(`${import.meta.env.VITE_URLSERVER}/users/signup`, userData)
  }
  axiosPostUserAddnickname = (userData) => {
    return axios.post(`${import.meta.env.VITE_URLSERVER}/users/addnick`, userData, { headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}`}})
  }
}

const users = new Users()

export { users }