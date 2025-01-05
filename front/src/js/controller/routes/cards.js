import axios from "axios"

class Cards {
  axiosGetCards = () => {
    return axios.get(`${import.meta.env.VITE_URLSERVER}/cards`,
      { headers: { Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`}}
    )
  }
  axiosAddDecks = (decksData) => {
    return axios.post(`${import.meta.env.VITE_URLSERVER}/cards/addDecks`, decksData,
      { headers: { Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`}}
    )
  }
  axiosGetDecks = () => {
    return axios.get(`${import.meta.env.VITE_URLSERVER}/cards/getDecks`,
      { headers: { Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`}}
    )
  }
}

const cards = new Cards()

export { cards }