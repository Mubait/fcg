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

let playerMana = ref(1)
let enemyMana = ref(1)
let currentMove = ref()
let aiMove = ref(false)

let chosenHero = ref()
let chosenDeckArr = ref([])
let cardsInHandArr = ref([])
let cardsInBoardArr = ref([])
let playerCardAttack = ref({card: null, index: null})
let playerCardAttackedJSON = ref({})
let isPlayerCardAttackArr = ref([])
let isHeroAttack = ref()
let playerIsWin = ref(false)
let playerIsLose = ref(false)

let aiChosenHero = ref()
let aiChosenDeckArr = ref([])
let aiCardsInHandArr = ref([])
let aiCardsInBoardArr = ref([])
let aiCardAttack = ref()
let isAiCardAttackArr = ref([])


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

    <div class="size-full" v-if="deckChosen&&chosenHero&&!playerIsWin&&!playerIsLose">

      <!-- <div class="absolute size-40 bg-red-400 focus:bg-black" @click="console.log(playerIsWin)"></div> -->

      <EnemyField
      @ai-move="(data) => aiMove = data"
      @player-card-attack="(data) => playerCardAttack = data"
      @player-card-attacked-JSON="(data) => playerCardAttackedJSON = data"
      @ai-card-attack="(data) => aiCardAttack = data"
      @enemy-mana="(data) => enemyMana = data"
      @is-hero-attack="(data) => isHeroAttack = data"
      @player-is-win="(data) => playerIsWin = data"
      @player-is-lose="(data) => playerIsLose = data"
      :ai-chosen-deck-arr="aiChosenDeckArr"
      :ai-cards-in-hand-arr="aiCardsInHandArr"
      :ai-cards-in-board-arr="aiCardsInBoardArr"
      :ai-chosen-hero="aiChosenHero"
      :enemy-mana="enemyMana"
      :ai-move="aiMove"
      :player-card-attack="playerCardAttack"
      :cards-in-board-arr="cardsInBoardArr"
      :is-player-card-attack-arr="isPlayerCardAttackArr"
      :is-ai-card-attack-arr="isAiCardAttackArr"
      :chosen-hero="chosenHero"
      />

      <PlayerField
      @player-card-attack="(data) => playerCardAttack = data"
      @player-card-attacked-JSON="(data) => playerCardAttackedJSON = data"
      @player-mana="(data) => playerMana = data"
      @is-hero-attack="(data) => isHeroAttack = data"
      :chosen-deck-arr="chosenDeckArr"
      :cards-in-hand-arr="cardsInHandArr"
      :cards-in-board-arr="cardsInBoardArr"
      :chosen-hero="chosenHero"
      :player-mana="playerMana"
      :player-card-attacked-JSON="playerCardAttackedJSON"
      :ai-card-attack="aiCardAttack"
      :is-player-card-attack-arr="isPlayerCardAttackArr"
      :is-hero-attack="isHeroAttack"
      />
    
      <CurrentMoveInfo
      @player-mana="(data) => playerMana = data"
      @enemy-mana="(data) => enemyMana = data"
      @ai-move="(data) => aiMove = data"
      :player-mana="playerMana"
      :cards-in-hand-arr="cardsInHandArr"
      :cards-in-board-arr="cardsInBoardArr"
      :chosen-deck-arr="chosenDeckArr"
      :ai-cards-in-hand-arr="aiCardsInHandArr"
      :ai-cards-in-board-arr="aiCardsInBoardArr"
      :ai-chosen-deck-arr="aiChosenDeckArr"
      :is-player-card-attack-arr="isPlayerCardAttackArr"
      :is-ai-card-attack-arr="isAiCardAttackArr"
      :ai-move="aiMove"
      :chosen-hero="chosenHero"
      />

      </div>

      <div class="absolute w-full h-1/3 top-1/2 -translate-y-1/2
      bg-gradient-to-r backdrop-blur-sm from-black/80 via-teal-900/80 to-black/80
      flex items-center justify-center
      border-y-2 animate-fromBlur"
      v-if="playerIsWin">
        <p class="text-zinc-200 text-9xl ">{{ $t('qpgamePage.win') }}</p>
      </div>
      <div class="absolute w-full h-1/3 top-1/2 -translate-y-1/2
      bg-gradient-to-r backdrop-blur-sm from-black/80 via-red-700/80 to-black/80
      flex items-center justify-center
      border-y-2 animate-fromBlur"
      v-else-if="playerIsLose">
        <p class="text-zinc-200 text-9xl ">{{ $t('qpgamePage.lose') }}</p>
      </div>

  </main>
</template>