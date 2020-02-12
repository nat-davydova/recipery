// APP CONTROLLER

// import models
import Search from './modules/models/Search'
import Recipe from './modules/models/Recipe'

// import views
import * as searchView from './modules/views/searchView'
import * as recipeView from './modules/views/recipeView'

// import utils and configs
import { PATH } from './modules/configs/path'
import {
  getInputVal,
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
    searchField: document.querySelector(PATH.search.field),
    currentPage: 1,
    itemsPerPage: 5,
    itemsPerRequest: 70 // number - items per request (min - 1, max - 100)
  }

  // get search query from the search input
  const query = getInputVal(initState.searchField)
  const searchError = document.querySelector(PATH.search.error)

  // get search results
  if (query) {
    // create new search object instance based on the search query
    state.search = new Search(query)

    // remove error message if there is one
    if (searchError) {
      delElem(document.querySelector(PATH.search.error))
    }

    // hide home panel and show preloader
    toggleElems(PATH.panels.home, PATH.loaders.mainLoader)

    // grabbing search results from API
    await state.search.getSearchResults(initState.itemsPerRequest)

    // hide loader and show results panel
    toggleElems(PATH.loaders.mainLoader, PATH.panels.searchRes)

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
    // create new recipe object
    state.fullRecipe = new Recipe(recipeId)

    // hide search results panel and show preloader
    toggleElems(PATH.panels.searchRes, PATH.loaders.mainLoader)

    // grabbing recipe data rom API
    await state.fullRecipe.grabFullRecipe()

    // hide loader and show single result panel
    toggleElems(PATH.loaders.mainLoader, PATH.panels.fullRecipe)

    // render full recipe info
    recipeView.renderFullRecipe(state.fullRecipe)
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
  if (target.closest(PATH.search.btn)) {
    // implementing search
    searchController(true)
  }

  // clicking on return btn from search panel
  if (target.closest(PATH.returnBtns.searchReturn)) {
    // close search panel and show home panel
    toggleElems(PATH.panels.searchRes, PATH.panels.home)

    // clean search results
    cleanElemInner(PATH.searchResPanel.results)

    // clean search input
    cleanInput(document.querySelector(PATH.search.field))
  }

  // clicking on return btn from full recipe panel
  if (target.closest(PATH.returnBtns.recipeReturn)) {
    // close recipe panel and show search results
    toggleElems(PATH.panels.fullRecipe, PATH.panels.searchRes)
  }

  // clicking on a recipe card
  if (target.closest(PATH.recipeCard.moreBtn)) {
    const btn = target.closest(PATH.recipeCard.moreBtn)
    const recipeCard = findParent(btn, 'recipe-card')

    recipeController(recipeCard.dataset.id)
  }

  // clicking on next button of search pager

  if (target.closest(PATH.searchResPanel.pagination.prev)) {
    const currentPage = state.search.currentPage + 1

    state.search.currentPage = currentPage

    if (currentPage * state.search.itemsPerPage <= state.search.results.length) {
      searchView.renderSearchResults(state.search.results, state.search.errorMessage, state.search.itemsPerPage, currentPage)

      const searchResPrevBtn = document.querySelector(PATH.searchResPanel.pagination.prev).parentNode

      searchResPrevBtn.classList.remove('disabled')

      if (currentPage * state.search.itemsPerPage === state.search.results.length) {
        const searchResNextBtn = document.querySelector(PATH.searchResPanel.pagination.next).parentNode

        searchResNextBtn.classList.add('disabled')
      }
    }
  }

  // clicking on prev button of search pager
  if (target.closest(PATH.searchResPanel.pagination.next)) {
    const currentPage = state.search.currentPage - 1

    state.search.currentPage = currentPage

    if (currentPage * state.search.itemsPerPage >= state.search.itemsPerPage) {
      searchView.renderSearchResults(state.search.results, state.search.errorMessage, state.search.itemsPerPage, currentPage)

      const searchResNextBtn = document.querySelector(PATH.searchResPanel.pagination.next).parentNode

      searchResNextBtn.classList.remove('disabled')

      if (currentPage * state.search.itemsPerPage === state.search.itemsPerPage) {
        const searchResPrevBtn = document.querySelector(PATH.searchResPanel.pagination.prev).parentNode

        searchResPrevBtn.classList.add('disabled')
      }
    }
  }
})

document.addEventListener('keydown', e => {
  const target = e.target

  // pressing enter btn on the keybord while searching
  if (target.closest(PATH.search.field)) {
    if (e.key === 'Enter') {
      // prevent reloading
      e.preventDefault()

      // implementing search
      searchController(true)
    }
  }
})
