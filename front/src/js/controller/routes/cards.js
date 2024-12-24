import axios from "axios"

class Cards {
  axiosGetCards = () => {
    return axios.get(`${import.meta.env.VITE_URLSERVER}/cards`,
      { headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}`}}
    )
  }
}

const cards = new Cards()

export { cards }