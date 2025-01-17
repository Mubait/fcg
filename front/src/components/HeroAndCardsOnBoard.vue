<script setup>
import { defineEmits, ref } from 'vue';
import BaseCard from './BaseCard.vue';

const props = defineProps({
  chosenHero: ref(),
  cardsOnBoard: ref([]),

  aiChosenHero: ref(),
  aiCardsOnBoard: ref([]),
})

const emit = defineEmits(['playerCardAttack'])
</script>

<template>
  <div class="absolute h-1/4 left-[1%] top-1/2 -translate-y-1/2 border rounded-lg">
    <BaseCard
    :hp="chosenHero.hp"
    :damage="chosenHero.effectAttributes.effect"
    :mana="chosenHero.effectAttributes.mana"
    :img-url="'http://localhost:3000'+chosenHero.imgUrl"
    :text-size="'text-[60%]'"
    :name="chosenHero.nameRu"
    />
  </div>

  <div v-auto-animate class="absolute top-[56%] mx-[15%] h-[20%] grid grid-rows-1 grid-cols-8 gap-x-10">
    <div class="border rounded-lg focus:brightness-50 focus:scale-110 hover:brightness-50 transition cursor-pointer" tabindex="0" 
    v-for="card in cardsOnBoard"
    @click="emit('playerCardAttack', card)">
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