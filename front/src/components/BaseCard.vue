<script setup>
defineProps({
  imgUrl: String,
})

</script>

<template>
  <!-- <div class="size-fit"> -->
    <img class="h-80 object-contain" :src="imgUrl"/>
  <!-- </div> -->
</template>