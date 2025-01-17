<script setup>
import { defineEmits, ref } from 'vue';
import BaseButtonStyle from './BaseButtonStyle.vue';
import BaseCard from './BaseCard.vue';

const props = defineProps({
  chosenCardsArr: ref([]),
  chosenDeck: ref([]),
  lastCardInDeck: ref(),
  cardsOnBoard: ref([]),
  aiCardsOnBoard: ref([]),
  aiChosenCardsArr: ref([]),
  aiChosenDeck: ref([]),
})
let currentMove = ref(1)
let currentMana = ref(1)
let enemyMana = ref(1)
const emit = defineEmits(['currentMana'])

const nextMove = () => {
  currentMove.value++, currentMana.value++, enemyMana.value++
  emit('currentMana', currentMana)

  props.aiChosenDeck.length != 0 ?  
  props.aiChosenCardsArr.push(props.aiChosenDeck.pop())
  : null

  if (Math.random() < 0.7 && props.aiChosenCardsArr.length != 0) {
    let randomChosenCardInd = Math.floor(Math.random() * props.aiChosenCardsArr.length)
    props.aiCardsOnBoard.length < 8? 
    (props.aiCardsOnBoard.push(props.aiChosenCardsArr[randomChosenCardInd]), props.aiChosenCardsArr.splice(randomChosenCardInd, 1))
    : null
  }

  let enoughMana = false
  let aiChosenCardAttack = props.aiCardsOnBoard[Math.floor(Math.random() * props.aiCardsOnBoard.length)]
  if( enemyMana.value >= aiChosenCardAttack.mana) enoughMana = true
  if (Math.random() < 0.8 && props.cardsOnBoard.length != 0 && props.aiCardsOnBoard.length != 0 && enoughMana) {
    enemyMana.value -= aiChosenCardAttack.mana
    let playerCardAttackedId = Math.floor(Math.random() * props.cardsOnBoard.length)
    let playerCardAttacked = props.cardsOnBoard[playerCardAttackedId]
    props.cardsOnBoard.splice(playerCardAttackedId, 1)
  }
}

</script>

<template>
  <div class="absolute size-fit left-[1%] bottom-[15%]"
  @click="chosenDeck.length != 0? chosenCardsArr.push(chosenDeck.pop()) : null, nextMove()">
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
  <div class="absolute size-fit bottom-[3%] left-[1%] grid grid-rows-3 grid-cols-2 gap-x-5">
    <p class="text-xl size-fit text-white">{{ $t('qpgamePage.currentMove') }}:</p> <p class="text-xl size-fit text-white">{{ currentMove }}</p>
    <p class="text-xl size-fit text-white">{{ $t('qpgamePage.playerMana') }}:</p> <p class="text-xl size-fit text-white">{{ currentMana }}</p>
    <p class="text-xl size-fit text-white">{{ $t('qpgamePage.enemyMana') }}:</p> <p class="text-xl size-fit text-white">{{ enemyMana }}</p>
  </div>
</template>