import axios from 'axios';
import { recipeApi } from "../configs/apiKeys";

export default class Search {

	constructor(searchQuery) {

		this.searchQuery = searchQuery;

	};

	//grabbing search results from API (10 items per request)
	getSearchResults = async () => {

		console.log(this.searchQuery);

		try {
			const apiURL = `https://api.spoonacular.com/recipes/findByIngredients?`;
			const apiKey = `apiKey=${recipeApi}`;
			const search = `ingredients=${this.searchQuery}`;

			const searchResults = await axios(`${apiURL}${apiKey}&${search}`);

			this.results = searchResults.data;

		} catch (e) {

			console.log(e);

		}

	};

};
