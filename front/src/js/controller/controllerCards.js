import { modelCards } from "../model/modelCards";
import { cards } from "./routes/cards";

class ControllerCards {
  getCards = () => {
    return modelCards.getCards(cards.axiosGetCards())
  }
}

const controllerCards = new ControllerCards()

export { controllerCards }