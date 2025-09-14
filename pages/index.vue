<script setup>
import axios from "axios";

const items = ref([]);
const filters = reactive({
  sortBy: 'title',
  searchQuery: '', //3:47 минут
})

const onChangeSelect = (e) => {
  filters.sortBy = e.target.value
};

const onChangeSearchInput = (e) => {
  filters.searchQuery = e.target.value
};

const fetchItems = async () => {
  try {
    const params = {
      sortBy: filters.sortBy,
      //searchQuery: filters.searchQuery,
    }
    if (filters.searchQuery) {
      params.title = `*${filters.searchQuery}*`
    }
    const { data } = await axios.get(
      "https://54338fc905e86e9f.mokky.dev/items",
      {params}
    );
    items.value = data;
  } catch (err) {
    console.log(err);
  }
}


onMounted(fetchItems);

watch(filters, fetchItems)
</script>

<template>
  <!-- <Drawer /> -->
  <div class="color">
    <div class="bg-white w-[80%] m-auto rounded-xl shadow-xl mt-20">
      <Header />
      <div class="p-20">
        <div class="flex justify-between items-center">
        <h2 class="text-3xl font-bold mb-8">Все кроссовки</h2>
      <div class="flex gap-4">
        <select @change="onChangeSelect" " class="py-2 px-3 border rounded-md outline-none">
          <option value="name">По названию</option>
          <option value="price">По цене (дешёвые)</option>
          <option value="-price">По цене (дорогие)</option>
        </select>
        <div class="relative">
          <img class="absolute left-4 top-3" src="/search.svg" alt="Search" />
          <input
          @input="onChangeSearchInput"
            class="border rounded-md py-2 pl-12 pr-4 outline-none focus:border-gray-400"
            placeholder="Поиск..."
          />
        </div>
      </div>
  </div>

        <CardList :items="items" />
      </div>
    </div>
  </div>
</template>

<style>
  html {
    background-color: #E7F6FF;
  }
  .color {
    background-color: #E7F6FF;
  }
</style>