<script setup>
defineProps({
  imgUrl: String,
  boevoiDyh: String,
  intellekt: String,
  masterstvo: String,
  sila: String,
  skorost: String,
  skritnost: String
})

</script>

<template>
  <!-- <div class="size-fit"> -->
    <div class="absolute h-full w-16 bg-black/60 right-0 flex flex-col gap-6 items-center justify-center">
      <div class="flex w-full items-center">
        <img class="h-8 object-contain brightness-150 rounded-full" src="/cubeElements/boevoiDyh.png"/>
        <p class="text-white">{{boevoiDyh}}</p>
      </div>
      <div class="flex w-full items-center">
        <img class="h-8 object-contain brightness-150 rounded-full" src="/cubeElements/intellekt.png"/>
        <p class="text-white">{{intellekt}}</p>
      </div>
      <div class="flex w-full items-center">
        <img class="h-8 object-contain brightness-150 rounded-full" src="/cubeElements/masterstvo.png"/>
        <p class="text-white">{{masterstvo}}</p>
      </div>
      <div class="flex w-full items-center">
        <img class="h-8 object-contain brightness-150 rounded-full" src="/cubeElements/sila.png"/>
        <p class="text-white">{{sila}}</p>
      </div>
      <div class="flex w-full items-center">
        <img class="h-8 object-contain brightness-150 rounded-full" src="/cubeElements/skorost.png"/>
        <p class="text-white">{{skorost}}</p>
      </div>
      <div class="flex w-full items-center">
        <img class="h-8 object-contain brightness-150 rounded-full" src="/cubeElements/skritnost.png"/>
        <p class="text-white">{{skritnost}}</p>
      </div>
    </div>
    <img class="h-80 object-contain" :src="imgUrl"/>
  <!-- </div> -->
</template>