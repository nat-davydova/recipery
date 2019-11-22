//get input value
export const getInputVal = input => input.value;

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
