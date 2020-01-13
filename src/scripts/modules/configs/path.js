export const DOM = {

	search: {
		btn: '.search-home__btn',
		field: '.search-home__input',
	},

	panels: {
		panelsArr: document.querySelectorAll('.panel'),
		home: document.querySelector('.home-panel'),
		searchRes: document.querySelector('.search-res-panel'),
		fullRecipe: document.querySelector('.recipe-panel'),
	},

	loaders: {
		mainLoader: document.querySelector('.preloader'),
	},

	recipeCard: {
		card: document.querySelector('.recipe-card'),
		img: '.recipe-card__img img',
		title: '.recipe-card__title',
		moreBtn: '.recipe-card__more',
	},

	searchResPanel: {
		results: document.querySelector('.search-results__results'),
		pagination: document.querySelector('.search-results__pagination'),
	},

	fullRecipePanel: {
		content: document.querySelector('.recipe-full__content'),
		readyTime: document.querySelector('.ready-in-mins__content'),
		recipe: document.querySelector('.recipe-full__content-inner'),
		recipeImg: document.querySelector('.recipe-full__img img'),
		servings: document.querySelector('.servings__content'),
		title: document.querySelector('.recipe-full__title'),
		url: document.querySelector('.recipe-full__more'),
	},

	returnBtns: {
		recipeReturn: '.search-results .return-btn',
	},

	errorContainer: document.querySelector('.errorContainer'),

	pagination: {
		paginationBtns: '.pagination__link',
	}

};
