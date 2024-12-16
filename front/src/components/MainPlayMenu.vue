<script setup>
import { ref } from 'vue';
import BaseButtonStyle from './BaseButtonStyle.vue';
import { useRouter } from 'vue-router';

const router = useRouter()

const isPlayMenuOpen = ref(false)
</script>

<template>
  <div v-show="isPlayMenuOpen" class="absolute w-1/3 h-1/9 left-1/2 -translate-x-1/2 bottom-1/4 flex
  drop-shadow-[0_25px_30px_rgba(0,0,255,1)]">
    <div class="w-1/2 h-full flex justify-center items-center cursor-pointer rounded-l-lg
    bg-gradient-to-b from-sky-700/95 to-black/95 hover:brightness-150">
      <p class="text-zinc-400 text-2xl">{{ $t('mainPage.vsPlayer') }}</p>
    </div>
    <div class="w-1/2 h-full flex justify-center items-center cursor-pointer rounded-r-lg
    bg-gradient-to-b from-red-700/95 to-black/95 hover:brightness-150" @click="router.push('/main/modeselectionai')">
      <p class="text-zinc-400 text-2xl">{{ $t('mainPage.vsAI') }}</p>
    </div>
  </div>

  <div class="absolute bottom-20 flex justify-center w-full h-fit drop-shadow-[0_25px_30px_rgba(0,0,255,1)]">
    <BaseButtonStyle @click="isPlayMenuOpen = !isPlayMenuOpen"
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
</template>