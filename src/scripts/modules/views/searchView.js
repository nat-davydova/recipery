import { DOM } from '../configs/path'
import { renderErrorMsg, showElem, pagination, cleanElemInner } from '../utils'

// rendeer search results
const recipeCard = (id, title, img) => {
  const card = DOM.recipeCard.card.cloneNode(true)

  card.classList.remove('js-hidden')

  card.dataset.id = id

  const recipeTitle = card.querySelector(DOM.recipeCard.title)

  recipeTitle.textContent = title

  const recipeImg = card.querySelector(DOM.recipeCard.img)

  recipeImg.setAttribute('src', img)

  recipeImg.setAttribute('alt', title)

  DOM.searchResPanel.results.appendChild(card)
}

export const renderSearchResults = (searchArr, errorMsg, itemsPerPage, currentPage) => {
  if (errorMsg) {
    renderErrorMsg(errorMsg, DOM.searchResPanel.results)

    return
  }

  // clear UI
  cleanElemInner(DOM.searchResPanel.results)

  // render results
  if (searchArr.length > itemsPerPage) {
    // pagination init, if there are more elems than displayed on 1 page
    showElem(document.querySelector(DOM.searchResPanel.pagination))

    const pagedArr = pagination(DOM.searchResPanel.pagination, searchArr, itemsPerPage, currentPage)

    if (pagedArr) {
      pagedArr.forEach(({ id, title, image }) => {
        recipeCard(id, title, image)
      })
    }
  } else if (searchArr.length <= itemsPerPage && searchArr.length > 0) {
    searchArr.forEach(({ id, title, image }) => {
      recipeCard(id, title, image)
    })
  } else {
    renderErrorMsg('Sorry, we can\'t find any recipes :( Try other keywords!', DOM.searchResPanel.results)
  }
}
