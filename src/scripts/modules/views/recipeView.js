import { DOM } from '../configs/path';
import { renderErrorMsg, showElem, cleanElemInner } from "../utils";

const renderIngredient = (img, title, text) => {

	const card = DOM.fullRecipePanel.ingred.card.cloneNode(true);

	showElem(card);

	const cardImg = card.querySelector(DOM.fullRecipePanel.ingred.img);

	img && cardImg.setAttribute('src', `https://spoonacular.com/cdn/ingredients_250x250/${img}`);
	cardImg.setAttribute('alt', title);

	const cardContent = card.querySelector(DOM.fullRecipePanel.ingred.content);

	cardContent.textContent = text;

	DOM.fullRecipePanel.ingredList.appendChild(card);

};

export const renderFullRecipe = ({id, imgSource, title, readyMins, servings, ingreds, url}, errorMsg) => {

	if(errorMsg) {
		renderErrorMsg(errorMsg, DOM.fullRecipePanel.content);

		return;
	}

	//id addition
	DOM.fullRecipePanel.content.dataset.id = id;

	//image handling

	imgSource && DOM.fullRecipePanel.recipeImg.setAttribute('src', imgSource);

	DOM.fullRecipePanel.recipeImg.setAttribute('alt', title);

	//title handling
	DOM.fullRecipePanel.title.textContent = title;

	//ready time handling
	DOM.fullRecipePanel.readyTime.textContent = `${readyMins} mins`;

	//servings handling
	DOM.fullRecipePanel.servings.textContent = servings;

	//ingredients rendering
	cleanElemInner(DOM.fullRecipePanel.ingredList);

	ingreds.forEach(({image, name, original}) => renderIngredient(image, name, original));

	//learn more url
	DOM.fullRecipePanel.url.setAttribute('href', url);

	showElem(DOM.fullRecipePanel.recipe);
};
