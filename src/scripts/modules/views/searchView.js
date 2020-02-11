import { PATH } from '../configs/path'
import {
  renderErrorMsg,
  showElem,
  pagination,
  cleanElemInner
} from '../utils'

// rendeer search results
const recipeCard = (id, title, img) => {
  const card = PATH.recipeCard.card.cloneNode(true)

  card.classList.remove('js-hidden')

  card.dataset.id = id

  const recipeTitle = card.querySelector(PATH.recipeCard.title)

  recipeTitle.textContent = title

  const recipeImg = card.querySelector(PATH.recipeCard.img)

  recipeImg.setAttribute('src', img)

  recipeImg.setAttribute('alt', title)

  PATH.searchResPanel.results.appendChild(card)
}

export const renderSearchError = searchErrorMsg => {
  renderErrorMsg(searchErrorMsg, document.querySelector(PATH.search.form))
}

export const renderSearchResults = ({ results, errorMsg, itemsPerPage, currentPage }) => {
  if (errorMsg) {
    renderErrorMsg(errorMsg, PATH.searchResPanel.results)

    return
  }

  // clear UI
  cleanElemInner(PATH.searchResPanel.results)

  // render results
  if (results.length > itemsPerPage) {
    // pagination init, if there are more elems than displayed on 1 page
    showElem(document.querySelector(PATH.searchResPanel.pagination))

    const pagedArr = pagination(PATH.searchResPanel.pagination, results, itemsPerPage, currentPage)

    if (pagedArr) {
      pagedArr.forEach(({ id, title, image }) => {
        recipeCard(id, title, image)
      })
    }
  } else if (results.length <= itemsPerPage && results.length > 0) {
    results.forEach(({ id, title, image }) => {
      recipeCard(id, title, image)
    })
  } else {
    renderErrorMsg('Sorry, we can\'t find any recipes :( Try other keywords!', PATH.searchResPanel.results)
  }
}
