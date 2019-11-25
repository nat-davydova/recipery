//APP CONTROLLER

//import models
import Search from "./modules/models/Search";

//import views
import * as searchView from './modules/views/searchView';

//import utils and configs
import { DOM } from './modules/configs/path';
import { getInputVal, hideElem, showElem, scrollbarsInit, cleanElemInner, cleanInput } from "./modules/utils";

//state
//here stored:
//- search query
//- faved recipes
const state = {};

//*** SEARCH HANDLER

const searchController = async (searchField) => {

	//get search query from the search input
	//const query = getInputVal(searchField);

	const query = 'milk,+cheese';

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
		searchView.renderSearchResults(state.search.results, state.search.errorMessage, 5);
	}

	console.log(state);

};

//*** INIT APP
window.addEventListener('load', () => {
	scrollbarsInit();
	searchController(document.querySelector(DOM.search.field));
});

//*** EVENT HANDLERS

document.addEventListener('click', e => {

	const target = e.target;

	//clicking on search buttons
	if (target.closest(DOM.search.btn)) {

		//implementing search
		searchController(document.querySelector(DOM.search.field));

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

});

document.addEventListener('keydown', e => {

	const target = e.target;

	//pressing enter btn on the keybord while searching
	if (target.closest(DOM.search.field)) {

		if(e.key === 'Enter') {

			//prevent reloading
			e.preventDefault();

			//implementing search
			searchController(document.querySelector(DOM.search.field));

		}

	}

});
