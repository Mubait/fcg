<script setup>
import BaseCard from '@/components/BaseCard.vue';
import ChooseDeck from '@/components/ChooseDeck.vue';
import ChooseHero from '@/components/ChooseHero.vue';
import { controllerCards } from '@/js/controller/controllerCards';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const accessToken = sessionStorage.getItem('accessToken')
const router = useRouter()
let chosenHero = ref()
let chosenDeck = ref()
let cardOnHover = ref()
// let deckArr = ref(JSON.parse())

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
    
   <ChooseHero @chosenHero="(data) => chosenHero = data" v-if="chosenDeck&&!chosenHero"/>
    <ChooseDeck @chosen-deck="(data) => chosenDeck = data" v-if="!chosenDeck"/>

    <div class="size-full" v-if="chosenDeck&&chosenHero">
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


      <div v-if="cardOnHover" class="absolute h-48 right-[21%] bottom-3 border rounded-lg">
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

      <div class="absolute h-28 w-[20%] bottom-3 right-0"> 
        <div class="absolute h-28 w-fit border rounded-lg right-0 transition hover:scale-110 hover:brightness-50 cursor-pointer"
        :class="`left-[${index*2}%]`"
        v-for="(card, index) in chosenDeck"
        @click="chosenDeck.splice(index, 1), cardOnHover = null"
        @mouseover="cardOnHover = card" @mouseleave="cardOnHover = null">
          <BaseCard
          :hp="card.hp"
          :damage="card.damage"
          :mana="card.mana"
          :img-url="'http://localhost:3000'+card.imgUrl"
          :text-size="'text-[60%]'"
          :name="card.nameRu"
          :type="card.type"
          />
        </div>
      </div>


    </div>

  </main>
</template>