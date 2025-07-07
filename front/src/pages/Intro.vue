<script setup>
let parallax = () => { document.onmousemove = (e) => {
  document.querySelectorAll(".layer").forEach((layer) => {
    
    let x = e.clientX / window.innerWidth
    let y = e.clientY / window.innerHeight

    layer.style.transform = `translate(-${x*70}px, -${y*70}px)`
	});
}

}
</script>

<template>
  <div class="absolute size-full overflow-hidden bg-bgIntro bg-cover" @mousemove="parallax">
    <div class="absolute size-full  flex flex-col justify-center items-center bg-cover">
      <div class="absolute bg-gradient-to-b from-zinc-950/40 to-zinc-700/40 w-1/2 h-4/5 animate-fromBlur rounded-lg backdrop-blur-lg">
        <p class="text-3xl text-amber-400 flex justify-center mx-5 mt-5">Fantasy Card Game</p>
        <p class="text-zinc-300 mx-5 my-5">
          {{ $t('rootPage.gameDescription') }}
        </p>

        <RouterLink to="/auth">
          <div class="absolute bottom-0 mb-5 flex justify-center w-full">
          <p class="flex justify-center items-center w-32 h-10 rounded-lg cursor-pointer text-zinc-300
          bg-gradient-to-r from-amber-500 via-zinc-800 via-60% to-zinc-950
          hover:from-amber-400 hover:via-zinc-700 hover:via-60% hover:from-1% hover:to-zinc-900 ">{{ $t('rootPage.buttonPlay') }}</p>
        </div>
      </RouterLink>

      </div>
    </div>

    <img class="absolute -right-20 -bottom-20 h-full layer pointer-events-none" src="/1.introPg/werewolf.png"/>
    <img class="absolute -left-20 -bottom-20 h-full layer pointer-events-none" src="/1.introPg/human.png"/>
  </div>

</template>
