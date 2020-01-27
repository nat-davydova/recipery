export default class Favs {

	constructor() {
		this.favsList = [];
	}

	addToFav (elem) {
		let id = elem.dataset.id;
		this.favsList.push(id);
		elem.dataset.isLiked = 'liked';
	}

};
