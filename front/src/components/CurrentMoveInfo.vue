<script setup>
import { defineEmits, ref } from 'vue';
import BaseButtonStyle from './BaseButtonStyle.vue';
import BaseCard from './BaseCard.vue';

const props = defineProps({
  cardsInHandArr: ref([]),
  cardsInBoardArr: ref([]),
  chosenDeckArr: ref([]),
  isPlayerCardAttackArr: ref([]),

  aiCardsInHandArr: ref([]),
  aiCardsInBoardArr: ref([]),
  aiChosenDeckArr: ref([]),
  isAiCardAttackArr: ref([]),
})
const emit = defineEmits(['playerMana', 'enemyMana', 'currentMove', 'aiMove'])

let playerMana = ref(1)
let enemyMana = ref(1)
let currentMove = ref(1)

const nextMove = () => {
  playerMana.value++, enemyMana.value++, currentMove.value++
  emit('playerMana', playerMana), emit('enemyMana', enemyMana), emit('aiMove', true)
  
  props.chosenDeckArr.length > 0
  ? props.cardsInHandArr.push(props.chosenDeckArr.pop())
  : null

  props.aiChosenDeckArr.length > 0
  ? props.aiCardsInHandArr.push(props.aiChosenDeckArr.pop())
  : null

  props.isPlayerCardAttackArr.splice(0, props.isPlayerCardAttackArr.length)
  props.isAiCardAttackArr.splice(0, props.isAiCardAttackArr.length)
}

</script>

<template>
  <div class="absolute size-fit left-[1%] bottom-[15%]"
  @click="nextMove()">
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
  <div class="absolute size-fit bottom-[3%] left-[1%] grid grid-rows-3 grid-cols-2 gap-x-5 select-none">
    <p class="text-xl size-fit text-white">{{ $t('qpgamePage.currentMove') }}:</p> <p class="text-xl size-fit text-white">{{ currentMove }}</p>
    <p class="text-xl size-fit text-white">{{ $t('qpgamePage.playerMana') }}:</p> <p class="text-xl size-fit text-white">{{ playerMana }}</p>
    <p class="text-xl size-fit text-white">{{ $t('qpgamePage.enemyMana') }}:</p> <p class="text-xl size-fit text-white">{{ enemyMana }}</p>
  </div>
</template>