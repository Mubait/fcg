<script setup>
import { ref } from 'vue';
import BaseButtonStyle from './BaseButtonStyle.vue';
import BaseCard from './BaseCard.vue';

const props = defineProps({
  chosenCardsArr: ref([]),
  chosenDeck: ref([]),
  lastCardInDeck: ref(),
  aiCardsOnBoard: ref([]),
  aiChosenCardsArr: ref([]),
  aiChosenDeck: ref([])
})

const aiMove = () => {
  props.aiChosenDeck.length != 0 ?  
  props.aiChosenCardsArr.push(props.aiChosenDeck.pop()) // Кладётся в руку, переименовать переменную chosenCard на cardsInHand
  : null

  if (Math.random() < 0.7) {
    let randomChosenCardInd = Math.floor(Math.random() * props.aiChosenCardsArr.length)
    props.aiCardsOnBoard.length < 8? 
    (props.aiCardsOnBoard.push(props.aiChosenCardsArr[randomChosenCardInd]), props.aiChosenCardsArr.splice(randomChosenCardInd, 1))
    : null
  }
}

let currentMove = ref(1)
let currentMana = ref(1)

</script>

<template>
  <div class="absolute size-fit left-[1%] bottom-[11%]"
  @click="chosenDeck.length != 0? chosenCardsArr.push(chosenDeck.pop()) : null, currentMove++, aiMove()">
    <BaseButtonStyle class="drop-shadow-[0_10px_8px_rgba(105,0,38,1)]"
    :btn-size="'w-32 h-12'"
    :btn-color="'bg-gradient-to-r from-emerald-900 via-emerald-500 to-emerald-900'"
    :btn-color-hover="'bg-gradient-to-r hover:from-emerald-700 hover:via-emerald-400 hover:to-emerald-700'"
    :btn-padding-color="'bg-gradient-to-b from-emerald-500 to-emerald-950'"
    :btn-text-color="'text-zinc-300'"
    :btn-text-color-hover="'hover:text-zinc-100'"
    :btn-text="'qpgamePage.finishTurn'"
    :active="'active:brightness-150'"
    />
  </div>
  <div class="absolute size-fit bottom-[3%] left-[1%] grid grid-rows-2 grid-cols-2 gap-x-5">
    <p class="text-xl size-fit text-white">{{ $t('qpgamePage.currentMove') }}:</p> <p class="text-xl size-fit text-white">{{ currentMove }}</p>
    <p class="text-xl size-fit text-white">{{ $t('qpgamePage.currentMana') }}:</p> <p class="text-xl size-fit text-white">{{ currentMove }}</p>
  </div>
</template>