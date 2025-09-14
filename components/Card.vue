<script setup>
defineProps({
  imgUrl: String,
  title: String,
  price: Number,
  isFavorit: Boolean,
  isAdded: Boolean,
  onClickAdd: Function,
  onClickFavorite: Function,
});
</script>

<template>
  <div
    class="relative bg-white border boder-slate-100 rounded-3xl p-8 cursor-pointer transition hover:-translate-y-2 hover:shadow-xl"
  >
    <img
      @click="onClickFavorite"
      class="absolute top-8 left-8"
      :src="!isFavorit ? '/like-1.svg' : '/like-2.svg'"
      alt="likeIcon"
    />
    <img class="w-64 h-60 mx-auto" :src="imgUrl" alt="Sneaker" />
    <p class="mt-5">
      {{ title }}
    </p>
    <div class="flex justify-between">
      <div class="flex flex-col mt-5">
        <span class="text-slate-400">Цена:</span>
        <b>{{ price }} руб.</b>
      </div>
      <img
        @click="onClickAdd"
        :src="!isAdded ? '/plus.svg' : '/checked.svg'"
        alt="PlusIcon"
      />
    </div>
  </div>
</template>
