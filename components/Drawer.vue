<script setup>
defineProps({
  totalPrice: Number,
  vatPrice: Number
})

const emit = defineEmits(['createOrder'])
</script>

<template>
  <div class="fixed top-0 left-0 h-full w-full bg-black z-10 opacity-50" />
  <div class="bg-white w-96 h-full fixed right-0 top-0 z-20 p-10">
    <DrawerHead />
    <BasketList />

    <div class="flex flex-col gap-4 mt-7">
      <div class="flex gap-3 items-end">
        <span>Итого:</span>
        <div class="flex-1 border-b border-dashed" />
        <b>{{ totalPrice }} руб. </b>
      </div>
      <div class="flex gap-3 items-end">
        <span>Налог 5%: </span>
        <div class="flex-1 border-b border-dashed" />
        <b>{{ vatPrice }} руб. </b>
      </div>
      <button
        @click="() => emit('createOrder')"
        :disabled="totalPrice ? false : true"
        class="mt-4 transition bg-lime-500 w-full rounded-xl py-3 text-white hover:bg-lime-600 active:bg-lime-700 disabled:bg-slate-400 cursor-pointer"
      >
        Оформить заказ
      </button>
    </div>
  </div>
</template>
