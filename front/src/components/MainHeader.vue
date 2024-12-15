<script setup>
import { controllerUsers } from '@/js/controller/controllerUsers';
import { userInfo } from '@/js/userInfo';
import { ref } from 'vue';

const avatarUrl = ref(sessionStorage.getItem('useravatar') ? sessionStorage.getItem('useravatar') : '/logo/noAvatar.png')
const isProfileOpen = ref(false)
const userName = ref()
const getUserNickPromise = controllerUsers.userGetNick().then(userNick => {
  userName.value = userNick
})

const triggerUploadAvatar = () => {
  document.getElementById('fileInput').click()
}
const onFileChange = (event) => {
  try {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        avatarUrl.value = e.target.result
        userInfo.avatar = e.target.result
        sessionStorage.setItem('useravatar', e.target.result);
      };
      reader.readAsDataURL(file);

      const formData = new FormData()
      formData.append('useravatar', file)
      console.log(formData.get('useravatar'))
    }
  } catch (e) {
    console.error(e)
  }
}
</script>

<template>
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

    <div class="absolute h-full right-0 flex items-center gap-2 cursor-pointer border-l-2 select-none hover:backdrop-contrast-50" @click="isProfileOpen=!isProfileOpen">
      <div class="relative ml-2 size-16 overflow-hidden rounded-full border-2 border-zinc-800">
        <img class="size-full object-cover" :src="avatarUrl"/>
      </div>
      <img class="size-4 mr-2" src="/4.mainPg/down-chevron.png"/>
    </div>
  </div>

  <div v-show="isProfileOpen" class="absolute h-1/2 w-1/6 right-0 rounded-b-xl
  bg-gradient-to-b from-blue-950/90 to-black/90">

    <input type="file" class="hidden" id="fileInput" @change="onFileChange">
    <div class="relative size-28 overflow-hidden rounded-full mx-auto mt-4 
    cursor-pointer select-none hover:brightness-75 border-2 border-zinc-800" 
    @click="triggerUploadAvatar">
      <img class="size-full object-cover" 
      :src="avatarUrl"/>
    </div>

    <p class="relative w-full text-center my-2 text-blue-500 drop-shadow-[0_0px_10px_rgba(0,0,255,1)]">{{ userName }}</p>
    <div class="size-full ml-6 mt-8 flex flex-col gap-4">
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
</template>