<script setup>
import BaseCard from '@/components/BaseCard.vue';
import { controllerCards } from '@/js/controller/controllerCards';
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()

const cardsImgArr = ref()

onMounted(() => {
  controllerCards.getCards()
  .then(cardsArr => {
    cardsImgArr.value = cardsArr
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


      <div class="size-fit" v-for="img in cardsImgArr">
        <BaseCard :img-url="'http://localhost:3000'+img.imgUrl"/>
      </div>


      </div>

      <div class="relative h-full w-1/5 border-l-2 border-teal-400 bg-amber-800/95">
      </div>

    </div>

  </main>
</template>