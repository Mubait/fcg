<script setup>
import RegNickWindow from '@/components/RegNickWindow.vue'
import { useRouter } from 'vue-router';

const router = useRouter()

const accessToken = sessionStorage.getItem('accessToken')
if (!accessToken) {
  alert('Вы не авторизованы!')
  router.push('/auth')
}

console.log("TEEEST")

</script>

<template>
  <main class="absolute overflow-hidden size-full bg-bgRegNick bg-cover">
    <RegNickWindow />
  </main> 

</template>