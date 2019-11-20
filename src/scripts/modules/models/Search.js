import axios from 'axios';
import { recipeApi } from "../configs/apiKeys";

export default class Search {

	constructor(searchQuery) {
		this.searchQuery = searchQuery;
	};

	getSearchResults = async () => {

		try {
			const apiURL = `https://api.spoonacular.com/recipes/findByIngredients?`;
			const apiKey = `apiKey=${recipeApi}`;
			const search = `ingredients=${this.searchQuery}`;

			const searchResults = await axios(`${apiURL}${apiKey}&${search}`);

			this.results = searchResults;

			console.log(this.results);
		} catch (e) {
			console.log(e);
		}

	};

};
