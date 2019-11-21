//APP CONTROLLER

//import models
import Search from "./modules/models/Search";

//import views
import * as searchView from './modules/views/searchView';

//import utils and configs
import { DOM } from './modules/configs/path';
import { getInputVal } from "./modules/utils";

//state
//here stored:
//- search query
//- faved recipes
const state = {

};

//*** SEARCH HANDLER

const searchController = async (searchField) => {

	//get search query from the search input
	const searchQuery = getInputVal(searchField);

	//get search results
	if(searchQuery) {

		state.search = new Search(searchQuery);

		await state.search.getSearchResults();

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
