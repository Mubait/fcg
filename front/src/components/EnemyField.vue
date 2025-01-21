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

  cardsInBoardArr: ref(),
})

let rightClassesArr = [
  'right-[16%]', 'right-[17%]', 'right-[18%]', 'right-[19%]', 'right-[20%]', 'right-[21%]',
  'right-[22%]', 'right-[23%]', 'right-[24%]', 'right-[25%]', 'right-[26%]', 'right-[27%]'
]
const emit = defineEmits(['aiMove', 'playerCardAttack', 'playerCardAttackedJSON', 'aiCardAttack', 'enemyMana'])
const aiCardClickedInd = ref()
const aiCardDamagedInd = ref()
const aiMoveRef = toRef(props, 'aiMove');
const damageGetted = ref()
const amountOfDamage = ref()

const chooseCardForAttack = (card, index) => {
  if (props.playerCardAttack && !damageGetted.value) {
    amountOfDamage.value = props.playerCardAttack.damage
    card.hp -= amountOfDamage.value
    damageGetted.value = true,
    aiCardClickedInd.value = index,
    setTimeout(() => {
      card.hp <= 0
      ? props.aiCardsInBoardArr.splice(index, 1)
      : null
      damageGetted.value = false
      emit('playerCardAttack', null)
    }, 1000)
  }
}

const attackPlayerCard = () => {
  if(Math.random() < 0.7 && props.cardsInBoardArr.length > 0 && props.aiCardsInBoardArr.length > 0) {
    const aiCardAttackInd = Math.floor(Math.random() * props.aiCardsInBoardArr.length)
    const playerCardAttackedInd = Math.floor(Math.random() * props.cardsInBoardArr.length)

    props.cardsInBoardArr[playerCardAttackedInd].hp -= props.aiCardsInBoardArr[aiCardAttackInd].damage
    setTimeout(() => {
      props.cardsInBoardArr[playerCardAttackedInd].hp <= 0
      ? props.cardsInBoardArr.splice(playerCardAttackedInd, 1)
      : null
    }, 1000)

    emit('aiCardAttack', props.aiCardsInBoardArr[aiCardAttackInd])
    emit('playerCardAttackedJSON', { card: props.cardsInBoardArr[playerCardAttackedInd], index: playerCardAttackedInd})
  }
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
    emit('aiMove', false)
  }
})
</script>

<template>
  <div class="absolute h-1/4 right-[1%] top-1/2 -translate-y-1/2 border rounded-lg">
    <BaseCard
    :hp="aiChosenHero.hp"
    :damage="aiChosenHero.effectAttributes.effect"
    :mana="aiChosenHero.effectAttributes.mana"
    :img-url="'http://localhost:3000'+aiChosenHero.imgUrl"
    :text-size="'text-[60%]'"
    :name="aiChosenHero.nameRu"
    />
  </div>

  <div v-auto-animate class="absolute bottom-[56%] mx-[15%] h-[20%] grid grid-rows-1 grid-cols-8 gap-x-10">
    <div class="relative border rounded-lg focus:brightness-50 focus:scale-110 hover:brightness-50 transition cursor-pointer" 
    v-for="(card, index) in aiCardsInBoardArr"
    @click="chooseCardForAttack(card, index)">
      <p v-if="damageGetted && aiCardClickedInd == index" class="absolute size-full text-white grid place-items-center text-3xl z-10">{{ -amountOfDamage }}</p>
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

  <div class="absolute h-28 w-fit border top-[3%] rounded-lg transition hover:scale-110 hover:brightness-50 cursor-pointer"
  :class="rightClassesArr[index]"
  v-for="(card, index) in aiCardsInHandArr"
  @click="">
    <BaseCard
    :hp="card.hp"
    :damage="card.damage"
    :mana="card.mana"
    :img-url="'http://localhost:3000'+card.imgUrl"
    :text-size="'text-[50%]'"
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
    :img-url="'http://localhost:3000'+card.imgUrl"
    :text-size="'text-[50%]'"
    :name="card.nameRu"
    :type="card.type"
    />
  </div>
</template>