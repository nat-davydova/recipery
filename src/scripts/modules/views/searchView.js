import { DOM } from '../configs/path';

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

	DOM.searchResults.appendChild(card);

};

export const renderSearchResults = searchArr => {

	searchArr.forEach(({id, title, image}) => {

		recipeCard(id, title, image);

	});

};
