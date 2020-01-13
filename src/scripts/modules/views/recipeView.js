import { DOM } from '../configs/path';
import { renderErrorMsg, showElem } from "../utils";

export const renderFullRecipe = (recipeData, errorMsg) => {

	if(errorMsg) {
		renderErrorMsg(errorMsg, DOM.fullRecipePanel.content);

		return;
	}

};
