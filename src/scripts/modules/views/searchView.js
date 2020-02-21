import { PATH } from '../configs/path'
import {
  renderErrorMsg,
  renderImg,
  cleanElemInner
} from '../utils'

// rendering single search item
const recipeCard = (id, title, img) => {
  const card = PATH.recipeCard.card.cloneNode(true)

  card.classList.remove('js-hidden')

  card.dataset.id = id

  const recipeTitle = card.querySelector(PATH.recipeCard.title)

  recipeTitle.textContent = title

  const recipeImg = card.querySelector(PATH.recipeCard.img)

  renderImg(recipeImg, img, title)

  PATH.searchResPanel.results.appendChild(card)
}

export const renderSearchError = searchErrorMsg => {
  renderErrorMsg(searchErrorMsg, document.querySelector(PATH.search.form))
}

export const renderSearchResults = ({ results, errorMsg}) => {
  if (errorMsg) {
    renderErrorMsg(errorMsg, PATH.searchResPanel.results)

    return
  }

  // clear UI from previous search results
  cleanElemInner(PATH.searchResPanel.results)

  // render results
  if (results.length > 0) {
    results.forEach(({ id, title, image }) => {
      recipeCard(id, title, image)
    })
  } else {
    renderErrorMsg('Sorry, we can\'t find any recipes :( Try other keywords!', PATH.searchResPanel.results)
  }
}
