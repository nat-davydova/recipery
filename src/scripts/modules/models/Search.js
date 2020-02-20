import axios from 'axios'
import { recipeApi } from '../configs/apiKeys'

export default class Search {
  constructor (searchQuery) {
    this.searchQuery = this.multiWordsQuery(searchQuery)
  }

  // if there are more than 1 keywords in search,
  // function converts them to a valid search request string for API
  multiWordsQuery (query) {
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
