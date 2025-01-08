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
  active: String,
})

</script>

<template>
  <div class="relative size-fit flex drop-shadow-xl">
    <div class="p-[0.1rem] bg-gradient-to-b from-amber-500 to-yellow-950 rounded cursor-pointer">
      <div class="p-[0.2rem] bg-gradient-to-b from-yellow-800 to-yellow-950 rounded">
        <div class="p-[0.2rem] rounded"
        :class="[btnPaddingColor]">
          <div class="flex flex-col justify-center" 
          :class="[btnSize, btnColor, btnColorHover, active]">
            <p class="w-full h-full grid place-items-center text-center select-none" 
            :class="[btnTextColor, btnTextColorHover, fontSize]">{{ $t(btnText)}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>