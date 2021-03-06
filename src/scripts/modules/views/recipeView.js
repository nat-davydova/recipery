import { PATH } from '../configs/path'
import {
  renderErrorMsg,
  showElem,
  renderImg,
  cleanElemInner
} from '../utils'

const renderIngredient = (img, title, text) => {
  const card = PATH.fullRecipePanel.ingred.card.cloneNode(true)
  const cardImg = card.querySelector(PATH.fullRecipePanel.ingred.img)
  const cardContent = card.querySelector(PATH.fullRecipePanel.ingred.content)

  showElem(card)

  renderImg(cardImg, img && `https://spoonacular.com/cdn/ingredients_250x250/${img}`, title)

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
  renderImg(PATH.fullRecipePanel.recipeImg, imgSource, title)

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
