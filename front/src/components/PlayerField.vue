<script setup>
import { ref, toRef, watch } from 'vue';
import BaseCard from './BaseCard.vue';

const emit = defineEmits(['playerCardAttack', 'playerCardAttackedJSON', 'playerMana', 'isHeroAttack'])
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const props = defineProps({
  chosenDeckArr: ref([]),
  cardsInHandArr: ref([]),
  cardsInBoardArr: ref([]),
  chosenHero: ref(),
  playerMana: ref(),
  playerCardAttackedJSON: ref({}),
  aiCardAttack: ref(),
  isPlayerCardAttackArr: ref([]),
  isHeroAttack: ref(),
})

let rightClassesArr = [
  'right-[16%]', 'right-[17%]', 'right-[18%]', 'right-[19%]', 'right-[20%]', 'right-[21%]',
  'right-[22%]', 'right-[23%]', 'right-[24%]', 'right-[25%]', 'right-[26%]', 'right-[27%]'
]
let cardOnHover = ref()
let playerCardAttackedJSONref = toRef(props, 'playerCardAttackedJSON')
let amountOfDamage = ref()
let amountOfHeroDamaged = ref()
let isHeroAttackRef = toRef(props, 'isHeroAttack')

const pushCardInBoard = (card, index) => {
  if (props.cardsInBoardArr.length < 8 && card.mana <= props.playerMana) {
    props.cardsInBoardArr.push(card)
    props.cardsInHandArr.splice(index, 1)
    cardOnHover.value = null
    let manaRemnant = props.playerMana - card.mana
    emit('playerMana', manaRemnant)
  }
}
const playerAddCardAttack = (card, index) => {
  emit('playerCardAttack', {card: card, index: index})
}

const displayCardDamaged = async () => {
  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
  amountOfDamage = props.aiCardAttack.damage
  await sleep(1000)
  emit('playerCardAttackedJSON', null)
}
const displayHeroCardDamaged = async () => {
  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
  amountOfHeroDamaged.value = props.aiCardAttack.damage
  await sleep(1000)
  emit('isHeroAttack', false)
}
watch(playerCardAttackedJSONref, () =>{
  playerCardAttackedJSONref.value ? displayCardDamaged() : null
})
watch(isHeroAttackRef, () => {
  isHeroAttackRef.value ? displayHeroCardDamaged() : null
})
</script>

<template>

  <div class="absolute h-1/4 left-[1%] top-1/2 -translate-y-1/2 border rounded-lg cursor-pointer hover:brightness-50">
    <p v-if="isHeroAttack" class="absolute size-full text-white grid place-items-center text-3xl z-10">{{ -amountOfHeroDamaged }}</p>
    <BaseCard
    :hp="chosenHero.hp"
    :damage="chosenHero.effectAttributes.effect"
    :mana="chosenHero.effectAttributes.mana"
    :img-url="`${backendUrl}${chosenHero.imgUrl}`"
    :text-size="'text-2xl'"
    :name="chosenHero.nameRu"
    />
  </div>

  <div v-auto-animate class="absolute top-[56%] mx-[15%] h-[20%] grid grid-rows-1 grid-cols-8 gap-x-10">
    <div class="relative border-2 rounded-lg focus:brightness-50 focus:scale-110 hover:brightness-50 transition cursor-pointer" tabindex="0"
    :class="isPlayerCardAttackArr[index]? 'border-red-600':'border-white'"
    v-for="(card, index) in cardsInBoardArr"
    @click="playerAddCardAttack(card, index)">
    <p v-if="playerCardAttackedJSON && playerCardAttackedJSON.index == index" class="absolute size-full text-white grid place-items-center text-3xl z-10">{{ -amountOfDamage }}</p>
      <BaseCard
      :hp="card.hp"
      :damage="card.damage"
      :mana="card.mana"
      :img-url="`${backendUrl}${card.imgUrl}`"
      :text-size="'text-md'"
      :name="card.nameRu"
      :type="card.type"
      />
    </div>
  </div>

  <div v-if="cardOnHover" class="absolute h-[20%] right-[34%] bottom-3 border rounded-lg">
    <BaseCard
    :hp="cardOnHover.hp"
    :damage="cardOnHover.damage"
    :mana="cardOnHover.mana"
    :img-url="`${backendUrl}${cardOnHover.imgUrl}`"
    :text-size="'text-md'"
    :name="cardOnHover.nameRu"
    :type="cardOnHover.type"
    />
  </div>

  <div class="absolute h-28 w-fit border bottom-[3%] rounded-lg transition hover:scale-110 hover:brightness-50 cursor-pointer"
  :class="rightClassesArr[index]"
  v-for="(card, index) in cardsInHandArr"
  @click="pushCardInBoard(card, index)"
  @mouseover="cardOnHover = card" @mouseleave="cardOnHover = null">
    <BaseCard
    :hp="card.hp"
    :damage="card.damage"
    :mana="card.mana"
    :img-url="`${backendUrl}${card.imgUrl}`"
    :text-size="'text-[8px]'"
    :name="card.nameRu"
    :type="card.type"
    />
  </div>

  <div class="absolute h-[20%] w-fit border rounded-lg bottom-[3%] right-[8%] overflow-hidden"
  v-for="(card, index) in chosenDeckArr"
  @click="chosenDeckArr.splice(index)">
    <BaseCard
    :hp="card.hp"
    :damage="card.damage"
    :img-url="`${backendUrl}${card.imgUrl}`"
    :mana="card.mana"
    :type="card.type"
    :name="card.nameRu"
    :text-size="'text-md'"
    />
  </div>
</template>