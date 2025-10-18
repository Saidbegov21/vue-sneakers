<script setup>
const { isDrawerOpen } = useBasket()
const { isMobileNaw } = useNaw()
</script>

<template>
  <div class="color">
    <div class="bg-white w-[80%] m-auto rounded-xl shadow-xl mt-10 md:mt-20">
      <Drawer v-if="isDrawerOpen" />
      <MobileNavigation v-if="isMobileNaw" />
      <Header />
      <div class="p-4 sm:p-6 md:p-8 lg:p-10">
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
