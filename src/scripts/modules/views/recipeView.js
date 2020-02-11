import { PATH } from '../configs/path'
import {
  renderErrorMsg,
  showElem,
  cleanElemInner
} from '../utils'

const renderIngredient = (img, title, text) => {
  const card = PATH.fullRecipePanel.ingred.card.cloneNode(true)

  showElem(card)

  const cardImg = card.querySelector(PATH.fullRecipePanel.ingred.img)

  img && cardImg.setAttribute('src', `https://spoonacular.com/cdn/ingredients_250x250/${img}`)
  cardImg.setAttribute('alt', title)

  const cardContent = card.querySelector(PATH.fullRecipePanel.ingred.content)

  cardContent.textContent = text

  PATH.fullRecipePanel.ingredList.appendChild(card)
}

export const renderFullRecipe = ({ id, imgSource, title, readyMins, servings, ingreds, url, errorMessage }) => {
  if (errorMessage) {
    renderErrorMsg(errorMessage, PATH.fullRecipePanel.content)

    return
  }

  // id addition
  PATH.fullRecipePanel.content.dataset.id = id

  // image handling
  imgSource && PATH.fullRecipePanel.recipeImg.setAttribute('src', imgSource)

  PATH.fullRecipePanel.recipeImg.setAttribute('alt', title)

  // title handling
  PATH.fullRecipePanel.title.textContent = title

  // ready time handling
  PATH.fullRecipePanel.readyTime.textContent = `${readyMins} mins`

  // servings handling
  PATH.fullRecipePanel.servings.textContent = servings

  // ingredients rendering
  cleanElemInner(PATH.fullRecipePanel.ingredList)

  ingreds.forEach(({ image, name, original }) => renderIngredient(image, name, original))

  // learn more url
  PATH.fullRecipePanel.url.setAttribute('href', url)

  showElem(PATH.fullRecipePanel.recipe)
}
