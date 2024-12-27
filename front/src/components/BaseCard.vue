<script setup>
const props = defineProps({
  imgUrl: String,
  damage: Number,
  hp: Number,
  mana: Number,
  type: String,
  name: String,
})

const currentType = props.type=='war'? '/cardElements/sword.png' : props.type=='def'? '/cardElements/shield.png' : '/cardElements/star.png'
</script>

<template>
  <!-- <div class="size-fit"> -->
    <div class="absolute h-14 -left-2 -top-2">
      <p class="absolute size-full flex justify-center items-center text-white text-2xl drop-shadow-[0_25px_20px_rgba(148,134,117,1)] z-10">{{ mana }}</p>
      <img class="object-contain h-full" src="/cardElements/blueSquare.png"/>
    </div>
    <div class="absolute h-20 -right-5 -top-5">
      <img class="object-contain h-full" 
      :src="currentType"/>
    </div>
    <div class="absolute h-14 -left-2 -bottom-2">
      <p class="absolute size-full flex justify-center items-center text-white text-2xl">{{ hp }}</p>
      <img class="object-contain h-full" src="/cardElements/greenCircle.png"/>
    </div>
    <div class="absolute h-14 -right-2 -bottom-2">
      <p class="absolute size-full flex justify-center items-center text-white text-2xl">{{ damage }}</p>
      <img class="object-contain h-full" src="/cardElements/redCircle.png"/>
    </div>

    <div class="absolute bottom-[17%] left-1/2 -translate-x-1/2 w-[95%] h-20 bg-black/70 rounded-2xl">
     <p class="size-full text-amber-400 grid place-items-center text-center ">{{ name }}</p> 
    </div>
    <img class="h-80 object-contain rounded-2xl" :src="imgUrl"/>
  <!-- </div> -->
</template>