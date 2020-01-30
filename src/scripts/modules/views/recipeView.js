import { DOM } from '../configs/path';
import { renderErrorMsg, showElem, cleanElemInner } from "../utils";

const renderIngredient = (img, title, text) => {

	const card = DOM.fullRecipePanel.ingred.card.cloneNode(true);

	showElem(card);

	const cardImg = card.querySelector(DOM.fullRecipePanel.ingred.img);

	cardImg.setAttribute('src', `https://spoonacular.com/cdn/ingredients_250x250/${img}`);
	cardImg.setAttribute('alt', title);

	const cardContent = card.querySelector(DOM.fullRecipePanel.ingred.content);

	cardContent.textContent = text;

	DOM.fullRecipePanel.ingredList.appendChild(card);

};

export const renderFullRecipe = (recipeData, errorMsg) => {

	if(errorMsg) {
		renderErrorMsg(errorMsg, DOM.fullRecipePanel.content);

		return;
	}

	//id addition
	DOM.fullRecipePanel.content.dataset.id = recipeData.id;

	//image handling

	recipeData.imgSource && DOM.fullRecipePanel.recipeImg.setAttribute('src', recipeData.imgSource);

	DOM.fullRecipePanel.recipeImg.setAttribute('alt', recipeData.title);

	//title handling
	DOM.fullRecipePanel.title.textContent = recipeData.title;

	//ready time handling
	DOM.fullRecipePanel.readyTime.textContent = `${recipeData.readyMins} mins`;

	//servings handling
	DOM.fullRecipePanel.servings.textContent = recipeData.servings;

	//ingredients rendering
	cleanElemInner(DOM.fullRecipePanel.ingredList);

	recipeData.ingreds.forEach(({image, name, original}) => renderIngredient(image, name, original));

	//learn more url
	DOM.fullRecipePanel.url.setAttribute('href', recipeData.url);

	showElem(DOM.fullRecipePanel.recipe);
};
