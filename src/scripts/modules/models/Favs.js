export default class Favs {

	constructor() {
		this.favsList = [];
	}

	addToFav (elem) {
		let id = elem.dataset.id;
		this.favsList.push(id);
		elem.dataset.isLiked = 'liked';
	}

	removeFromFav (elem) {
		let id = elem.dataset.id;

		const index = this.favsList.findIndex(ind => id === ind);

		this.favsList.splice(index, 1);
	}

};
