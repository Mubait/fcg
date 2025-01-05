import { modelCards } from "../model/modelCards";
import { cards } from "./routes/cards";

class ControllerCards {
  getCards = () => {
    return modelCards.getCards(cards.axiosGetCards())
  }
  addDecks = (decksData) => {
    return modelCards.addDecks(cards.axiosAddDecks(decksData))
  }
}

const controllerCards = new ControllerCards()

export { controllerCards }