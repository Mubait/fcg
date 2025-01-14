<script setup>
import { ref } from 'vue';
import BaseCard from './BaseCard.vue';

defineProps({
  chosenHero: ref(),
  cardsOnBoard: ref([])
})

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

  <div class="absolute top-[56%] mx-[15%] h-[20%] flex space-x-10">
    <div class="border rounded-lg" v-for="card in cardsOnBoard">
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