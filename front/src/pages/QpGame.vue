<script setup>
import BaseCard from '@/components/BaseCard.vue';
import { controllerCards } from '@/js/controller/controllerCards';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const accessToken = sessionStorage.getItem('accessToken')
const router = useRouter()
let heroesCardsArr = ref()

controllerCards.getHeroesCards()
.then(heroesCardsArrReturned => {
  heroesCardsArr.value = heroesCardsArrReturned.orc
  .concat(heroesCardsArrReturned.elf)
  .concat(heroesCardsArrReturned.werewolf)
  .concat(heroesCardsArrReturned.undead)
  .concat(heroesCardsArrReturned.human)
})


if (!accessToken) {
  alert('Вы не авторизованы!')
  router.push('/auth')
}
else {
  
}
</script>

<template>
  <main class="fixed size-full bg-bgQpgame bg-[length:100%_100%] bg-no-repeat bg-center ">
    <img class="absolute ml-2 mt-2 object-contain h-1/6 cursor-pointer hover:brightness-50 select-none" src="/logo/logoOrc.png"
    @click="router.push('/main')"/>
    
    <div class="relative h-1/2 w-full top-1/2 -translate-y-1/2 p-5 overflow-x-scroll overflow-y-hidden border-y-2 border-green-400
    scrollbar-thin scrollbar-thumb-rounded-full scrollbar-thumb-teal-600 active:scrollbar-thumb-teal-300
    bg-gradient-to-r backdrop-blur-sm from-black/80 via-teal-900/80 to-black/80
    flex items-center space-x-32">
      
      <div class="relative size-fit min-w-[15%] transition cursor-pointer
      hover:brightness-50 hover:scale-105" v-for="heroCard in heroesCardsArr">
        <BaseCard
        :img-url="'http://localhost:3000' + heroCard.imgUrl"
        :mana="heroCard.effectAttributes.mana"
        :damage="heroCard.effectAttributes.effect"
        :hp="heroCard.hp"
        :text-size="'text-[12px]'"
        />
      </div>

    </div>


  </main>
</template>