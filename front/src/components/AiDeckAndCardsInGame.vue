<script setup>
import { defineEmits, ref } from 'vue';
import BaseCard from './BaseCard.vue';

let rightClassArr = [
  'right-[16%]', 'right-[17%]', 'right-[18%]', 'right-[19%]', 'right-[20%]', 'right-[21%]',
  'right-[22%]', 'right-[23%]', 'right-[24%]', 'right-[25%]', 'right-[26%]', 'right-[27%]'
]

const emit = defineEmits(['chosenCardsArr', 'cardsOnBoard', 'cardOnHover', 'chosenDeck']);

defineProps({
  aiChosenCardsArr: ref([]),
  aiChosenDeck: ref([])
})
</script>

<template>
  <div class="absolute h-28 w-fit border top-[3%] rounded-lg transition hover:scale-110 hover:brightness-50 cursor-pointer"
    :class="rightClassArr[index]"
    v-for="(card, index) in aiChosenCardsArr">
      <BaseCard
      :hp="card.hp"
      :damage="card.damage"
      :mana="card.mana"
      :img-url="'http://localhost:3000'+card.imgUrl"
      :text-size="'text-[50%]'"
      :name="card.nameRu"
      :type="card.type"
      />
    </div>

    <div class="absolute h-32 top-[3%] right-[8%] border rounded-lg"
    v-for="(card, index) in aiChosenDeck">
      <BaseCard
        :hp="card.hp"
        :damage="card.damage"
        :mana="card.mana"
        :img-url="'http://localhost:3000'+card.imgUrl"
        :text-size="'text-[50%]'"
        :name="card.nameRu"
        :type="card.type"
      />
    </div>
</template>