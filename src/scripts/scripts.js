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

	if(searchQuery) {
		state.search = new Search(searchQuery);
	}

	console.log(state);

};

//*** HOME SEARCH FIELD HANDLERS
DOM.search.homeBtn.addEventListener('click', () => {

	//implementing search
	searchController(DOM.search.homeField);

});

DOM.search.homeField.addEventListener('keydown', e => {

	if(e.keyCode === 13) {

		//prevent reloading
		e.preventDefault();

		//implementing search
		searchController(DOM.search.homeField);

	}

});
