import axios from 'axios'

export function useFavorite() {
  async function addToFavorite(item: any) {
    try {
      if (!item.isFavorite) {
        const obj = { item_id: item.id }
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
  return {
    addToFavorite
  }
}
