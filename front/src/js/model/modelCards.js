class ModelCards {
  getCards = (getCardsPromise) => {
    return getCardsPromise
    .then(function (response) {
      if(response.status == 200)
        return response.data
      else throw new Error('Http status: ', response.status)
    })
    .catch(function (error) {
      console.log(error)
      return false
    })
  }
}

const modelCards = new ModelCards()

export { modelCards }