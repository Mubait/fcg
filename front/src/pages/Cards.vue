<script setup>
import BaseButtonStyle from '@/components/BaseButtonStyle.vue';
import BaseCard from '@/components/BaseCard.vue';
import { controllerCards } from '@/js/controller/controllerCards';
import axios from 'axios';
import { inject, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()

const cardsArr = ref()

onMounted(() => {
  controllerCards.getCards()
  .then(cardsArrReturned => {
    cardsArr.value = cardsArrReturned
  })
  .catch(function (err) {
    console.log(err)
  })
});

</script>

<template>
  <main class="fixed size-full bg-bgCards bg-cover">
    
    <img class="absolute ml-2 mt-2 object-contain h-1/6 cursor-pointer hover:brightness-50 select-none" src="/logo/logoOrc.png"
    @click="router.push('/main')"/>

    <div class="absolute right-0 h-full w-[88%] flex justify-end">

      <div class="relative w-full h-[90%] top-1/2 -translate-y-1/2 mr-20 p-5 overflow-y-scroll
      scrollbar-thin scrollbar-thumb-rounded-full scrollbar-thumb-teal-600 active:scrollbar-thumb-teal-300
      border-2 border-teal-400 bg-teal-900/60 backdrop-blur-lg grid grid-cols-4 gap-10 place-items-center">

        <div class="relative size-fit" v-for="property in cardsArr">
          <BaseCard 
          :img-url="'http://localhost:3000'+property.imgUrl"
          :damage="property.damage"
          :hp="property.hp"
          :mana="property.mana"
          :type="property.type"
          :name="property.nameRu"
          />
          <!-- костыль с name, исправить !!! -->
        </div>

      </div>

      <div class="relative h-full w-1/5 border-l-2 border-teal-400 bg-amber-800/95
      flex flex-col items-center gap-8">

        <input class="mt-3 bg-red-400 h-10 w-48 rounded-lg text-center text-2xl font-bold pb-2 text-zinc-300
        bg-gradient-to-b from-teal-500 to-black drop-shadow-[0_10px_10px_rgba(0,0,0,1)]"
        :placeholder="$t('cardsPage.search')"/>

        <select id="fractions" class="h-10 w-48 rounded-lg text-center text-2xl font-bold pb-2 text-zinc-300
        bg-gradient-to-b from-teal-500 to-black drop-shadow-[0_10px_10px_rgba(0,0,0,1)]">
          <option selected class="bg-emerald-800 text-zinc-300 text-2xl  font-bold">{{$t('cardsPage.fractions')}}</option>
          <option value="orc" class="bg-emerald-800 text-zinc-300 text-2xl  font-bold">{{$t('cardsPage.orcs')}}</option>
          <option value="elf" class="bg-emerald-800 text-zinc-300 text-2xl  font-bold">{{$t('cardsPage.elfs')}}</option>
        </select>

        <BaseButtonStyle class="drop-shadow-[0_10px_8px_rgba(105,0,38,1)]"
        :btn-size="'w-44 h-12'"
        :btn-color="'bg-gradient-to-r from-emerald-900 via-emerald-500 to-emerald-900'"
        :btn-color-hover="'bg-gradient-to-r hover:from-emerald-700 hover:via-emerald-400 hover:to-emerald-700'"
        :btn-padding-color="'bg-gradient-to-b from-emerald-500 to-emerald-950'"
        :btn-text-color="'text-zinc-300'"
        :btn-text-color-hover="'hover:text-zinc-100'"
        :btn-text="'cardsPage.createDeck'"
        />

      </div>

    </div>

  </main>
</template>