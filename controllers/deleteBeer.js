import { deleteBeer, getBeer } from "../services/beerService.js";

export default async ({
  params,
  response
}) => {
  const beerId = params.id;

  if (!beerId) {
    response.status = 400;
    response.body = { msg: "Invalid beer id" };
    return;
  }

  const foundBeer = await getBeer(beerId);
  if (!foundBeer) {
    response.status = 404;
    response.body = { msg: `Beer with ID ${beerId} not found` };
    return;
  }

  await deleteBeer(beerId);
  response.body = { msg: "Beer deleted" };
};
