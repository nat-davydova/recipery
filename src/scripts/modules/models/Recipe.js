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

      const fullRecipe = await axios(`${apiURL}${recipeQuery}/?${apiKey}`)

      this.fullRecipeData = fullRecipe.data

      // grabbing info to use in the full recipe info
      this.imgSource = this.fullRecipeData.image
      this.ingreds = this.fullRecipeData.extendedIngredients
      this.readyMins = this.fullRecipeData.readyInMinutes
      this.title = this.fullRecipeData.title
      this.servings = this.fullRecipeData.servings
      this.url = this.fullRecipeData.sourceUrl
    } catch (e) {
      console.log(e)

      this.errorMessage = 'Sorry, something is wrong with the recipe content :( Try one more time!'
    }
  };
};
