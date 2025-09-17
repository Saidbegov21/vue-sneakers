import axios from 'axios'

export interface BasketItem {
  id: number
  title: string
  price: number
  imageUrl: string
  isAdded?: boolean
}

const isDrawerOpen = ref(false)

export function useBasket() {
  const basketItems = useState<BasketItem[]>('basket-items', () => [])

  function addToBasket(item) {
    basketItems.value.push(item)
  }

  function removeFromBasket(item) {
    const index = basketItems.value.findIndex(i => i.id === item.id)
    if (index !== -1) {
      basketItems.value.splice(index, 1)
    }
    item.isAdded = false
  }

  function onClickAddBasket(item) {
    if (!item.isAdded) {
      addToBasket?.(item)
      item.isAdded = true
    }
    else {
      removeFromBasket?.(item)
      item.isAdded = false
    }
  }

  const totalPrice = computed(
    () => basketItems.value?.reduce((acc, item) => acc + item.price, 0) || 0
  )

  const isCreatingOrder = ref(false)

  async function createOrder() {
    try {
      const { data } = await axios.post(
        'https://54338fc905e86e9f.mokky.dev/orders',
        {
          items: basketItems.value,
          totalPrice: totalPrice.value
        }
      )
      basketItems.value = []
      return data
    }
    catch (error) {
      console.error(error)
    }
    finally {
      isCreatingOrder.value = false
    }
  }

  return {
    basketItems,
    addToBasket,
    removeFromBasket,
    onClickAddBasket,
    totalPrice,
    createOrder,
    isDrawerOpen
  }
}
