<script setup>
import { ref, toRef, watch, watchEffect } from 'vue';
import BaseCard from './BaseCard.vue';

const props = defineProps({
  aiChosenDeckArr: ref([]),
  aiCardsInHandArr: ref([]),
  aiCardsInBoardArr: ref([]),
  aiChosenHero: ref(),
  enemyMana: ref(),
  aiMove: ref(),
  playerCardAttack: ref(),
  playerCardAttackedJSON: ref({}),
  cardsInBoardArr: ref(),
  chosenHero: ref(),

  isPlayerCardAttackArr: ref([]),
  isAiCardAttackArr: ref([])
})

let rightClassesArr = [
  'right-[16%]', 'right-[17%]', 'right-[18%]', 'right-[19%]', 'right-[20%]', 'right-[21%]',
  'right-[22%]', 'right-[23%]', 'right-[24%]', 'right-[25%]', 'right-[26%]', 'right-[27%]'
]
const emit = defineEmits(['aiMove', 'playerCardAttack', 'playerCardAttackedJSON', 'aiCardAttack', 'enemyMana', 
'isHeroAttack', 'isAiWin', 'isPlayerWin', 'playerIsWin', 'playerIsLose'])
const aiCardClickedInd = ref()
const aiMoveRef = toRef(props, 'aiMove');
const damageGetted = ref()
const amountOfDamage = ref()
const amountOfHeroDamaged = ref()
const isAiHeroAttack = ref()
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const chooseCardForAttack = (card, index) => {
  if (props.playerCardAttack.card && !damageGetted.value && !props.isPlayerCardAttackArr[props.playerCardAttack.index]) {
    amountOfDamage.value = props.playerCardAttack.card.damage
    card.hp -= amountOfDamage.value
    damageGetted.value = true
    aiCardClickedInd.value = index
    setTimeout(() => {
      card.hp <= 0
      ? props.aiCardsInBoardArr.splice(index, 1)
      : null
      damageGetted.value = false
      emit('playerCardAttack', null)
    }, 1000)

    props.isPlayerCardAttackArr[props.playerCardAttack.index] = true
  }
}
const attackAiCard = async () => {
  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  if(props.playerCardAttack.card && !damageGetted.value && !props.isPlayerCardAttackArr[props.playerCardAttack.index]) {
    amountOfHeroDamaged.value = props.playerCardAttack.card.damage
    props.aiChosenHero.hp -= amountOfHeroDamaged.value
    props.isPlayerCardAttackArr[props.playerCardAttack.index] = true
    isAiHeroAttack.value = true
    await sleep(1000)
    isAiHeroAttack.value = false
    props.aiChosenHero.hp <= 0 ? emit('playerIsWin', true) : null
  }
}

const attackPlayerCard = async () => {
  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  for(let aiCardAttackInd = 0; aiCardAttackInd < props.aiCardsInBoardArr.length; aiCardAttackInd++){
    emit('aiCardAttack', props.aiCardsInBoardArr[aiCardAttackInd])

    if(Math.random() < 0.3 || props.cardsInBoardArr.length == 0) {
      props.chosenHero.hp -= props.aiCardsInBoardArr[aiCardAttackInd].damage
      props.isAiCardAttackArr[aiCardAttackInd] = true
      emit('isHeroAttack', true)
      await sleep(1100)
      props.chosenHero.hp <= 0 ? emit('playerIsLose', true) : null
    }
    if(Math.random() < 0.7 && props.cardsInBoardArr.length > 0 && props.aiCardsInBoardArr.length > 0 && !props.isAiCardAttackArr[aiCardAttackInd]) {
      const playerCardAttackedInd = Math.floor(Math.random() * props.cardsInBoardArr.length)

      props.cardsInBoardArr[playerCardAttackedInd].hp -= props.aiCardsInBoardArr[aiCardAttackInd].damage

      emit('playerCardAttackedJSON', { card: props.cardsInBoardArr[playerCardAttackedInd], index: playerCardAttackedInd})
      props.isAiCardAttackArr[aiCardAttackInd] = true
      await sleep(1100)
      props.cardsInBoardArr[playerCardAttackedInd].hp <= 0
      ? (props.cardsInBoardArr.splice(playerCardAttackedInd, 1))
      : null
    }
  }

  emit('aiMove', false)
}

watch(aiMoveRef, (oldv, newv) => {
  if (props.aiMove) {
    let aiChosenCardInd = Math.floor(Math.random() * props.aiCardsInHandArr.length)
    let aiChosenCard = props.aiCardsInHandArr[aiChosenCardInd]
    // Добавление карт ИИ на поле
    if(Math.random() < 0.7 && props.aiCardsInHandArr.length > 0 && props.aiCardsInBoardArr.length < 8 && aiChosenCard.mana <= props.enemyMana) {
      props.aiCardsInBoardArr.push(aiChosenCard)
      props.aiCardsInHandArr.splice(aiChosenCardInd, 1)

      let manaRemnant = props.enemyMana - aiChosenCard.mana
      emit('enemyMana', manaRemnant)
    }

    attackPlayerCard()
  }
})
</script>

<template>
  <div class="absolute h-1/4 right-[1%] top-1/2 -translate-y-1/2 border rounded-lg cursor-pointer hover:brightness-50"
  @click="attackAiCard()">
  <p v-if="isAiHeroAttack" class="absolute size-full text-white grid place-items-center text-5xl z-10">{{ -amountOfHeroDamaged }}</p>
    <BaseCard
    :hp="aiChosenHero.hp"
    :damage="aiChosenHero.effectAttributes.effect"
    :mana="aiChosenHero.effectAttributes.mana"
    :img-url="`${backendUrl}${aiChosenHero.imgUrl}`"
    :text-size="'text-2xl'"
    :name="aiChosenHero.nameRu"
    />
  </div>

  <div v-auto-animate class="absolute bottom-[56%] mx-[15%] h-[20%] grid grid-rows-1 grid-cols-8 gap-x-10">
    <div class="relative border-2 rounded-lg focus:brightness-50 focus:scale-110 hover:brightness-50 transition cursor-pointer"
    :class="isAiCardAttackArr[index] ? 'border-red-600' : 'border-white'" 
    v-for="(card, index) in aiCardsInBoardArr"
    @click="chooseCardForAttack(card, index)">
      <p v-if="damageGetted && aiCardClickedInd == index" class="absolute select-none size-full text-white grid place-items-center text-3xl z-10">{{ -amountOfDamage }}</p>
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

  <div class="absolute h-28 w-fit border top-[3%] rounded-lg transition hover:scale-110 hover:brightness-50 cursor-pointer"
  :class="rightClassesArr[index]"
  v-for="(card, index) in aiCardsInHandArr"
  @click="">
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

  <div class="absolute h-[20%] top-[3%] right-[8%] border rounded-lg"
  v-for="(card, index) in aiChosenDeckArr">
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
</template>