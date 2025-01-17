<script setup>
import { defineEmits, ref } from 'vue';
import BaseCard from './BaseCard.vue';

const props = defineProps({
  aiChosenHero: ref(),
  aiCardsOnBoard: ref([]),
  playerCardAttack: ref(),
  currentMana: ref()
})

const emit = defineEmits(['playerCardAttack', 'currentMana'])
const damageGetted = ref(false)
const currentInd = ref()
const aiCardClicked = ref(false)

const attack = (card, index) => {
  if (props.playerCardAttack != null) {
    let enoughMana = true
    let remainingMana = null
    if( props.currentMana >= props.playerCardAttack.mana) remainingMana = props.currentMana - props.playerCardAttack.mana
    else { 
      remainingMana = props.currentMana
      enoughMana = false
    }
    emit('currentMana', remainingMana)

    if(!aiCardClicked.value && enoughMana) {
      aiCardClicked.value = true
      currentInd.value = index
      props.aiCardsOnBoard[index].hp =  props.aiCardsOnBoard[index].hp - props.playerCardAttack.damage
      damageGetted.value = true
      setTimeout(() => {
        props.aiCardsOnBoard[index].hp <= 0? props.aiCardsOnBoard.splice(index, 1) : null
        aiCardClicked.value = false
        damageGetted.value = false
        emit('playerCardAttack', null)
      }, 1000)
    }
  }
}
</script>

<template>
  <div class="absolute h-1/4 right-[1%] top-1/2 -translate-y-1/2 border rounded-lg">
    <BaseCard
    :hp="aiChosenHero.hp"
    :damage="aiChosenHero.effectAttributes.effect"
    :mana="aiChosenHero.effectAttributes.mana"
    :img-url="'http://localhost:3000'+aiChosenHero.imgUrl"
    :text-size="'text-[60%]'"
    :name="aiChosenHero.nameRu"
    />
  </div>

  <div v-auto-animate class="absolute bottom-[56%] mx-[15%] h-[20%] grid grid-rows-1 grid-cols-8 gap-x-10">
    <div class="relative border rounded-lg hover:brightness-50 cursor-pointer"
    @click="attack(card, index)"
    v-for="(card, index) in aiCardsOnBoard">
      <p v-if="damageGetted && index == currentInd" class="absolute size-full text-4xl text-white z-10 grid place-items-center">{{ -playerCardAttack.damage }}</p>
      <BaseCard
      :hp="card.hp"
      :damage="card.damage"
      :mana="card.mana"
      :img-url="'http://localhost:3000'+card.imgUrl"
      :text-size="'text-[55%]'"
      :name="card.nameRu"
      :type="card.type"
      />
    </div>
  </div>
</template>