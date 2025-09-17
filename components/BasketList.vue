<script setup>
const { basketItems, removeFromBasket } = useBasket()
</script>

<template>
  <div v-auto-animate class="flex flex-col gap-5">
    <BasketCart
      v-for="item in basketItems"
      :id="item.id"
      :key="item.id"
      :title="item.title"
      :img-url="item.imageUrl"
      :price="item.price"
      @on-click-remove="() => removeFromBasket(item)"
    />
  </div>
</template>
