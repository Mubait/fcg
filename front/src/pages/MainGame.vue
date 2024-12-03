<script setup>
import BaseButtonStyle from '@/components/BaseButtonStyle.vue'
import { ref } from 'vue';

let isProfileOpen = ref(false)


</script>

<template>
  <main class="absolute overflow-hidden size-full bg-bgMain bg-cover">
    <img class="absolute z-10 left-1/2 -translate-x-1/2 object-contain h-1/3 pointer-events-none" src="/logo/logoOrc.png" alt="regPg"/>

    <div class="relative h-1/9 w-full border-b-4 border-zinc-500 flex items-center
      bg-gradient-to-b from-amber-700/90 to-black/90">

      <div class="grid grid-cols-4 w-7/12 place-items-center">
        <p class="text-2xl cursor-pointer w-fit
        brightness-150 hover:brightness-200 text-blue-500 drop-shadow-[0_0px_10px_rgba(0,0,255,1)]"> {{ $t('mainPage.score') }} </p> 
        <p class="text-2xl cursor-pointer w-fit
        brightness-150 hover:brightness-200 text-blue-500 drop-shadow-[0_0px_10px_rgba(0,0,255,1)]"> {{ $t('mainPage.cards') }} </p> 
        <p class="text-2xl cursor-pointer w-fit
        brightness-150 hover:brightness-200 text-blue-500 drop-shadow-[0_0px_10px_rgba(0,0,255,1)]"> {{ $t('mainPage.friends') }} </p>
        <p class="ml-80 text-2xl cursor-pointer
        brightness-150 hover:brightness-200 text-blue-500 drop-shadow-[0_0px_10px_rgba(0,0,255,1)]"> {{ $t('mainPage.forum') }} </p>
      </div>

      <div class="absolute h-full right-0 flex items-center gap-2 cursor-pointer border-l-2 hover:backdrop-contrast-50" @click="isProfileOpen=!isProfileOpen">
        <img class="relative ml-2 h-5/6" src="/logo/noAvatar.png"/>
        <img class="size-1/4 mr-1" src="/4.mainPg/down-chevron.png"/>
      </div>
    </div>
    <div v-show="isProfileOpen" class="absolute h-1/4 w-1/6 right-0
    bg-gradient-to-b from-blue-950/90 to-black/90">
      <div class="size-full ml-2 flex flex-col justify-center gap-4">

        <div class="flex items-center gap-2">
          <img class="object-contain w-1/9" src="/logo/settings.png"/>
          <p class="size-fit text-zinc-400 hover:text-zinc-200 cursor-pointer">{{ $t('mainPage.settings') }}</p>
        </div>
        <div class="flex items-center gap-2">
          <img class="object-contain w-1/9" src="/logo/help.png"/>
          <p class="size-fit text-zinc-400 hover:text-zinc-200 cursor-pointer">{{ $t('mainPage.help') }}</p>
        </div>
        <div class="flex items-center gap-2">
          <img class="object-contain w-1/9" src="/logo/logout.png"/>
          <p class="size-fit text-zinc-400 hover:text-zinc-200 cursor-pointer">{{ $t('mainPage.logout') }}</p>
        </div>

      </div>
      
    </div>


    <div class="absolute bottom-20 flex justify-center w-full h-fit drop-shadow-[0_25px_30px_rgba(0,0,255,1)]">
      <BaseButtonStyle @click="console.log('ok')"
      :btn-size="'w-60 h-20'"
      :btn-color="'bg-gradient-to-r from-amber-900 via-amber-500 to-amber-900'"
      :btn-color-hover="'bg-gradient-to-r hover:from-amber-700 hover:via-amber-400 hover:to-amber-700'"
      :btn-padding-color="'bg-gradient-to-b from-amber-700 to-amber-950'"
      :btn-text-color="'text-zinc-300'"
      :btn-text-color-hover="'hover:text-zinc-100'"
      :fontSize="'text-3xl'"
      :btn-text="'mainPage.btnPlayText'"
      />
    </div>

  </main>

  

</template>