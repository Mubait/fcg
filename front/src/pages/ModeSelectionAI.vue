<script setup>
import { useRouter } from 'vue-router';

const router = useRouter()
</script>

<template>
  <main class="fixed size-full bg-gradient-to-r from-indigo-950 to-black">
    <img class="absolute ml-2 mt-2 object-contain h-1/4 cursor-pointer hover:brightness-50" src="/logo/logoOrc.png" alt="regPg" 
    @click="router.push('/main')"/>

    <div class="absolute h-1/2 w-1/2 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 grid grid-cols-2 place-items-center">
      <div class="h-full w-72 bg-zinc-800 rounded-3xl cursor-pointer
      hover:brightness-200">
        <p class="size-full flex items-center justify-center drop-shadow-[0_0px_30px_rgba(255,255,255)]
        text-2xl text-zinc-500">{{ $t('modeSelectionAIpage.campaign') }}</p>
      </div>

      <div class="h-full w-72 bg-zinc-800 rounded-3xl cursor-pointer
      hover:brightness-200">
        <p class="size-full flex items-center justify-center text-center drop-shadow-[0_0px_30px_rgba(255,255,255)]
        text-2xl text-zinc-500">{{ $t('modeSelectionAIpage.quickPlay') }}</p>
      </div>
    </div>


  </main>
</template>