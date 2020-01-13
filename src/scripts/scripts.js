//APP CONTROLLER

//import models
import Search from "./modules/models/Search";
import Recipe from './modules/models/Recipe';

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
const searchController = async (searchField = document.querySelector(DOM.search.field), currentPage = 1) => {

	//get search query from the search input
	//const query = getInputVal(searchField);

	const query = 'mushrooms';

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
		state.search.currentPage = 1;
		state.search.itemsPerPage = 5;

		searchView.renderSearchResults(state.search.results, state.search.errorMessage, state.search.itemsPerPage, state.search.currentPage);
	}

	console.log(state);

};

//*** RECIPE CONTROLLER
const recipeController = async (recipeId) => {

	if(recipeId) {

		//create new recipe object based on the recipe id
		state.fullRecipe = new Recipe('avava');

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

//*** INIT APP
window.addEventListener('load', () => {
	scrollbarsInit();
	searchController();
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
	if(target.closest(DOM.returnBtns.recipeReturn)) {

		//close search panel
		hideElem(DOM.panels.searchRes);

		//show home panel
		showElem(DOM.panels.home);

		//clean search results
		cleanElemInner(DOM.searchResPanel.results);

		//clean search input
		cleanInput(document.querySelector(DOM.search.field));
	}

	//clicking on a recipe card
	if(target.closest(DOM.recipeCard.moreBtn)) {

		const btn = target.closest(DOM.recipeCard.moreBtn);

		const recipeCard = findParent(btn, 'recipe-card');

		recipeController(recipeCard.dataset.id);

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
