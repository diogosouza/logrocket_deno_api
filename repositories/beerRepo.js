import client from "../db/database.js";

class BeerRepo {
	create(beer) {
		return client.query(
			"INSERT INTO beers (name, brand, is_premium, registration_date) VALUES ($1, $2, $3, $4)",
			beer.name,
			beer.brand,
			beer.is_premium,
			beer.registration_date
		);
	}

	selectAll() {
		return client.query("SELECT * FROM beers ORDER BY id");
	}

	selectById(id) {
		return client.query(`SELECT * FROM beers WHERE id = $1`, id);
	}

	update(id, beer) {
		var query = `UPDATE beers `;
		var hasSet = false;
		if (beer.name !== undefined) {
			query +=
				` SET name = '${beer.name}'` + (beer.brand !== undefined ? "," : "");
			hasSet = true;
		}

		if (beer.brand !== undefined) {
			if (!hasSet) query += " SET ";
			query +=
				` brand = '${beer.brand}'` + (beer.is_premium !== undefined ? "," : "");
			hasSet = true;
		}

		if (beer.is_premium !== undefined) {
			if (!hasSet) query += " SET ";
			query += ` is_premium = '${beer.is_premium}'`;
		}

		query += ` WHERE id = ${id}`;
		
		return client.query(query);
	}

	delete(id) {
		return client.query(`DELETE FROM beers WHERE id = $1`, id);
	}
}

export default new BeerRepo();
