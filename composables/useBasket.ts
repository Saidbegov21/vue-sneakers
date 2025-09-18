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
  const isCreating = ref(false)
  const orderId = ref(null)

  const basketEmpty = computed(() => basketItems.value.length === 0)
  const buttonDisabled = computed(() => isCreating.value || basketEmpty.value)

  function addToBasket(item: any) {
    basketItems.value.push(item)
  }

  function removeFromBasket(item: any) {
    const index = basketItems.value.findIndex(i => i.id === item.id)
    if (index !== -1) {
      basketItems.value.splice(index, 1)
    }
    item.isAdded = false
  }

  function onClickAddBasket(item: any) {
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
  const vatPrice = computed(() => Math.round((totalPrice.value * 5) / 100))

  async function createOrder() {
    try {
      isCreating.value = true
      const { data } = await axios.post(
        'https://54338fc905e86e9f.mokky.dev/orders',
        {
          items: basketItems.value,
          totalPrice: totalPrice.value
        }
      )
      basketItems.value = []
      orderId.value = data.id
    }
    catch (error) {
      console.error(error)
    }
    finally {
      isCreating.value = false
    }
  }

  return {
    basketItems,
    addToBasket,
    removeFromBasket,
    onClickAddBasket,
    totalPrice,
    vatPrice,
    createOrder,
    buttonDisabled,
    orderId,
    isDrawerOpen
  }
}
