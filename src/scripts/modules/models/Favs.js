export default class Favs {

	constructor() {
		this.favsList = [];
	}

	addToFav (id) {
		this.favsList.push(id);
	}

	removeFromFav (id) {
		const index = this.favsList.findIndex(ind => id === ind);
		this.favsList.splice(index, 1);
	}

};
