<script setup>
import { defineEmits, ref } from 'vue';
import BaseCard from './BaseCard.vue';

const emit = defineEmits(['chosenHero']);

let heroesCardsArr = ref(JSON.parse(sessionStorage.getItem('userInfo')).heroes)
let currentCardHeroIndex = ref()


const isHeroChosen = ref(false)
const backendUrl = import.meta.env.VITE_BACKEND_URL;


const chosenHeroSoundOn = (heroSoundUrl) => {
  const sound = new Howl({
    src: [heroSoundUrl],
    loop: false,
    volume: 0.5,
  })
  sound.play()
}
</script>

<template>
  <p class="absolute text-center top-[15%] w-full text-8xl text-stone-300 drop-shadow-[0_10px_15px_rgba(255,0,0,1)]">
    {{ $t('qpgamePage.chooseHero') }}
  </p>
  <div class="relative h-1/2 w-full top-1/2 -translate-y-1/2 p-5 overflow-x-scroll overflow-y-hidden border-y-2 border-green-400
  scrollbar-thin scrollbar-thumb-rounded-full scrollbar-thumb-teal-600 active:scrollbar-thumb-teal-300
  bg-gradient-to-r backdrop-blur-sm from-black/80 via-teal-900/80 to-black/80
  flex items-center space-x-32
  animate-fromBlur">
    
    <div class="relative size-fit min-w-[15%] transition cursor-pointer border rounded-lg
    hover:scale-105" v-for="(heroCard, index) in heroesCardsArr"
    @mouseover="currentCardHeroIndex = index" @mouseleave="currentCardHeroIndex = null"
    @click="chosenHeroSoundOn(backendUrl+heroCard.voice[0]), emit('chosenHero', heroCard), isHeroChosen = true">
      <div v-if="currentCardHeroIndex == index" class="absolute size-full bg-black/70 rounded-xl 
      animate-[fromBlur_0.5s_ease-in-out_forwards]
      py-5 flex-col z-10">
        <p class="text-white text-4xl text-center">{{heroCard.nameRu}}</p>
        <p class="mt-5 mx-3 text-white text-2xl">{{$t('qpgamePage.hp')}} {{heroCard.hp}}</p>
        <p class="mt-1 mx-3 text-white text-2xl">{{$t('qpgamePage.mana')}} {{heroCard.effectAttributes.mana}}</p>
        <p class="mt-1 mx-3 text-white text-2xl">{{$t('qpgamePage.ability')}} {{heroCard.effectAttributes.type}}</p>
      </div>
      <BaseCard
      :img-url="`${backendUrl}${heroCard.imgUrl}`"
      :mana="heroCard.effectAttributes.mana"
      :damage="heroCard.effectAttributes.effect"
      :hp="heroCard.hp"
      :text-size="'text-[12px]'"
      />
    </div>

  </div>
</template>