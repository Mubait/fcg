<script setup>
defineProps({
  btnSize: String,
  btnColor: String,
  btnColorHover: String,
  btnTextColor: String,
  btnTextColorHover: String,
})

</script>

<template>
  <div class="absolute size-full flex flex-col justify-center items-center drop-shadow-xl">
    <div class="p-0.5 bg-gradient-to-b from-amber-400 to-yellow-950 rounded-lg cursor-pointer" @click="">
      <div class="p-0.5 bg-gradient-to-b from-yellow-800 to-yellow-950 rounded-lg">
        <div class="p-1 bg-gradient-to-b from-emerald-400 to-emerald-950 rounded-lg">
          <div class="flex flex-col justify-center rounded-lg" 
          :class="[btnSize, btnColor, btnColorHover]">
            <p class="w-full h-full flex flex-col justify-center items-center" :class="[btnTextColor, btnTextColorHover]">Играть Play </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>