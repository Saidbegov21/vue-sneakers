<!-- <script setup>
const items = ref([]);
const sortBy = ref("");
const searchQuery = ref("");

const onChangeSelect = (e) => {
  sortBy.value = e.target.value
};

watch(sortBy, async () => {
  try {
    const { data } = await axios.get(
      "https://54338fc905e86e9f.mokky.dev/items?sortBy=" + sortBy.value
    );
    items.value = data;
  } catch (err) {
    console.log(err);
  }
});
</script>

<template>
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
          class="border rounded-md py-2 pl-12 pr-4 outline-none focus:border-gray-400"
          placeholder="Поиск..."
        />
      </div>
    </div>
  </div>
</template> -->
