import axios from "axios"

class Cards {
  axiosGetCards = () => {
    return axios.get(`${import.meta.env.BACKEND_URL}/cards`,
      { headers: { Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`}}
    )
  }
  axiosGetHeroesCards = () => {
    return axios.get(`${import.meta.env.BACKEND_URL}/cards/getHeroesCards`,
      { headers: { Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`}}
    )
  }
  axiosAddDecks = (decksData) => {
    return axios.post(`${import.meta.env.BACKEND_URL}/cards/addDecks`, decksData,
      { headers: { Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`}}
    )
  }
  axiosGetDecks = () => {
    return axios.get(`${import.meta.env.BACKEND_URL}/cards/getDecks`,
      { headers: { Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`}}
    )
  }
}

const cards = new Cards()

export { cards }