import axios from 'axios'
import { recipeApi } from '../configs/apiKeys'

const multiWordsQuery = (query) => {
  const queryArr = query.split(' ')

  let newQueryArr

  if (queryArr.length > 1) {
    newQueryArr = queryArr.map((elem, index) => {
      return index === 0 ? elem : `+${elem}`
    })

    query = newQueryArr.join(',')
  }

  return query
}

export default class Search {
  constructor (searchQuery) {
    this.searchQuery = multiWordsQuery(searchQuery)
  }

  // grabbing search results from API (10 items per request by default)
  async getSearchResults (num) {
    try {
      const apiURL = 'https://api.spoonacular.com/recipes/findByIngredients?'
      const apiKey = `apiKey=${recipeApi}`
      const search = `ingredients=${this.searchQuery}`
      const recipesNum = `number=${num}`

      const { data } = await axios(`${apiURL}${apiKey}&${search}&${recipesNum}`)

      this.results = data
    } catch (e) {
      console.log(e)

      this.errorMessage = 'Sorry, something went wrong with API request :( Try one more time!'
    }
  };
};
