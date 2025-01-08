import { controllerCards } from "./controller/controllerCards"
import { controllerUsers } from "./controller/controllerUsers"
import { userInfo } from "./userInfo"

const preloadData = () => {
  const getheroesCardsPromise = controllerCards.getHeroesCards().then(heroesCardsArrReturned => {
    userInfo.heroes = heroesCardsArrReturned.orc
    .concat(heroesCardsArrReturned.elf)
    .concat(heroesCardsArrReturned.werewolf)
    .concat(heroesCardsArrReturned.undead)
    .concat(heroesCardsArrReturned.human)
  })
  const getDecksPromise = controllerCards.getDecks().then(decksData => {
    try {
      userInfo.decks = decksData.attributes
    } catch (err) {
      console.error(err)
    }
  })

  Promise.all([getheroesCardsPromise, getDecksPromise])
  .then(() => {
    sessionStorage.setItem('userInfo', JSON.stringify(userInfo))
  })
}

export default preloadData