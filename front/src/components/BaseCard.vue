<script setup>
const props = defineProps({
  imgUrl: String,
  damage: String,
  hp: Number,
  mana: Number,
  type: String,
  name: String,
  imgSize: String,
  textSize: String,
})

const currentType = props.type=='war'? '/cardElements/sword.png' : props.type=='def'? '/cardElements/shield.png' : '/cardElements/star.png'
</script>

<template>
  <div class="relative size-full">
    <div v-if="mana" class="absolute h-1/6 left-0 top-0">
      <p class="absolute size-full flex justify-center items-center text-white drop-shadow-[0_25px_20px_rgba(148,134,117,1)] z-10"
      :class="textSize">{{ mana }}</p>
      <img class="object-contain h-full" src="/cardElements/blueSquare.png"/>
    </div>
    <div v-if="type" class="absolute h-1/5 right-0 top-0">
      <img class="object-contain h-full" 
      :src="currentType"/>
    </div>
    <div v-if="hp" class="absolute h-1/6 left-0 -bottom-0">
      <p class="absolute size-full flex justify-center items-center text-white"
      :class="textSize">{{ hp }}</p>
      <img class="object-contain h-full" src="/cardElements/greenCircle.png"/>
    </div>
    <div v-if="damage" class="absolute h-1/6 right-0 bottom-0">
      <p class="absolute size-full flex justify-center items-center text-white"
      :class="textSize">{{ damage }}</p>
      <img class="object-contain h-full" src="/cardElements/redCircle.png"/>
    </div>

    <div v-if="name" class="absolute bottom-[17%] left-1/2 -translate-x-1/2 w-[95%] h-1/4 bg-black/70 rounded-2xl">
     <p class="size-full text-amber-400 grid place-items-center text-center"
     :class="textSize">{{ name }}</p> 
    </div>
    <img class="h-full object-contain rounded-2xl" :src="imgUrl"/>

  </div>
</template>