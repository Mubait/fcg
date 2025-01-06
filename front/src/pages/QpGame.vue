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
  heroesCardsArr.value = heroesCardsArrReturned.orc.concat(heroesCardsArrReturned.elf)
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
    
    <div class="fixed h-1/2 w-full top-1/2 -translate-y-1/2 p-5
    bg-gradient-to-r backdrop-blur-sm from-black/80 via-teal-900/80 to-black/80
    flex space-x-32">
      
      <div v-for="heroCard in heroesCardsArr">
        <BaseCard
        :img-url="'http://localhost:3000' + heroCard.imgUrl"
        :mana="heroCard.effectAttributes.mana"
        :damage="heroCard.effectAttributes.damage"
        :hp="heroCard.hp"
        :text-size="'text-[12px]'"
        />
      </div>

    </div>


  </main>
</template>