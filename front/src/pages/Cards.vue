<script setup>
import BaseButtonStyle from '@/components/BaseButtonStyle.vue';
import BaseCard from '@/components/BaseCard.vue';
import { controllerCards } from '@/js/controller/controllerCards';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { userInfo } from '@/js/userInfo';

const router = useRouter()

let cardsJson = undefined
let cardsArr = undefined
let currentDeck = undefined
let addedCardArr = undefined
let deckOverflow = undefined
let addDecks = undefined

const accessToken = sessionStorage.getItem('accessToken')
if (!accessToken) {
  alert('Вы не авторизованы!')
  router.push('/auth')
}
else {
  cardsJson = ref()
  cardsArr = ref()
  currentDeck = ref()
  addedCardArr = ref(JSON.parse(sessionStorage.getItem('userInfo')).decks)
  deckOverflow = ref([false, false, false])

  addDecks = () => { // Запрос на добавление колоды в бд
    if(currentDeck.value != null){
      const decks = {
        attributes: addedCardArr.value
      }
      controllerCards.addDecks(decks)
      .then(decksAdded => {
        userInfo.decks = addedCardArr.value
        sessionStorage.setItem('userInfo', JSON.stringify(userInfo))
        console.log(decksAdded)
      })
    }
  }


  onMounted(() => {
    controllerCards.getCards()
    .then(cardsReturned => {
      cardsArr.value = cardsReturned.orc.concat(cardsReturned.elf)
      cardsJson.value = cardsReturned
    })
    .catch(function (err) {
      console.log(err)
    })
  });
}

</script>

<template>
  <main class="fixed size-full bg-bgCards bg-cover" v-if="accessToken">
    
    <img class="absolute ml-2 mt-2 object-contain h-1/6 cursor-pointer hover:brightness-50 select-none" src="/logo/logoOrc.png"
    @click="router.push('/main')"/>

    <div class="absolute right-0 h-full w-[88%] flex justify-end">


      <div class="relative w-full flex h-[90%] top-1/2 -translate-y-1/2">

        <div class="relative size-full p-5 overflow-y-scroll
        scrollbar-thin scrollbar-thumb-rounded-full scrollbar-thumb-teal-600 active:scrollbar-thumb-teal-300
        border-2 border-teal-400 bg-teal-900/60 backdrop-blur-lg grid grid-cols-4 gap-10 place-items-center">

          <div class="relative size-fit" v-for="card in cardsArr" v-show="currentDeck == null">
            <BaseCard 
            :img-url="'http://localhost:3000'+card.imgUrl"
            :damage="card.damage"
            :hp="card.hp"
            :mana="card.mana"
            :type="card.type"
            :name="card.nameRu"
            :text-size="'text-lg'"
            />
          </div>

          <div class="relative size-fit rounded-2xl transition hover:scale-105 animate-[fromBlur_1s_ease-in-out_forwards] hover:brightness-50 hover:border-2 hover:border-red-500 cursor-pointer" 
          v-for="(card, index) in addedCardArr[currentDeck]"
          @click="addedCardArr[currentDeck].splice(index, 1), deckOverflow[currentDeck] = false">
            <BaseCard 
            :img-url="'http://localhost:3000'+card.imgUrl"
            :damage="card.damage"
            :hp="card.hp"
            :mana="card.mana"
            :type="card.type"
            :name="card.nameRu"
            :text-size="'text-md'"
            />
          </div>

        </div>

        <div class="relative h-full w-40 bg-teal-950 backdrop-blur-lg overflow-y-scroll border-2 border-teal-400
        grid grid-cols-1 gap-5 place-items-center p-3
        scrollbar-thin scrollbar-thumb-rounded-full scrollbar-thumb-teal-600 active:scrollbar-thumb-teal-300"
        v-show="currentDeck != null">
          <div class="relative size-fit transition cursor-pointer hover:brightness-50 hover:scale-105" 
          v-for="card in cardsArr"
          @click="addedCardArr[currentDeck].length < 12 ? addedCardArr[currentDeck].push(card) : deckOverflow[currentDeck] = true">
            <BaseCard 
            :img-url="'http://localhost:3000'+card.imgUrl"
            :damage="card.damage"
            :hp="card.hp"
            :mana="card.mana"
            :type="card.type"
            :name="card.nameRu"
            :text-size="'text-[9px]'"
            />
          </div>
        </div>

        <div v-if="currentDeck != null" class="absolute right-3 bottom-1" @click="console.log(deckOverflow[currentDeck])">
          <p class="text-3xl"
          :class="deckOverflow[currentDeck]? 'text-red-600 animate-bounce' : 'text-white'"> {{ addedCardArr[currentDeck].length }}/12 </p>
        </div>

      </div>

      <div class="relative h-[90%] top-1/2 -translate-y-1/2 ml-1 mr-12 space-y-3">
        <img class="object-contain h-10 cursor-pointer hover:brightness-50" src="/4.2.cardsPg/reload.png"
        @click="currentDeck = null"/>
        <div class="flex items-center cursor-pointer hover:brightness-50" 
        v-for="(deckImg, index) in new Array(3).fill('/4.2.cardsPg/koloda.png')"
        :class="currentDeck == index ? 'brightness-50' : 'brightness-100'"
        @click="currentDeck = index">
          <img class="object-contain h-10" :src="deckImg"/>
          <p class="text-white text-sm">{{ index+1 }}</p>
        </div>
      </div>




















      <div class="relative h-full w-1/5 border-l-2 border-teal-400 bg-amber-800/95
      flex flex-col items-center gap-8">

        <input class="mt-3 bg-red-400 h-10 w-48 rounded-lg text-center text-2xl font-bold pb-2 text-zinc-300
        bg-gradient-to-b from-teal-500 to-black drop-shadow-[0_10px_10px_rgba(0,0,0,1)]"
        :placeholder="$t('cardsPage.search')"/>

        <select id="fractions" class="h-10 w-48 rounded-lg text-center text-2xl font-bold pb-2 text-zinc-300
        bg-gradient-to-b from-teal-500 to-black drop-shadow-[0_10px_10px_rgba(0,0,0,1)]">
          <option selected class="bg-emerald-800 text-zinc-300 text-2xl  font-bold">{{$t('cardsPage.fractions')}}</option>
          <option value="orc" class="bg-emerald-800 text-zinc-300 text-2xl  font-bold">{{$t('cardsPage.orcs')}}</option>
          <option value="elf" class="bg-emerald-800 text-zinc-300 text-2xl  font-bold">{{$t('cardsPage.elfs')}}</option>
        </select>

        <BaseButtonStyle class="drop-shadow-[0_10px_8px_rgba(105,0,38,1)]" @click="addDecks()"
        :btn-size="'w-44 h-12'"
        :btn-color="'bg-gradient-to-r from-emerald-900 via-emerald-500 to-emerald-900'"
        :btn-color-hover="'bg-gradient-to-r hover:from-emerald-700 hover:via-emerald-400 hover:to-emerald-700'"
        :btn-padding-color="'bg-gradient-to-b from-emerald-500 to-emerald-950'"
        :btn-text-color="'text-zinc-300'"
        :btn-text-color-hover="'hover:text-zinc-100'"
        :btn-text="'cardsPage.createDeck'"
        />

      </div>

    </div>

  </main>
</template>