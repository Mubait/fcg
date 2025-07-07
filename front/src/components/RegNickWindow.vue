<script setup>
import { ref, shallowRef } from 'vue';

import RegNickCard1 from './RegNickCard1.vue';
import RegNickCard2 from './RegNickCard2.vue';

const currentComponent = shallowRef(RegNickCard1)
</script>

<template>

  <div class="absolute flex justify-center w-full">
    <div class="animate-fromBlur mt-10">
      <p class="text-zinc-300 text-4xl drop-shadow-[0_5px_10px_rgba(105,0,38,1)]">{{ $t('regNickPage.regNickHead') }}</p>
    </div>

  </div>


  <div v-auto-animate="{ duration: 600 }" class="absolute size-full">
    <component @click="currentComponent = RegNickCard2" :is="currentComponent"/>
  </div>

</template>