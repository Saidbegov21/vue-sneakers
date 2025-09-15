<script setup>
defineProps({
  totalPrice: Number
})
const emit = defineEmits(['openDrawer'])
</script>

<template>
  <header class="flex justify-between border-b border-slate-300 px-8 py-8">
    <div class="flex items-center">
      <img class="w-10 mr-5" src="/logo.png" alt="Logo" />
      <div>
        <h2 class="text-xl font-bold uppercase">Vue Sneakers</h2>
        <p class="text-slate-400">Магазин лучших кросовок</p>
      </div>
    </div>
    <ul class="flex items-center gap-10">
      <li
        @click="() => emit('openDrawer')"
        class="flex items-center cursor-pointer gap-2 text-slate-600 hover:text-black"
      >
        <img src="/cart.svg" alt="Cart" />
        <b>{{ totalPrice }} руб.</b>
      </li>
      <li
        class="flex items-center cursor-pointer gap-2 text-slate-400 hover:text-black"
      >
        <img src="/heart.svg" alt="Cart" />
        <span>Bookmarks</span>
      </li>
      <li
        class="flex items-center cursor-pointer gap-2 text-slate-400 hover:text-black"
      >
        <img src="/profile.svg" alt="Cart" />
        <span>Profile</span>
      </li>
    </ul>
  </header>
</template>
