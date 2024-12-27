<script setup>
const props = defineProps({
  imgUrl: String,
  damage: Number,
  hp: Number,
  mana: Number,
  type: String
})

const currentType = props.type=='war'? '/cardElements/sword.png' : props.type=='def'? '/cardElements/shield.png' : '/cardElements/star.png'
</script>

<template>
  <!-- <div class="size-fit"> -->
    <div class="absolute h-14 -left-2 -top-2">
      <p class="absolute size-full flex justify-center items-center text-white text-2xl">10</p>
      <img class="object-contain h-full" src="/cardElements/blueSquare.png"/>
    </div>
    <div class="absolute h-20 -right-5 -top-5">
      <img class="object-contain h-full" 
      :src="currentType"/>
    </div>
    <div class="absolute h-14 -left-2 -bottom-2">
      <p class="absolute size-full flex justify-center items-center text-white text-2xl">7</p>
      <img class="object-contain h-full" src="/cardElements/greenCircle.png"/>
    </div>
    <div class="absolute h-14 -right-2 -bottom-2">
      <p class="absolute size-full flex justify-center items-center text-white text-2xl">10</p>
      <img class="object-contain h-full" src="/cardElements/redCircle.png"/>
    </div>
    <img class="h-80 object-contain" :src="imgUrl"/>
  <!-- </div> -->
</template>