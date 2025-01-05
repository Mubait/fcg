<script setup>
import BaseButtonStyle from "./components/BaseButtonStyle.vue"

import { ref, watch, provide, computed, onMounted } from 'vue'

import {Howl} from 'howler'
import { useI18n } from 'vue-i18n'
import axios from "axios"
import { userInfo } from "./js/userInfo"

const { locale } = useI18n() 

let soundImgUrl = ref("/audio/audio-on.png")
let langImgUrl = ref("/language/ru.png")

const sound = new Howl({
  src: ['/audio/fcg-maintheme.mp3'],
  autoplay: true,
  loop: true,
  volume: 0.5,
});

let soundAction = async () => {
  if(sound.playing()) {
    soundImgUrl.value = "/audio/audio-off.png"
    sound.pause();
  }
  else{
    soundImgUrl.value = "/audio/audio-on.png"
    sound.play();
  }
}

let changeLang = async () => {
  locale.value == 'ru'? (locale.value = 'en', langImgUrl.value = '/language/en.png') : (locale.value = 'ru', langImgUrl.value = '/language/ru.png')
}


onMounted(() => {
})
</script>

<template>
  <RouterView v-auto-animate/>

  <div class="absolute right-0 bottom-0 flex space-x-4 mr-4 items-center">
    <img @click="soundAction" class="relative w-10 h-12 my-2 cursor-pointer" :src="soundImgUrl" alt="audio"/>
    <img @click="changeLang" class="relative w-10 h-10 cursor-pointer my-2" :src="langImgUrl" alt="ruIcon"/>
  </div>

  


  <!-- <button @click="$i18n.locale == 'ru'? $i18n.locale = 'en' : $i18n.locale = 'ru'" class="border-4" >change lang</button> -->

  <!-- <select v-model="$i18n.locale">
    <option v-for="locale in $i18n.availableLocales" :key="`locale-${locale}`" :value="locale">{{ locale }}</option>
  </select> -->

  <!-- <BaseButtonStyle
  :btn-size="'w-48 h-20'"
  :btn-color="'bg-gradient-to-r from-emerald-800 via-emerald-500 to-emerald-800'"
  :btn-color-hover="'bg-gradient-to-r hover:from-emerald-600 hover:via-emerald-300 hover:to-emerald-600'"
  /> -->

</template>