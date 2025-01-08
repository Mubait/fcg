<script setup>
import BaseCard from '@/components/BaseCard.vue';
import ChooseHero from '@/components/ChooseHero.vue';
import { controllerCards } from '@/js/controller/controllerCards';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const accessToken = sessionStorage.getItem('accessToken')
const router = useRouter()
let chosenHero = ref()

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
    
   <ChooseHero @chosenHero="(data) => chosenHero = data"/>

    <div v-if="chosenHero" class="absolute h-1/4 left-[1%] top-1/2 -translate-y-1/2 border rounded-lg">
      <BaseCard
      :hp="chosenHero.hp"
      :damage="chosenHero.effectAttributes.effect"
      :mana="chosenHero.effectAttributes.mana"
      :img-url="'http://localhost:3000'+chosenHero.imgUrl"
      :text-size="'text-[60%]'"
      :name="chosenHero.nameRu"
      />
    </div>


  </main>
</template>