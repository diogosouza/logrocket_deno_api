import beerRepo from "../repositories/beerRepo.js";

export const getBeers = async () => {
	const beers = await beerRepo.selectAll();

	var result = new Array();

	beers.rows.map(beer => {
		var obj = new Object();

		beers.rowDescription.columns.map((el, i) => {
			obj[el.name] = beer[i];
		});
		result.push(obj);
	});

	return result;
};

export const getBeer = async beerId => {
	const beers = await beerRepo.selectById(beerId);

	var obj = new Object();
	beers.rows.map(beer => {
		beers.rowDescription.columns.map((el, i) => {
			obj[el.name] = beer[i];
		});
	});

	return obj;
};

export const createBeer = async beerData => {
	const newBeer = {
		name: String(beerData.name),
		brand: String(beerData.brand),
		is_premium: "is_premium" in beerData ? Boolean(beerData.is_premium) : false,
		registration_date: new Date()
	};

	await beerRepo.create(newBeer);

	return newBeer.id;
};

export const updateBeer = async (beerId, beerData) => {
	const beer = await getBeer(beerId);

	if (Object.keys(beer).length === 0 && beer.constructor === Object) {
		throw new Error("Beer not found");
	}

	const updatedBeer = {
		name: beerData.name !== undefined ? String(beerData.name) : beer.name,
		brand: beerData.brand !== undefined ? String(beerData.brand) : beer.brand,
		is_premium:
			beerData.is_premium !== undefined
				? Boolean(beerData.is_premium)
				: beer.is_premium
	};

	beerRepo.update(beerId, updatedBeer);
};

export const deleteBeer = async beerId => {
	beerRepo.delete(beerId);
};
