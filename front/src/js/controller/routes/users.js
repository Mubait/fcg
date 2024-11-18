import axios from "axios"

const users = {
  axiosPostUsersSignup: (userData) => {
    console.log(import.meta.env.VITE_URLSERVER)
    return axios.post(`${import.meta.env.VITE_URLSERVER}/users/signup`, userData, { headers: { Authorization: `Bearer justtoken`}})
  }
}

export { users }