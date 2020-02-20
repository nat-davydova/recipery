import axios from 'axios'
import { recipeApi } from '../configs/apiKeys'

export default class Recipe {
  constructor (id) {
    this.id = id
  }

  async grabFullRecipe () {
    try {
      const apiURL = 'https://api.spoonacular.com/recipes/'
      const apiKey = `apiKey=${recipeApi}`
      const recipeQuery = `${this.id}/information`

      const { data } = await axios(`${apiURL}${recipeQuery}/?${apiKey}`)

      const {
        image,
        extendedIngredients,
        readyInMinutes,
        title,
        servings,
        sourceUrl
      } = data

      // grabbing info to use in the full recipe info
      this.imgSource = image
      this.ingreds = extendedIngredients
      this.readyMins = readyInMinutes
      this.title = title
      this.servings = servings
      this.url = sourceUrl
    } catch (e) {
      console.log(e)

      this.errorMessage = 'Sorry, something is wrong with the recipe content :( Try one more time!'
    }
  };
};
