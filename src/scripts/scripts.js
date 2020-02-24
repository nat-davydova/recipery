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
  toggleElems, pagination
} from './modules/utils'

// state
// here stored:
// search query
// search results
// full recipes
// current page of search results
// items per page of search results
const state = {
  currentPage: 1,
  itemsPerPage: 5
}

// *** SEARCH CONTROLLER

// onload controller initing - search = false
// search proceeded - search = true
const searchController = async (search = false) => {
  // search init state
  const initState = {
    searchField: document.querySelector(PATH.search.field),
    itemsPerRequest: 15 // number - items per request (min - 1, max - 100)
  }

  // get search query from the search input
  // const query = getInputVal(initState.searchField)
  const query = 'apple'
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

    searchView.renderSearchResults(state.currentPage, state.itemsPerPage, state.search)
  } else if (search && !searchError) {
    // if there is no query - rendering error message
    const searchErrorMsg = 'Please, add some keywords to start searching'

    searchView.renderSearchError(searchErrorMsg)
  }
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

  // clicking on the 'Prev'/'Next' button
  const searchItems = document.querySelectorAll(PATH.recipeCard.cardClass)
  const prevBtn = document.querySelector(PATH.pagination.prev)
  const nextBtn = document.querySelector(PATH.pagination.next)

  if (target.closest(PATH.pagination.prev) && !prevBtn.classList.contains('disabled')) {
    state.currentPage--
    pagination(searchItems, 'prev', state.currentPage, state.itemsPerPage)
  }

  if (target.closest(PATH.pagination.next) && !nextBtn.classList.contains('disabled')) {
    state.currentPage++
    pagination(searchItems, 'next', state.currentPage, state.itemsPerPage)
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
