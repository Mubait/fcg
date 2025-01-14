<script setup>
import BaseButtonStyle from '@/components/BaseButtonStyle.vue';
import BaseCard from '@/components/BaseCard.vue';
import ChooseDeck from '@/components/ChooseDeck.vue';
import ChooseHero from '@/components/ChooseHero.vue';
import CurrentMoveInfo from '@/components/CurrentMoveInfo.vue';
import DeckAndCardsInGame from '@/components/DeckAndCardsInGame.vue';
import { controllerCards } from '@/js/controller/controllerCards';
import { computed, onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

const accessToken = sessionStorage.getItem('accessToken')
const router = useRouter()
let chosenHero = ref()
let chosenDeck = ref()
let cardsOnBoard = ref([])
let currentMove = ref(1)
let chosenCardsArr = ref([])


let soundUrl = ref('http://localhost:3000/audio/orc/1_chosen.mp3')
let sound = new Howl({
  src: [soundUrl.value],
  loop: false,
  volume: 0.5,
});

const func = () => {
  sound.play()
  soundUrl = 'http://localhost:3000/audio/orc/2_chosen.mp3'
  sound = new Howl({
    src: ['http://localhost:3000/audio/orc/2_chosen.mp3'],
    loop: false,
    volume: 0.5,
  })
}

const addDataInDeck = (data) => {
  chosenDeck.value = data
  chosenCardsArr.value.push(chosenDeck.value.at(-1))
  chosenDeck.value.pop()
}

if (!accessToken) {
  alert('Вы не авторизованы!')
  router.push('/auth')
}
else {
}
</script>

<template>
  <main class="fixed size-full bg-bgQpgame bg-[length:100%_100%] bg-no-repeat bg-center ">
    <img class="absolute ml-2 mt-2 object-contain h-1/6 cursor-pointer hover:brightness-50 select-none" src="/logo/logoOrc.png"
    @click="router.push('/main')"/>
    
   <ChooseHero @chosenHero="(data) => chosenHero = data" v-if="chosenDeck&&!chosenHero"/>
    <ChooseDeck @chosen-deck="addDataInDeck" v-if="!chosenDeck"/>

    <div class="size-full" v-if="chosenDeck&&chosenHero">
      <div class="absolute h-1/4 left-[1%] top-1/2 -translate-y-1/2 border rounded-lg">
        <BaseCard
        :hp="chosenHero.hp"
        :damage="chosenHero.effectAttributes.effect"
        :mana="chosenHero.effectAttributes.mana"
        :img-url="'http://localhost:3000'+chosenHero.imgUrl"
        :text-size="'text-[60%]'"
        :name="chosenHero.nameRu"
        />
      </div>

      <div class="absolute top-[56%] mx-[15%] h-[20%] flex space-x-10">
        <div class="border rounded-lg" v-for="card in cardsOnBoard" @click="func()">
          <BaseCard
          :hp="card.hp"
          :damage="card.damage"
          :mana="card.mana"
          :img-url="'http://localhost:3000'+card.imgUrl"
          :text-size="'text-[55%]'"
          :name="card.nameRu"
          :type="card.type"
          />
        </div>
      </div>

      <CurrentMoveInfo
      :chosen-cards-arr="chosenCardsArr"
      :chosen-deck="chosenDeck"
      :last-card-in-deck="chosenDeck.at(-1)"
      />
      <DeckAndCardsInGame 
      :chosenCardsArr="chosenCardsArr"
      :cardsOnBoard="cardsOnBoard"
      :chosenDeck="chosenDeck"
      />

    </div>

  </main>
</template>