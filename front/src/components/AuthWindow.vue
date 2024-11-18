<script setup>
import { ref, onMounted, reactive } from 'vue'
import { controller } from '@/js/controller/controller'

const userData = {email: '', password: ''}
let userSignin = () => {
  console.log(userData)
}

const userSignup = () => {
  controller.signup(userData)
}

onMounted(() => {
})
</script>


<template>
  <div class="absolute w-1/5 h-screen flex flex-col justify-center ml-20">
    
    <div class="absolute w-full h-3/4 bg-gradient-to-b from-blue-950/80 to-black/80 flex flex-col justify-center rounded-lg">
      <img class="absolute bottom-3/4" src="/logo/logoOrc.png" alt="regPg"/>
      
      <div class="mx-10">
        <div class="grid gap-4">
          <p class="text-gray-50 text-xl font-sans">{{ $t('authPage.email') }}</p>
          <input v-model="userData.email" class="bg-stone-950 text-gray-400 h-8 rounded-md text-sm pl-4 pb-1 w-full" placeholder="Имя@хост.ru"/>
          <p class="text-gray-50 text-xl font-sans">{{ $t('authPage.password') }}</p>
          <input v-model="userData.password" type="password" class="bg-stone-950 text-gray-400 h-8 rounded-md text-sm pl-4 pb-1 w-full" placeholder="Пароль"/>
        </div>

        <p class="text-sm w-max ml-auto text-sky-400 my-2 font-sans cursor-pointer">{{ $t('authPage.newPassword') }}</p>
        
        <div class="flex justify-between">
          <p @click="userSignin"
          class="text-gray-50 w-max text-xl font-sans cursor-pointer active:text-sky-500">{{ $t('authPage.signIn') }}</p>
          <p @click="userSignup" 
          class="text-gray-50 w-max text-xl font-sans cursor-pointer active:text-sky-500">{{ $t('authPage.signUp') }}</p>
        </div>
      </div>
    </div>

  </div>

</template>