//APP CONTROLLER

//import models

//import views

//import utils and configs
import { DOM } from './modules/configs/path';

//state
//here stored:
//- search query
//- faved recipes
const state = {

};

//*** SEARCH HANDLER

const searchController = async () => {
	console.log('search');
};

//*** HOME SEARCH FIELD HANDLERS
DOM.search.homeBtn.addEventListener('click', () => {

	//implementing search
	searchController();

});

DOM.search.homeField.addEventListener('keydown', e => {

	if(e.keyCode === 13) {

		//implementing search
		searchController();

	}

});
