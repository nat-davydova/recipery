//APP CONTROLLER

//import models
import Search from "./modules/models/Search";

//import views
import * as searchView from './modules/views/searchView';

//import utils and configs
import { DOM } from './modules/configs/path';
import { getInputVal, multiWordsQuery } from "./modules/utils";

//state
//here stored:
//- search query
//- faved recipes
const state = {};

//*** SEARCH HANDLER

const searchController = async (searchField, currentPanel) => {

	//get search query from the search input
	const query = getInputVal(searchField);

	//get search results
	if(query) {

		//multiwords query improvement (must be ingred1,+ingred2,+ingred3... etc)
		const searchQuery = searchView.multiWordsQuery(query);

		//create new search object based on the search query
		state.search = new Search(searchQuery);

		//prepare UI

		//if current panel is not for search results, hide it, else - clear it

		//grabbing search results from API
		await state.search.getSearchResults(25); //number - items per request (min - 1, max - 100)

	}

	console.log(state);

};

//*** EVENT HANDLERS

document.addEventListener('click', e => {

	const target = e.target;

	//clicking on search buttons
	if (target.closest(DOM.search.homeBtn)) {

		//implementing search
		searchController(document.querySelector(DOM.search.homeField));

	}

});

document.addEventListener('keydown', e => {

	const target = e.target;

	//pressing enter btn on the keybord while searching
	if (target.closest(DOM.search.homeField)) {

		if(e.key === 'Enter') {

			//prevent reloading
			e.preventDefault();

			//implementing search
			searchController(document.querySelector(DOM.search.homeField));

		}

	}

});
