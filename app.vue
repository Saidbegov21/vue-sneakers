<script setup>
// Создаем состояние корзины
const basketItems = useState('basket-items', () => [])

watch(
  basketItems,
  (newValue) => {
    localStorage.setItem('basketItems', JSON.stringify(newValue))
  },
  { deep: true }
)

onMounted(() => {
  const basketLocal = localStorage.getItem('basketItems')
  if (basketLocal) {
    basketItems.value = JSON.parse(basketLocal)
  }
})
</script>

<template>
  <NaiveConfig>
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </NaiveConfig>
</template>
