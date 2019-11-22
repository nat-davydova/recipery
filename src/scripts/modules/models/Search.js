import axios from 'axios';
import { recipeApi } from "../configs/apiKeys";

export default class Search {

	constructor(searchQuery) {
		this.searchQuery = searchQuery;
	};

	//converting multiple words query into proper request (ingred1,+ingred2,+ingred3... etc)
	static multiWordsQuery = (searchQuery) => {

		const queryArr = searchQuery.split(' ');

		let newQueryArr;

		if(queryArr.length > 1) {

			newQueryArr = queryArr.map((elem, index) => {

				return index === 0 ? elem : `+${elem}`;

			});

			this.searchQuery = newQueryArr.join(',');

		}

	};

	//grabbing search results from API (10 items per request)
	getSearchResults = async () => {

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
