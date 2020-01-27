//APP CONTROLLER

//import models
import Search from "./modules/models/Search";
import Recipe from './modules/models/Recipe';
import Favs from './modules/models/Favs';

//import views
import * as searchView from './modules/views/searchView';
import * as recipeView from './modules/views/recipeView';

//import utils and configs
import { DOM } from './modules/configs/path';
import { getInputVal, hideElem, showElem, scrollbarsInit, cleanElemInner, cleanInput, findParent } from "./modules/utils";

//state
//here stored:
//- search query
//- faved recipes
const state = {};

//*** SEARCH CONTROLLER
const searchController = async (searchField = document.querySelector(DOM.search.field), currentPage = 1, itemsPerPage = 5) => {

	//get search query from the search input
	//const query = getInputVal(searchField);
	const query = 'apple';

	//get search results
	if(query) {

		//multiwords query improvement (must be ingred1,+ingred2,+ingred3... etc)
		const searchQuery = searchView.multiWordsQuery(query);

		//create new search object based on the search query
		state.search = new Search(searchQuery);

		//hide home panel
		hideElem(DOM.panels.home);

		//show preloader
		showElem(DOM.loaders.mainLoader);

		//grabbing search results from API
		await state.search.getSearchResults(15); //number - items per request (min - 1, max - 100)

		//hide loader
		hideElem(DOM.loaders.mainLoader);

		//show results panel
		showElem(DOM.panels.searchRes);

		//render search results (number - items per page number, for pagination)
		state.search.currentPage = currentPage;
		state.search.itemsPerPage = itemsPerPage;

		searchView.renderSearchResults(state.search.results, state.search.errorMessage, state.search.itemsPerPage, state.search.currentPage);
	}

	console.log(state);

};

//*** RECIPE CONTROLLER
const recipeController = async (recipeId) => {

	if(recipeId) {

		//create new recipe object based on the recipe id
		state.fullRecipe = new Recipe(recipeId);

		//hide home panel
		hideElem(DOM.panels.searchRes);

		//show preloader
		showElem(DOM.loaders.mainLoader);

		//grabbing recipe data rom API
		await state.fullRecipe.grabFullRecipe();

		//hide loader
		hideElem(DOM.loaders.mainLoader);

		//show single result panel
		showElem(DOM.panels.fullRecipe);

		//render full recipe info
		recipeView.renderFullRecipe(state.fullRecipe, state.fullRecipe.errorMessage);

	}

	console.log(state);

};

//*** FAVS CONTROLLER
const favsController = elem => {

	if(!state.favs) {
		state.favs = new Favs();
	}

	let isLiked = elem.dataset.isLiked;

	if(isLiked) {
		console.log('liked');
	} else {
		console.log('not liked');
	}

};

//*** INIT APP
window.addEventListener('load', () => {
	scrollbarsInit();
	searchController();
	favsController();
});

//*** EVENT HANDLERS

document.addEventListener('click', e => {

	const target = e.target;

	//clicking on search buttons
	if (target.closest(DOM.search.btn)) {

		//implementing search
		searchController();

	}

	//clicking on return btn from search panel
	if(target.closest(DOM.returnBtns.searchReturn)) {

		//close search panel
		hideElem(DOM.panels.searchRes);

		//show home panel
		showElem(DOM.panels.home);

		//clean search results
		cleanElemInner(DOM.searchResPanel.results);

		//clean search input
		cleanInput(document.querySelector(DOM.search.field));
	}

	//clicking on return btn from full recipe panel
	if(target.closest(DOM.returnBtns.recipeReturn)) {

		//close search panel
		hideElem(DOM.panels.fullRecipe);

		//show home panel
		showElem(DOM.panels.searchRes);
	}

	//clicking on a recipe card
	if(target.closest(DOM.recipeCard.moreBtn)) {

		const btn = target.closest(DOM.recipeCard.moreBtn);

		const recipeCard = findParent(btn, 'recipe-card');

		recipeController(recipeCard.dataset.id);

	}

	//clicking on next button of search pager

	const searchResNext = `${DOM.searchResPanel.pagination} a[tabindex = "+1"]`;
	const searchResPrev = `${DOM.searchResPanel.pagination} a[tabindex = "-1"]`;

	if(target.closest(searchResNext)) {

		let currentPage = state.search.currentPage + 1;

		state.search.currentPage = currentPage;

		if(currentPage * state.search.itemsPerPage <= state.search.results.length) {

			searchView.renderSearchResults(state.search.results, state.search.errorMessage, state.search.itemsPerPage, currentPage);

			let searchResPrevBtn = document.querySelector(searchResPrev).parentNode;

			searchResPrevBtn.classList.remove('disabled');

			if (currentPage * state.search.itemsPerPage === state.search.results.length) {
				let searchResNextBtn = document.querySelector(searchResNext).parentNode;

				searchResNextBtn.classList.add('disabled');
			}
		}
	}

	if(target.closest(searchResPrev)) {

		let currentPage = state.search.currentPage - 1;

		state.search.currentPage = currentPage;

		if(currentPage * state.search.itemsPerPage >= state.search.itemsPerPage) {

			searchView.renderSearchResults(state.search.results, state.search.errorMessage, state.search.itemsPerPage, currentPage);

			let searchResNextBtn = document.querySelector(searchResNext).parentNode;

			searchResNextBtn.classList.remove('disabled');

			if (currentPage * state.search.itemsPerPage === state.search.itemsPerPage) {
				let searchResPrevBtn = document.querySelector(searchResPrev).parentNode;

				searchResPrevBtn.classList.add('disabled');
			}
		}
	}

	//clicking on favs button on recipe card or full recipe
	if(target.closest(DOM.favBtns.toFavBtn) || target.closest(DOM.favBtns.favIcons)) {

		let favBtn = target;

		//if we click on btn children - move to a btn itself
		if(target.closest(DOM.favBtns.favIcons)) {
			favBtn = target.parentNode;
		}

		//find parent element which contains recipe
		let recipeElem;

		if(favBtn.classList.contains(DOM.favBtns.recipeCardFav.slice(1))) {
			recipeElem = findParent(favBtn, DOM.recipeCard.cardClass.slice(1));
		} else {
			recipeElem = findParent(favBtn, DOM.fullRecipePanel.contentClass.slice(1));
		}

		favsController(recipeElem);

	}

});

document.addEventListener('keydown', e => {

	const target = e.target;

	//pressing enter btn on the keybord while searching
	if (target.closest(DOM.search.field)) {

		if(e.key === 'Enter') {

			//prevent reloading
			e.preventDefault();

			//implementing search
			searchController();

		}

	}

});
