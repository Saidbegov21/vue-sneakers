<script setup>
const { basketItems, removeFromBasket } = inject('drawerActions')
</script>

<template>
  <div class="flex flex-col gap-5">
    <BasketCart
      v-for="item in basketItems"
      :key="item.id"
      :title="item.title"
      :img-url="item.imageUrl"
      :price="item.price"
      :id="item.id"
      @on-click-remove="() => removeFromBasket(item)"
    />
  </div>
</template>
