<script setup>
import axios from 'axios'

const favorites = ref([])
// const { addToFavorite } = useFavorite()
// const { onClickAddBasket } = useBasket()

onMounted(async () => {
  try {
    const { data } = await axios.get(
      'https://54338fc905e86e9f.mokky.dev/favorits?_relations=items'
    )
    favorites.value = data.map(obj => obj.item)
  }
  catch (error) {
    console.error(error)
  }
})
</script>

<template>
  <div>
    <h2 class="text-3xl font-bold mb-8">
      Мои закладки
    </h2>
  </div>
  <div>
    <CardList :items="favorites" is-favorites />
  </div>
</template>
