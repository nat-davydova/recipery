// APP CONTROLLER

// import models
import Search from './modules/models/Search'
import Recipe from './modules/models/Recipe'

// import views
import * as searchView from './modules/views/searchView'
import * as recipeView from './modules/views/recipeView'

// import utils and configs
import { DOM } from './modules/configs/path'
import {
  getInputVal,
  hideElem,
  showElem,
  scrollbarsInit,
  cleanElemInner,
  cleanInput,
  findParent,
  delElem,
  toggleElems
} from './modules/utils'

// state
// here stored:
// search query
// search results
// full recipes
const state = {}

// *** SEARCH CONTROLLER

// onload controller initing - search = false
// search proceeded - search = true
const searchController = async (search = false) => {
  // search init state
  const initState = {
    searchField: document.querySelector(DOM.search.field),
    currentPage: 1,
    itemsPerPage: 5,
    itemsPerRequest: 70 // number - items per request (min - 1, max - 100)
  }

  // get search query from the search input
  const query = getInputVal(initState.searchField)
  const searchError = document.querySelector(DOM.search.error)

  // get search results
  if (query) {
    // create new search object instance based on the search query
    state.search = new Search(query)

    // remove error message if there is one
    if (searchError) {
      delElem(document.querySelector(DOM.search.error))
    }

    // hide home panel and show preloader
    toggleElems(DOM.panels.home, DOM.loaders.mainLoader)

    // grabbing search results from API
    await state.search.getSearchResults(initState.itemsPerRequest)

    // hide loader and show results panel
    toggleElems(DOM.loaders.mainLoader, DOM.panels.searchRes)

    // render search results (number - items per page number, for pagination)
    state.search.currentPage = initState.currentPage
    state.search.itemsPerPage = initState.itemsPerPage

    searchView.renderSearchResults(state.search)
  } else if (search && !searchError) {
    // if there is no query - rendering error message
    const searchErrorMsg = 'Please, add some keywords to start searching'

    searchView.renderSearchError(searchErrorMsg)
  }

  console.log(state)
}

// *** RECIPE CONTROLLER
const recipeController = async (recipeId) => {
  if (recipeId) {
    // create new recipe object based on the recipe id
    state.fullRecipe = new Recipe(recipeId)

    // hide search results panel and show preloader
    toggleElems(DOM.panels.searchRes, DOM.loaders.mainLoader)

    // grabbing recipe data rom API
    await state.fullRecipe.grabFullRecipe()

    // hide loader and show single result panel
    toggleElems(DOM.loaders.mainLoader, DOM.panels.fullRecipe)

    // render full recipe info
    recipeView.renderFullRecipe(state.fullRecipe, state.fullRecipe.errorMessage)
  }

  console.log(state)
}

// *** INIT APP
window.addEventListener('load', () => {
  scrollbarsInit()
  searchController()
})

// *** EVENT HANDLERS

document.addEventListener('click', e => {
  const target = e.target

  // clicking on search buttons
  if (target.closest(DOM.search.btn)) {
    // implementing search
    searchController(true)
  }

  // clicking on return btn from search panel
  if (target.closest(DOM.returnBtns.searchReturn)) {
    // close search panel
    hideElem(DOM.panels.searchRes)

    // show home panel
    showElem(DOM.panels.home)

    // clean search results
    cleanElemInner(DOM.searchResPanel.results)

    // clean search input
    cleanInput(document.querySelector(DOM.search.field))
  }

  // clicking on return btn from full recipe panel
  if (target.closest(DOM.returnBtns.recipeReturn)) {
    // close search panel
    hideElem(DOM.panels.fullRecipe)

    // show home panel
    showElem(DOM.panels.searchRes)
  }

  // clicking on a recipe card
  if (target.closest(DOM.recipeCard.moreBtn)) {
    const btn = target.closest(DOM.recipeCard.moreBtn)
    const recipeCard = findParent(btn, 'recipe-card')

    recipeController(recipeCard.dataset.id)
  }

  // clicking on next button of search pager

  const searchResNext = `${DOM.searchResPanel.pagination} a[tabindex = "1"]`
  const searchResPrev = `${DOM.searchResPanel.pagination} a[tabindex = "-1"]`

  if (target.closest(searchResNext)) {
    const currentPage = state.search.currentPage + 1

    state.search.currentPage = currentPage

    if (currentPage * state.search.itemsPerPage <= state.search.results.length) {
      searchView.renderSearchResults(state.search.results, state.search.errorMessage, state.search.itemsPerPage, currentPage)

      const searchResPrevBtn = document.querySelector(searchResPrev).parentNode

      searchResPrevBtn.classList.remove('disabled')

      if (currentPage * state.search.itemsPerPage === state.search.results.length) {
        const searchResNextBtn = document.querySelector(searchResNext).parentNode

        searchResNextBtn.classList.add('disabled')
      }
    }
  }

  if (target.closest(searchResPrev)) {
    const currentPage = state.search.currentPage - 1

    state.search.currentPage = currentPage

    if (currentPage * state.search.itemsPerPage >= state.search.itemsPerPage) {
      searchView.renderSearchResults(state.search.results, state.search.errorMessage, state.search.itemsPerPage, currentPage)

      const searchResNextBtn = document.querySelector(searchResNext).parentNode

      searchResNextBtn.classList.remove('disabled')

      if (currentPage * state.search.itemsPerPage === state.search.itemsPerPage) {
        const searchResPrevBtn = document.querySelector(searchResPrev).parentNode

        searchResPrevBtn.classList.add('disabled')
      }
    }
  }
})

document.addEventListener('keydown', e => {
  const target = e.target

  // pressing enter btn on the keybord while searching
  if (target.closest(DOM.search.field)) {
    if (e.key === 'Enter') {
      // prevent reloading
      e.preventDefault()

      // implementing search
      searchController(true)
    }
  }
})
