<script setup>
defineProps({
  id: Number,
  imgUrl: String,
  title: String,
  price: Number,
  isFavorite: Boolean,
  isAdded: Boolean,
  onClickFavorite: Function,
  onClickAdd: Function
})
</script>

<template>
  <div
    class="relative bg-white border border-slate-100 rounded-3xl p-2 md:p-4 xl:p-6 cursor-pointer transition hover:-translate-y-2 hover:shadow-xl w-full max-w-sm mx-auto"
  >
    <!-- Иконка избранного с адаптивным позиционированием -->
    <img
      v-if="onClickFavorite"
      class="absolute top-3 left-3 md:top-4 md:left-4 lg:top-6 lg:left-6 w-6 h-6 md:w-7 md:h-7 cursor-pointer"
      :src="!isFavorite ? '/like-1.svg' : '/like-2.svg'"
      alt="likeIcon"
      @click="onClickFavorite"
    />

    <!-- Адаптивное изображение -->
    <div class="flex justify-center items-center h-40 md:h-48 lg:h-56">
      <img
        class="w-auto h-full max-w-full object-contain"
        :src="imgUrl"
        alt="Sneaker"
      />
    </div>

    <!-- Контент -->
    <p class="mt-3 md:mt-4 text-xs md:text-base line-clamp-2">
      {{ title }}
    </p>

    <div class="flex justify-between items-center mt-3 md:mt-4">
      <div class="flex flex-col">
        <span class="text-slate-400 text-xs md:text-sm lg:text-lg">Цена:</span>
        <b class="text-base text-sm md:text-lg lg:text-lg">{{ price }} руб.</b>
      </div>

      <!-- Кнопка добавления -->
      <img
        v-if="onClickAdd"
        class="w-8 h-8 md:w-10 md:h-10 cursor-pointer hover:scale-110 transition"
        :src="!isAdded ? '/plus.svg' : '/checked.svg'"
        alt="PlusIcon"
        @click="onClickAdd"
      />
    </div>
  </div>
</template>
