<script setup>
import { useRouter } from 'vue-router';

const router = useRouter()
</script>

<template>
  <main class="fixed size-full bg-gradient-to-r from-indigo-950 to-black">
    <img class="absolute ml-2 mt-2 object-contain h-1/6 cursor-pointer hover:brightness-50 select-none" src="/logo/logoOrc.png"
    @click="router.push('/main')"/>

    <div class="absolute h-1/2 w-1/2 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 grid grid-cols-2 place-items-center select-none">

      <div class="relative h-full w-72 rounded-3xl cursor-pointer overflow-hidden drop-shadow-[0_20px_20px_rgba(148,134,117,1)]" 
      @click="console.log('ok')">
        <img class="absolute transition duration-300
        object-cover size-full hover:scale-110 hover:brightness-75 cursor-pointer brightness-50" src="/5.modeSelectionAIPg/campaign.jpg"/>
        <p class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
        text-2xl text-white">{{ $t('modeSelectionAIpage.campaign') }}</p>
      </div>

      <div class="relative h-full w-72 rounded-3xl cursor-pointer overflow-hidden drop-shadow-[0_20px_20px_rgba(148,134,117,1)]" 
      @click="console.log('ok')">
        <img class="absolute transition duration-300 
        object-cover size-full hover:scale-110 hover:brightness-75 cursor-pointer brightness-50" src="/5.modeSelectionAIPg/quickPlay.jpg"/>
        <p class="absolute w-full text-center top-1/2 -translate-y-1/2 mx-auto
        text-2xl text-white">{{ $t('modeSelectionAIpage.quickPlay') }}</p>
      </div>
      
    </div>


  </main>
</template>