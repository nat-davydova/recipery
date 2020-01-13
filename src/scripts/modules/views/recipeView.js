import { DOM } from '../configs/path';
import { renderErrorMsg, showElem } from "../utils";

export const renderFullRecipe = (recipeData, errorMsg) => {

	if(errorMsg) {
		renderErrorMsg(errorMsg, DOM.fullRecipePanel.content);

		return;
	}

	//image handling
	DOM.fullRecipePanel.recipeImg.setAttribute('src', recipeData.imgSource);
	DOM.fullRecipePanel.recipeImg.setAttribute('alt', recipeData.title);

	//title handling
	DOM.fullRecipePanel.title.textContent = recipeData.title;

	showElem(DOM.fullRecipePanel.recipe);
};
