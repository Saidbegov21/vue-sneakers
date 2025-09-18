<script setup>
const { isDrawerOpen } = useBasket()
</script>

<template>
  <div class="color">
    <div class="bg-white w-[80%] m-auto rounded-xl shadow-xl mt-20">
      <Drawer v-if="isDrawerOpen" />
      <Header />
      <div class="p-20">
        <slot />
      </div>
    </div>
  </div>
</template>

<style>
html {
  background-color: #e7f6ff;
}
.color {
  background-color: #e7f6ff;
}
</style>
