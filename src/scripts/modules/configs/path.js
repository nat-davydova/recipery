export const PATH = {

  search: {
    btn: '.search-home__btn',
    field: '.search-home__input',
    form: '.search-home',
    error: '.search-home .error'
  },

  panels: {
    panelsArr: document.querySelectorAll('.panel'),
    home: document.querySelector('.home-panel'),
    searchRes: document.querySelector('.search-res-panel'),
    fullRecipe: document.querySelector('.recipe-panel')
  },

  loaders: {
    mainLoader: document.querySelector('.preloader')
  },

  recipeCard: {
    card: document.querySelector('.recipe-card'),
    cardClass: '.recipe-card',
    img: '.recipe-card__img img',
    title: '.recipe-card__title',
    moreBtn: '.recipe-card__more'
  },

  searchResPanel: {
    results: document.querySelector('.search-results__results')
  },

  fullRecipePanel: {
    content: document.querySelector('.recipe-full__content'),
    ingred: {
      card: document.querySelector('.recipe-full__ingred'),
      content: '.recipe-full__ingred-content p',
      img: '.recipe-full__ingred-img img'
    },
    ingredList: document.querySelector('.recipe-full__ingreds-list'),
    readyTime: document.querySelector('.ready-in-mins__content'),
    recipe: document.querySelector('.recipe-full__content-inner'),
    recipeImg: document.querySelector('.recipe-full__img img'),
    servings: document.querySelector('.servings__content'),
    title: document.querySelector('.recipe-full__title'),
    url: document.querySelector('.recipe-full__more')
  },

  returnBtns: {
    searchReturn: '.search-results .return-btn',
    recipeReturn: '.recipe-full .return-btn'
  },

  errorContainer: document.querySelector('.errorContainer'),

  pagination: {
    pagination: '.pagination',
    next: '.next-page',
    prev: '.prev-page'
  }
}
