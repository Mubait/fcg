<script setup>
import MainHeader from '@/components/MainHeader.vue';
import MainPlayMenu from '@/components/MainPlayMenu.vue';
import { controllerCards } from '@/js/controller/controllerCards';
import preloadData from '@/js/preloadData';
import { userInfo } from '@/js/userInfo';

import { useRouter } from 'vue-router';

const router = useRouter()

preloadData()


const accessToken = sessionStorage.getItem('accessToken')
if (!accessToken) {
  alert('Вы не авторизованы!')
  router.push('/auth')
}

</script>

<template>
  <main class="absolute overflow-hidden size-full bg-bgMain bg-cover">
    <img class="absolute z-10 left-1/2 -translate-x-1/2 object-contain h-1/3 pointer-events-none" src="/logo/logoOrc.png" alt="regPg"/>

    <MainHeader/>
    <MainPlayMenu/>
  </main>

  

</template>