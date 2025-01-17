<script setup>
import AiDeckAndCardsInGame from '@/components/AiDeckAndCardsInGame.vue';
import AiHeroAndCardsOnBoard from '@/components/AiHeroAndCardsOnBoard.vue';
import BaseButtonStyle from '@/components/BaseButtonStyle.vue';
import BaseCard from '@/components/BaseCard.vue';
import ChooseDeck from '@/components/ChooseDeck.vue';
import ChooseHero from '@/components/ChooseHero.vue';
import CurrentMoveInfo from '@/components/CurrentMoveInfo.vue';
import DeckAndCardsInGame from '@/components/DeckAndCardsInGame.vue';
import HeroAndCardsOnBoard from '@/components/HeroAndCardsOnBoard.vue';
import { controllerCards } from '@/js/controller/controllerCards';
import { computed, onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

const accessToken = sessionStorage.getItem('accessToken')
const router = useRouter()
let chosenHero = ref()
let chosenDeck = ref()
let cardsOnBoard = ref([])
let currentMove = ref(1)
let currentMana = ref(1)
let chosenCardsArr = ref([])

let aiChosenHero = ref()
let aiChosenDeck = ref([])
let aiCardsOnBoard = ref([])
let aiChosenCardsArr = ref([])

let playerCardAttack = ref()

controllerCards.getCards().then(cardsReturned => {
  let cardsReturnedArr = cardsReturned.elf.concat(cardsReturned.orc)
  for(let i = 0; i < 12; i++) {
    let jsonCard = { ...cardsReturnedArr[Math.floor(Math.random() * cardsReturnedArr.length)] }
    aiChosenDeck.value.push(jsonCard)
  }
  aiChosenCardsArr.value.push(aiChosenDeck.value.at(-1))
  aiChosenDeck.value.pop()
})
controllerCards.getHeroesCards().then(heroesCardsReturned => {
  let heroesCardsArrReturned = heroesCardsReturned.orc
  .concat(heroesCardsReturned.elf)
  .concat(heroesCardsReturned.werewolf)
  .concat(heroesCardsReturned.undead)
  .concat(heroesCardsReturned.human)
  aiChosenHero.value = heroesCardsArrReturned[Math.floor(Math.random() * heroesCardsArrReturned.length)]
})

let soundUrl = ref('http://localhost:3000/audio/orc/1_chosen.mp3')
let sound = new Howl({
  src: [soundUrl.value],
  loop: false,
  volume: 0.5,
});


const func = () => {
  sound.play()
  soundUrl = 'http://localhost:3000/audio/orc/2_chosen.mp3'
  sound = new Howl({
    src: ['http://localhost:3000/audio/orc/2_chosen.mp3'],
    loop: false,
    volume: 0.5,
  })
}

const addDataInDeck = (data) => {
  chosenDeck.value = data
  chosenCardsArr.value.push(chosenDeck.value.at(-1))
  chosenDeck.value.pop()
}

if (!accessToken) {
  alert('Вы не авторизованы!')
  router.push('/auth')
}
else {
}
</script>

<template>
  <main class="fixed size-full bg-bgQpgame bg-[length:100%_100%] bg-no-repeat bg-center ">
    <img class="absolute ml-2 mt-2 object-contain h-1/6 cursor-pointer hover:brightness-50 select-none" src="/logo/logoOrc.png"
    @click="router.push('/main')"/>
    
   <ChooseHero @chosenHero="(data) => chosenHero = data" v-if="chosenDeck&&!chosenHero"/>
    <ChooseDeck @chosen-deck="addDataInDeck" v-if="!chosenDeck"/>

    <div class="size-full" v-if="chosenDeck&&chosenHero">

      <!-- <div class="absolute size-40 bg-red-400 focus:bg-black" tabindex="0"></div> -->


      <AiHeroAndCardsOnBoard @playerCardAttack="(data) => playerCardAttack = data" @current-mana="(data) => currentMana = data"
      :ai-chosen-hero="aiChosenHero"
      :ai-cards-on-board="aiCardsOnBoard"
      :player-card-attack="playerCardAttack"
      :current-mana="currentMana"
      />
      <AiDeckAndCardsInGame
      :ai-chosen-cards-arr="aiChosenCardsArr"
      :ai-chosen-deck="aiChosenDeck"
      />











      <HeroAndCardsOnBoard @playerCardAttack="(data) => playerCardAttack = data"
      :chosen-hero="chosenHero"
      :cards-on-board="cardsOnBoard"
      :ai-cards-on-board="aiCardsOnBoard"
      :ai-chosen-hero="aiChosenHero"
      />
      <CurrentMoveInfo @current-mana="(data) => currentMana = data"
      :chosen-cards-arr="chosenCardsArr"
      :chosen-deck="chosenDeck"
      :last-card-in-deck="chosenDeck.at(-1)"
      :cards-on-board="cardsOnBoard"
      :ai-cards-on-board="aiCardsOnBoard"
      :ai-chosen-cards-arr="aiChosenCardsArr"
      :ai-chosen-deck="aiChosenDeck"
      />
      <DeckAndCardsInGame 
      :chosenCardsArr="chosenCardsArr"
      :cardsOnBoard="cardsOnBoard"
      :chosenDeck="chosenDeck"
      />

      </div>

  </main>
</template>