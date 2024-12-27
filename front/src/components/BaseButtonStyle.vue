<script setup>
defineProps({
  btnSize: String,
  btnColor: String,
  btnColorHover: String,
  btnTextColor: String,
  btnTextColorHover: String,
  btnPaddingColor: String,
  btnText: String,
  fontSize: String,
})

</script>

<template>
  <div class="relative flex drop-shadow-xl">
    <div class="p-0.5 bg-gradient-to-b from-amber-400 to-yellow-950 rounded-lg cursor-pointer">
      <div class="p-0.5 bg-gradient-to-b from-yellow-800 to-yellow-950 rounded-lg">
        <div class="p-1 rounded-lg"
        :class="[btnPaddingColor]">
          <div class="flex flex-col justify-center rounded-lg" 
          :class="[btnSize, btnColor, btnColorHover]">
            <p class="w-full h-full grid place-items-center text-center select-none" :class="[btnTextColor, btnTextColorHover, fontSize]">{{ $t(btnText)}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>