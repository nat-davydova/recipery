import { PATH } from '../configs/path'
import {
  renderErrorMsg,
  renderImg,
  cleanElemInner,
  showElem,
  pagination
} from '../utils'

const paginationElem = document.querySelector(PATH.pagination.pagination);

// rendering single search item
const recipeCard = (id, title, img) => {
  const card = PATH.recipeCard.card.cloneNode(true)
  const recipeTitle = card.querySelector(PATH.recipeCard.title)
  const recipeImg = card.querySelector(PATH.recipeCard.img)

  card.classList.remove('js-hidden')
  card.dataset.id = id

  recipeTitle.textContent = title

  renderImg(recipeImg, img, title)

  PATH.searchResPanel.results.appendChild(card)
}

export const renderSearchError = searchErrorMsg => {
  renderErrorMsg(searchErrorMsg, document.querySelector(PATH.search.form))
}

export const renderSearchResults = (pageToStartRender, itemsPerPage, { results, errorMsg}) => {
  if (errorMsg) {
    renderErrorMsg(errorMsg, PATH.searchResPanel.results)

    return
  }

  // clear UI from previous search results
  cleanElemInner(PATH.searchResPanel.results)

  // render results and pagination
  if (results.length > 0) {
    results.forEach(({ id, title, image }) => {
      recipeCard(id, title, image)
    })

    const arr = document.querySelectorAll(PATH.recipeCard.cardClass)
    pagination(arr, 'loading', pageToStartRender, itemsPerPage)

    showElem(paginationElem)
  } else {
    renderErrorMsg('Sorry, we can\'t find any recipes :( Try other keywords!', PATH.searchResPanel.results)
  }
}
