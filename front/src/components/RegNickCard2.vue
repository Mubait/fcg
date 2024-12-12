<script setup>
import { useRouter } from 'vue-router'

import { userInfo } from '@/js/userInfo'

import BaseButtonStyle from './BaseButtonStyle.vue'
import { controller } from '@/js/controller/controller';

const router = useRouter()
let userName = undefined

const nextPage = () => {
  controller.userAddNick({username: userName})
  router.push('/main')
}
</script>

<template>
  <div class="absolute flex justify-center items-center size-full">
    <div class="absolute h-4/5 flex justify-center items-center mt-20">
      <img class="object-contain size-full drop-shadow-[0_25px_20px_rgba(148,134,117,1)] pointer-events-none"
      src="/3.regNicknamePg/card2.png">
      <div class="absolute h-1/2 w-full flex flex-col space-y-4 justify-center items-center">
        <p class="relative text-zinc-200 text-sm drop-shadow-[0_5px_5px_rgba(105,0,38,1)]">{{ $t('regNickPage.enterYourName') }}</p>
        <input v-model="userName" class="relative w-1/2 h-8 drop-shadow-[0_10px_15px_rgba(143,79,0,1)] outline-none rounded-xl text-center font-stalinist
        text-zinc-300 bg-gradient-to-b from-amber-500/70 to-black">
        <BaseButtonStyle class="drop-shadow-[0_10px_8px_rgba(105,0,38,1)]" @click="nextPage"
        :btn-size="'w-44 h-6'"
        :btn-color="'bg-gradient-to-r from-pink-900 via-pink-500 to-pink-900'"
        :btn-color-hover="'bg-gradient-to-r hover:from-pink-700 hover:via-pink-400 hover:to-pink-700'"
        :btn-padding-color="'bg-gradient-to-b from-pink-700 to-pink-950'"
        :btn-text-color="'text-zinc-400'"
        :btn-text-color-hover="'hover:text-zinc-200'"
        :btn-text="'regNickPage.btnText'"
        />
      </div>
    </div>
  </div>
  
</template>

