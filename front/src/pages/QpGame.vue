<script setup>
import BaseButtonStyle from '@/components/BaseButtonStyle.vue';
import BaseCard from '@/components/BaseCard.vue';
import ChooseDeck from '@/components/ChooseDeck.vue';
import ChooseHero from '@/components/ChooseHero.vue';
import CurrentMoveInfo from '@/components/CurrentMoveInfo.vue';
import EnemyField from '@/components/EnemyField.vue';
import PlayerField from '@/components/PlayerField.vue';
import { controllerCards } from '@/js/controller/controllerCards';
import { computed, onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

const accessToken = sessionStorage.getItem('accessToken')
const router = useRouter()

let deckChosen = ref(false)

let playerMana = ref()
let enemyMana = ref()
let currentMove = ref()
let aiMove = ref(false)

let chosenHero = ref()
let chosenDeckArr = ref([])
let cardsInHandArr = ref([])
let cardsInBoardArr = ref([])
let playerCardAttack = ref()
let playerCardAttackedJSON = ref({})

let aiChosenHero = ref()
let aiChosenDeckArr = ref([])
let aiCardsInHandArr = ref([])
let aiCardsInBoardArr = ref([])
let aiCardAttack = ref()



controllerCards.getCards().then(cardsReturned => {
  let cardsReturnedArr = cardsReturned.elf.concat(cardsReturned.orc)
  for(let i = 0; i < 12; i++) {
    let jsonCard = { ...cardsReturnedArr[Math.floor(Math.random() * cardsReturnedArr.length)] }
    aiChosenDeckArr.value.push(jsonCard)
  }
  aiCardsInHandArr.value.push(aiChosenDeckArr.value.at(-1))
  aiChosenDeckArr.value.pop()
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
  deckChosen.value = true
  chosenDeckArr.value = data
  cardsInHandArr.value.push(chosenDeckArr.value.at(-1))
  chosenDeckArr.value.pop()
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
    
   <ChooseHero @chosenHero="(data) => chosenHero = data" v-if="deckChosen&&!chosenHero"/>
    <ChooseDeck @chosen-deck="addDataInDeck" v-if="!deckChosen"/>

    <div class="size-full" v-if="deckChosen&&chosenHero">

      <div class="absolute size-40 bg-red-400 focus:bg-black" @click="console.log(aiMove)"></div>

      <EnemyField
      @ai-move="(data) => aiMove = data"
      @player-card-attack="(data) => playerCardAttack = data"
      @player-card-attacked-JSON="(data) => playerCardAttackedJSON = data"
      @ai-card-attack="(data) => aiCardAttack = data"
      @enemy-mana="(data) => enemyMana = data"
      :ai-chosen-deck-arr="aiChosenDeckArr"
      :ai-cards-in-hand-arr="aiCardsInHandArr"
      :ai-cards-in-board-arr="aiCardsInBoardArr"
      :ai-chosen-hero="aiChosenHero"
      :enemy-mana="enemyMana"
      :ai-move="aiMove"
      :player-card-attack="playerCardAttack"
      :cards-in-board-arr="cardsInBoardArr"
      />

      <PlayerField
      @player-card-attack="(data) => playerCardAttack = data"
      @player-card-attacked-JSON="(data) => playerCardAttackedJSON = data"
      @player-mana="(data) => playerMana = data"
      :chosen-deck-arr="chosenDeckArr"
      :cards-in-hand-arr="cardsInHandArr"
      :cards-in-board-arr="cardsInBoardArr"
      :chosen-hero="chosenHero"
      :player-mana="playerMana"
      :player-card-attacked-JSON="playerCardAttackedJSON"
      :ai-card-attack="aiCardAttack"
      />
    
      <CurrentMoveInfo
      @player-mana="(data) => playerMana = data"
      @enemy-mana="(data) => enemyMana = data"
      @ai-move="(data) => aiMove = data"
      :cards-in-hand-arr="cardsInHandArr"
      :cards-in-board-arr="cardsInBoardArr"
      :chosen-deck-arr="chosenDeckArr"
      :ai-cards-in-hand-arr="aiCardsInHandArr"
      :ai-cards-in-board-arr="aiCardsInBoardArr"
      :ai-chosen-deck-arr="aiChosenDeckArr"
      />

      </div>

  </main>
</template>