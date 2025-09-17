<script setup>
import axios from 'axios'

const items = ref([])
const { basketItems, onClickAddBasket } = useBasket()
const filters = reactive({
  sortBy: 'title',
  searchQuery: ''
})

function onChangeSelect(e) {
  filters.sortBy = e.target.value
}

function onChangeSearchInput(e) {
  filters.searchQuery = e.target.value
}

async function addToFavorite(item) {
  try {
    if (!item.isFavorite) {
      const obj = { parentId: item.id }
      item.isFavorite = true
      const { data } = await axios.post(
        'https://54338fc905e86e9f.mokky.dev/favorits',
        obj
      )
      item.favoriteId = data.id
    }
    else {
      item.isFavorite = false
      await axios.delete(
        `https://54338fc905e86e9f.mokky.dev/favorits/${item.favoriteId}`
      )
      item.favoriteId = null
    }
  }
  catch (error) {
    console.error(error)
  }
}

async function fetchFavorites() {
  try {
    const { data: favorits } = await axios.get(
      'https://54338fc905e86e9f.mokky.dev/favorits'
    )
    items.value = items.value.map((item) => {
      const favorite = favorits.find(f => f.id === item.id)
      if (!favorite) {
        return item
      }
      return {
        ...item,
        isFavorite: true,
        favoriteId: favorite.id
      }
    })
  }
  catch (error) {
    console.error(error)
  }
}

async function fetchItems() {
  try {
    const params = { sortBy: filters.sortBy }
    if (filters.searchQuery) {
      params.title = `*${filters.searchQuery}*`
    }
    const { data } = await axios.get(
      'https://54338fc905e86e9f.mokky.dev/items',
      { params }
    )
    items.value = data.map(obj => ({
      ...obj,
      isFavorite: false,
      isAdded: false,
      favoriteId: null
    }))
  }
  catch (err) {
    console.error(err)
  }
}

onMounted(async () => {
  const basketLocal = localStorage.getItem('basketItems')
  basketItems.value = basketLocal ? JSON.parse(basketLocal) : []

  await fetchItems()
  await fetchFavorites()

  if (basketItems.value) {
    items.value = items.value.map(item => ({
      ...item,
      isAdded: basketItems.value.some(bsItem => bsItem.id === item.id)
    }))
  }
})

watch(basketItems, () => {
  items.value = items.value.map(item => ({
    ...item,
    isAdded: false
  }))
})

watch(filters, fetchItems)
</script>

<template>
  <div class="flex justify-between items-center">
    <h2 class="text-3xl font-bold mb-8">
      Все кроссовки
    </h2>
    <div class="flex gap-4">
      <select
        class="py-2 px-3 border rounded-md outline-none"
        @change="onChangeSelect"
      >
        <option value="name">
          По названию
        </option>
        <option value="price">
          По цене (дешёвые)
        </option>
        <option value="-price">
          По цене (дорогие)
        </option>
      </select>
      <div class="relative">
        <img class="absolute left-4 top-3" src="/search.svg" alt="Search" />
        <input
          class="border rounded-md py-2 pl-12 pr-4 outline-none focus:border-gray-400"
          placeholder="Поиск..."
          @input="onChangeSearchInput"
        />
      </div>
    </div>
  </div>
  <div>
    <CardList
      :items="items"
      @add-to-favorite="addToFavorite"
      @add-to-basket="onClickAddBasket"
    />
  </div>
</template>
