<script setup>
defineProps({
  imgUrl: String,
  descriptio: String,
  title: String
})
</script>

<template>
  <div class="flex flex-col items-center text-center w-72 mx-auto">
    <img height="70" width="70" :src="imgUrl" alt="BasketBox" />
    <h2 class="mt-4 text-2xl font-medium">
      {{ title }}
    </h2>
    <p class="text-gray-400 mt-2">
      {{ descriptio }}
    </p>
  </div>
</template>
