export const DOM = {

	search: {
		btn: '.search-home__btn',
		field: '.search-home__input',
	},

	panels: {
		panelsArr: document.querySelectorAll('.panel'),
		home: document.querySelector('.home-panel'),
		searchRes: document.querySelector('.search-res-panel'),
	},

	loaders: {
		mainLoader: document.querySelector('.preloader'),
	},

	recipeCard: {
		card: document.querySelector('.recipe-card'),
		img: '.recipe-card__img img',
		title: '.recipe-card__title',
	},

	searchResPanel: {
		results: document.querySelector('.search-results__results'),
	},

	returnBtns: {
		recipeReturn: '.search-results .return-btn',
	},

	errorContainer: document.querySelector('.errorContainer')

};
