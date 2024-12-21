<script setup>
import { cards } from '@/js/cards';

cards
</script>

<template>
  <div class="size-fit">
    <img class="h-80 object-contain" :src="cards.orc[0].imgUrl"/>
  </div>
</template>