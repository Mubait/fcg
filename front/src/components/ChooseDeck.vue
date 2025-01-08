<script setup>
import { defineEmits, ref } from 'vue';
import BaseCard from './BaseCard.vue';
import BaseButtonStyle from './BaseButtonStyle.vue';

const currentDeck = ref(0)
const cardsArr = ref(JSON.parse(sessionStorage.getItem('userInfo')).decks)
const isDeckChosen = ref(false)

const emit = defineEmits(['chosenDeck'])
</script>

<template>
    
  <p class="absolute text-center top-[3%] w-full text-5xl text-stone-300 drop-shadow-[0_10px_15px_rgba(255,0,0,1)]"
  v-if="!isDeckChosen">
    {{ $t('qpgamePage.chooseYourDeck') }}</p>

  <div class="absolute size-full flex justify-center top-[12%]"
  v-if="!isDeckChosen">

    <div class="relative w-[75%] h-[85%]">
      <p class="absolute text-3xl text-white right-0 bottom-0 mb-2 mr-3 z-10"> {{ cardsArr[currentDeck].length }}/12 </p>
      <div v-auto-animate class="relative size-full p-5 overflow-y-scroll
      scrollbar-thin scrollbar-thumb-rounded-full scrollbar-thumb-teal-600 active:scrollbar-thumb-teal-300
      border-2 border-teal-400 bg-teal-900/60 backdrop-blur-lg grid grid-cols-4 gap-10 place-items-center"
      @click="console.log(cardsArr)">
        <div class="relative size-fit" v-for="card in cardsArr[currentDeck]">
          <BaseCard 
          :img-url="'http://localhost:3000'+card.imgUrl"
          :damage="card.damage"
          :hp="card.hp"
          :mana="card.mana"
          :type="card.type"
          :name="card.nameRu"
          :text-size="'text-lg'"
          />
        </div>
      </div>
    </div>

    <div class="relative h-[90%] w-10 ml-2 space-y-3">
      <div class="flex items-center cursor-pointer hover:brightness-50" 
      v-for="(deckImg, index) in new Array(3).fill('/4.2.cardsPg/koloda.png')"
      :class="currentDeck == index ? 'brightness-50' : 'brightness-100'"
      @click="currentDeck = index">
        <img class="object-contain h-10" :src="deckImg"/>
        <p class="text-white text-sm">{{ index+1 }}</p>
      </div>
      <BaseButtonStyle class="relative drop-shadow-[0_10px_8px_rgba(105,0,38,1)]" @click="emit('chosenDeck', cardsArr[currentDeck]), isDeckChosen = true"
      :btn-size="'w-44 h-12'"
      :btn-color="'bg-gradient-to-r from-emerald-900 via-emerald-500 to-emerald-900'"
      :btn-color-hover="'bg-gradient-to-r hover:from-emerald-700 hover:via-emerald-400 hover:to-emerald-700'"
      :btn-padding-color="'bg-gradient-to-b from-emerald-500 to-emerald-950'"
      :btn-text-color="'text-zinc-300'"
      :btn-text-color-hover="'hover:text-zinc-100'"
      :btn-text="'qpgamePage.chooseDeck'"
      :active="'active:brightness-150'"
      />
    </div>

  </div>
</template>