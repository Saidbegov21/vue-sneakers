<script setup>
const { totalPrice, isDrawerOpen } = useBasket()
const { isMobileNaw } = useNaw()

function closeMobileNaw() {
  isMobileNaw.value = false
}

function openDrawer() {
  isDrawerOpen.value = true
  closeMobileNaw()
}
</script>

<template>
  <div class="fixed top-0 left-0 h-full w-full bg-black z-10 opacity-50" />
  <div class="bg-white w-96 h-full fixed right-0 top-0 z-20 p-10">
    <MobileNawHead />

    <ul class="flex flex-col items-start gap-10">
      <li
        class="flex items-center cursor-pointer gap-2 text-slate-600 hover:text-black"
        @click="openDrawer"
      >
        <img src="/cart.svg" alt="Cart" />
        <b>{{ totalPrice }} руб.</b>
      </li>
      <li
        class="flex items-center cursor-pointer gap-2 text-slate-400 hover:text-black"
      >
        <img src="/heart.svg" alt="Cart" />
        <span><NuxtLink to="/favorites" @click="closeMobileNaw">Bookmarks</NuxtLink></span>
      </li>
      <li
        class="flex items-center cursor-pointer gap-2 text-slate-400 hover:text-black"
      >
        <img src="/profile.svg" alt="Cart" />
        <span>Profile</span>
      </li>
    </ul>
  </div>
</template>
