<script setup>
defineProps({
  items: Array,
  isFavorites: Boolean
})

const emit = defineEmits(['addToFavorite', 'addToBasket'])
</script>

<template>
  <div v-auto-animate class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5 mt-10">
    <Card
      v-for="item in items"
      :id="item.id"
      :key="item.id"
      :price="item.price"
      :title="item.title"
      :img-url="item.imageUrl"
      :on-click-favorite="
        isFavorites ? null : () => emit('addToFavorite', item)
      "
      :is-favorite="item.isFavorite"
      :on-click-add="isFavorites ? null : () => emit('addToBasket', item)"
      :is-added="item.isAdded"
    />
  </div>
</template>
