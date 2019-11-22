import axios from 'axios';
import { recipeApi } from "../configs/apiKeys";

export default class Search {

	constructor(searchQuery) {

		this.searchQuery = searchQuery;

	};

	//grabbing search results from API (10 items per request)
	getSearchResults = async num => {

		try {
			const apiURL = `https://api.spoonacular.com/recipes/findByIngredients?`;
			const apiKey = `apiKey=${recipeApi}`;
			const search = `ingredients=${this.searchQuery}`;
			const recipesNum = `number=${num}`;

			const searchResults = await axios(`${apiURL}${apiKey}&${search}&${recipesNum}`);

			this.results = searchResults.data;

		} catch (e) {

			console.log(e);

		}

	};

};
