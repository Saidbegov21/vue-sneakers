<script setup>
defineProps({
  id: Number,
  title: String,
  price: Number,
  imgUrl: String,
  onClickAdd: Function
})
const emit = defineEmits(['onClickRemove'])
</script>

<template>
  <div class="flex items-center border border-slate-200 p-4 rounded-xl gap-4">
    <img class="w-16 h-16" :src="imgUrl" alt="" />
    <div class="flex flex-col flex-1">
      <p>{{ title }}</p>
      <div class="flex justify-between">
        <b class="flex-1">{{ price }} руб.</b>
        <img
          class="opacity-50 hover:opacity-100 cursor-pointer transition"
          src="/close.svg"
          alt="удалить"
          @click="emit('onClickRemove')"
        />
      </div>
    </div>
  </div>
</template>
