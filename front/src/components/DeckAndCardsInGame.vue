<script setup>
import { defineEmits, ref } from 'vue';
import BaseCard from './BaseCard.vue';

let cardOnHover = ref()
let rightClassArr = [
  'right-[16%]', 'right-[17%]', 'right-[18%]', 'right-[19%]', 'right-[20%]', 'right-[21%]',
  'right-[22%]', 'right-[23%]', 'right-[24%]', 'right-[25%]', 'right-[26%]', 'right-[27%]'
]

const emit = defineEmits(['chosenCardsArr', 'cardsOnBoard', 'cardOnHover', 'chosenDeck']);

defineProps({
  chosenCardsArr: ref([]),
  cardsOnBoard: ref([]),
  chosenDeck: ref([])
})

</script>

<template>
  <div v-if="cardOnHover" class="absolute h-40 right-[34%] bottom-3 border rounded-lg">
    <BaseCard
      :hp="cardOnHover.hp"
      :damage="cardOnHover.damage"
      :mana="cardOnHover.mana"
      :img-url="'http://localhost:3000'+cardOnHover.imgUrl"
      :text-size="'text-[60%]'"
      :name="cardOnHover.nameRu"
      :type="cardOnHover.type"
      />
  </div>

  <div class="absolute h-28 w-fit border bottom-[3%] rounded-lg transition hover:scale-110 hover:brightness-50 cursor-pointer"
  :class="rightClassArr[index]"
  v-for="(card, index) in chosenCardsArr"
  @click="cardsOnBoard.length < 8 ? (cardsOnBoard.push(card), chosenCardsArr.splice(index, 1)) : console.log('bd')"
  @mouseover="cardOnHover = card" @mouseleave="cardOnHover = null">
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

  <div class="absolute h-32 bottom-[3%] right-[8%] border rounded-lg"
  v-for="(card, index) in chosenDeck">
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