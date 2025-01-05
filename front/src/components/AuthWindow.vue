<script setup>
import { ref, onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router';
import { controllerUsers } from '@/js/controller/controllerUsers'
import { controllerCards } from '@/js/controller/controllerCards';
import { userInfo } from '@/js/userInfo';

const router = useRouter();
const userData = {email: '', password: ''}
let signinIsOk = ref(false)
let signupIsOk = ref(false)
let signinVisible = ref(false)
let signupVisible = ref(false)
let userSignin = () => {
  const userSigninOk = controllerUsers.userSignin(userData)
  userSigninOk.then(userSigninIsOk => {
    signinVisible.value = true
    if(userSigninIsOk) {
      signinIsOk.value = true
      controllerCards.getDecks().then(decksData => {
        try {
          userInfo.decks = decksData.attributes
        } catch (err) {
          console.error(err)
        }
        sessionStorage.setItem('userInfo', JSON.stringify(userInfo))
      })
      controllerUsers.userCheckNick()
      .then(isUserNickExist => {
        if(isUserNickExist) router.push('/main')
        else router.push('/regnick')
      })
    }
    else 
      signinIsOk.value = false
    
    setTimeout(() => {
      signinVisible.value = false
    }, 2000)
  })
}

const userSignup = () => {
  const userSignupOk = controllerUsers.userSignup(userData)
  userSignupOk.then(userSignupIsOk => {
    signupVisible.value = true
    if(userSignupIsOk)
      signupIsOk.value = true
    else
      signupIsOk.value = false
    

    setTimeout(() => {
      signupVisible.value = false
    }, 2000)
  })
}

onMounted(() => {
})
</script>


<template>
  <div class="absolute w-1/5 h-screen flex flex-col justify-center ml-20">
    
    <div class="absolute w-full h-3/4 bg-gradient-to-b from-blue-950/80 to-black/80 flex flex-col justify-center rounded-lg">
      <img class="absolute bottom-3/4" src="/logo/logoOrc.png" alt="regPg"/>
      
      <div v-auto-animate class="mx-10">
        <div class="grid gap-4">
          <p class="text-gray-50 text-xl font-sans">{{ $t('authPage.email') }}</p>
          <input v-model="userData.email" 
          class="bg-stone-950 text-gray-400 h-8 rounded-md text-sm pl-4 pb-1 w-full" placeholder="Имя@хост.ru"/>
          <p class="text-gray-50 text-xl font-sans">{{ $t('authPage.password') }}</p>
          <input v-model="userData.password" type="password" 
          class="bg-stone-950 text-gray-400 h-8 rounded-md text-sm pl-4 pb-1 w-full" placeholder="Пароль"/>
        </div>

        <p class="text-sm w-max ml-auto text-sky-400 my-2 font-sans cursor-pointer">{{ $t('authPage.newPassword') }}</p>
        
        <div class="flex justify-between">
          <p @click="userSignin"
          class="text-gray-50 w-max text-xl font-sans cursor-pointer active:text-sky-500">{{ $t('authPage.signIn') }}</p>
          <p @click="userSignup" 
          class="text-gray-50 w-max text-xl font-sans cursor-pointer active:text-sky-500">{{ $t('authPage.signUp') }}</p>
        </div>

        <div v-if="signinVisible && !signinIsOk" 
        class="absolute w-full h-auto mt-4 text-center rounded-md
        bg-gradient-to-r from-rose-500/90 to-rose-400/90">{{ $t('authPage.signInIsNotOk') }}</div>
        <div v-if="signupVisible && !signupIsOk" 
        class="absolute w-full h-auto mt-4 text-center rounded-md
        bg-gradient-to-r from-rose-500/90 to-rose-400/90">{{ $t('authPage.signUpIsNotOk') }}</div>
        <div v-else-if="signupVisible && signupIsOk" 
        class="absolute w-full h-6 mt-4 text-center rounded-md
        bg-gradient-to-r from-emerald-500/90 to-emerald-400/90">{{ $t('authPage.signUpIsOk') }}</div>
      </div>
    </div>

  </div>

</template>