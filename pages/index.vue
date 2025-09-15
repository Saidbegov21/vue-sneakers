<script setup>
import axios from 'axios'

const items = ref([])
const basketItems = ref([])
const drawerOpen = ref(false)
const totalPrice = computed(() =>
  basketItems.value.reduce((acc, item) => acc + item.price, 0)
)
const vatPrice = computed(() => Math.round((totalPrice.value * 5) / 100))

const createOrder = async () => {
  try {
    const { data } = await axios.post(
      `https://54338fc905e86e9f.mokky.dev/orders`,
      {
        items: basketItems.value,
        totalPrice: totalPrice.value
      }
    )

    basketItems.value = []
    return data
  } catch (error) {
    console.log(error)
  }
}

const closeDrawer = () => {
  drawerOpen.value = false
}

const openDrawer = () => {
  drawerOpen.value = true
}

const filters = reactive({
  sortBy: 'title',
  searchQuery: '' // 3:47 минут
})

const addToBasket = (item) => {
  basketItems.value.push(item)
  item.isAdded = true
}

const removeFromBasket = (item) => {
  basketItems.value.splice(basketItems.value.indexOf(item), 1)
  item.isAdded = false
}

const onClickAddBasket = (item) => {
  if (!item.isAdded) {
    addToBasket(item)
  } else {
    removeFromBasket(item)
  }

  console.log(basketItems)
}

function onChangeSelect(e) {
  filters.sortBy = e.target.value
}

function onChangeSearchInput(e) {
  filters.searchQuery = e.target.value
}

async function addToFavorite(item) {
  try {
    if (!item.isFavorite) {
      const obj = {
        parentId: item.id
      }

      item.isFavorite = true

      const { data } = await axios.post(
        'https://54338fc905e86e9f.mokky.dev/favorits',
        obj
      )
      item.favoriteId = data.id
    } else {
      item.isFavorite = false
      await axios.delete(
        `https://54338fc905e86e9f.mokky.dev/favorits/${item.favoriteId}`
      )
      item.favoriteId = null
    }
  } catch (error) {
    console.log(error)
  }
}

async function fetchFavorites() {
  try {
    const { data: favorits } = await axios.get(
      'https://54338fc905e86e9f.mokky.dev/favorits'
    )
    items.value = items.value.map((item) => {
      const favorite = favorits.find((f) => f.id === item.id)
      if (!favorite) {
        return item
      }
      return {
        ...item,
        isFavorite: true,
        favoriteId: favorite.id
      }
    })
  } catch (err) {
    console.log(err)
  }
}

async function fetchItems() {
  try {
    const params = {
      sortBy: filters.sortBy
      // searchQuery: filters.searchQuery,
    }
    if (filters.searchQuery) {
      params.title = `*${filters.searchQuery}*`
    }
    const { data } = await axios.get(
      'https://54338fc905e86e9f.mokky.dev/items',
      { params }
    )
    items.value = data.map((obj) => ({
      ...obj,
      isFavorite: false,
      isAdded: false,
      favoriteId: null
    }))
  } catch (err) {
    console.log(err)
  }
}

onMounted(async () => {
  await fetchItems()
  await fetchFavorites()
})

watch(filters, fetchItems)

provide('drawerActions', {
  basketItems,
  closeDrawer,
  openDrawer,
  addToBasket,
  removeFromBasket
})
</script>

<template>
  <Drawer
    v-if="drawerOpen"
    :total-price="totalPrice"
    :vat-price="vatPrice"
    @create-order="createOrder"
  />
  <div class="color">
    <div class="bg-white w-[80%] m-auto rounded-xl shadow-xl mt-20">
      <Header :total-price="totalPrice" @open-drawer="openDrawer" />
      <div class="p-20">
        <div class="flex justify-between items-center">
          <h2 class="text-3xl font-bold mb-8">Все кроссовки</h2>
          <div class="flex gap-4">
            <select
              class="py-2 px-3 border rounded-md outline-none"
              @change="onChangeSelect"
            >
              <option value="name">По названию</option>
              <option value="price">По цене (дешёвые)</option>
              <option value="-price">По цене (дорогие)</option>
            </select>
            <div class="relative">
              <img
                class="absolute left-4 top-3"
                src="/search.svg"
                alt="Search"
              />
              <input
                class="border rounded-md py-2 pl-12 pr-4 outline-none focus:border-gray-400"
                placeholder="Поиск..."
                @input="onChangeSearchInput"
              />
            </div>
          </div>
        </div>

        <CardList
          :items="items"
          @add-to-favorite="addToFavorite"
          @add-to-basket="onClickAddBasket"
        />
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
