import axios from 'axios';
import { recipeApi } from "../configs/apiKeys";

export default class Recipe {

	constructor(id) {
		this.id = id;
	}

	grabFullRecipe = async () => {

		try {
			const apiURL = `https://api.spoonacular.com/recipes/`;
			const apiKey = `apiKey=${recipeApi}`;
			const recipeQuery = `${this.id}/information`;

			const fullRecipe = await axios(`${apiURL}${recipeQuery}/?${apiKey}`);

			console.log(`${apiURL}${recipeQuery}/?${apiKey}`);
			console.log(fullRecipe);

		} catch (e) {

		}

	};

}
