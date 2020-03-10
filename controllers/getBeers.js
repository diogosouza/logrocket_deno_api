import { getBeers } from "../services/beerService.js";

export default async ({ response }) => {
	response.body = await getBeers();
};
