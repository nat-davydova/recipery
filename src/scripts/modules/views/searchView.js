import { DOM } from '../configs/path';
import { renderErrorMsg, showElem, pagination } from "../utils";

//multiwords search query
export const multiWordsQuery = (query) => {

	const queryArr = query.split(' ');

	let newQueryArr;

	if(queryArr.length > 1) {

		newQueryArr = queryArr.map((elem, index) => {

			return index === 0 ? elem : `+${elem}`;

		});

		query = newQueryArr.join(',');

	}

	return query;

};

//rendeer search results
const recipeCard = (id, title, img) => {

	const card = DOM.recipeCard.card.cloneNode(true);

	card.classList.remove('js-hidden');

	card.dataset.id = id;

	const recipeTitle = card.querySelector(DOM.recipeCard.title);

	recipeTitle.textContent = title;

	const recipeImg = card.querySelector(DOM.recipeCard.img);

	recipeImg.setAttribute('src', img);

	recipeImg.setAttribute('alt', title);

	DOM.searchResPanel.results.appendChild(card);

};

export const renderSearchResults = (searchArr, errorMsg, itemsPerPage, currentPage) => {

	if(errorMsg) {
		renderErrorMsg(errorMsg, DOM.searchResPanel.results);

		return;
	}

	if (searchArr.length > itemsPerPage) {

		//show pagination, if there are more elems than displayed on 1 page
		showElem(DOM.searchResPanel.pagination);

		const pagedArr = pagination(searchArr, itemsPerPage, currentPage);

		if(pagedArr) {
			pagedArr.forEach(({id, title, image}) => {

				recipeCard(id, title, image);

			});
		}

	} else if (searchArr.length <= itemsPerPage && searchArr.length > 0) {

		searchArr.forEach(({id, title, image}) => {

			recipeCard(id, title, image);

		});

	} else {

		renderErrorMsg(`Sorry, we can't find any recipes :( Try other keywords!`, DOM.searchResPanel.results);

	}

};
