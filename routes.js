import { Router } from "https://deno.land/x/oak/mod.ts";

import getBeers from "./controllers/getBeers.js";
import getBeerDetails from "./controllers/getBeerDetails.js";
import createBeer from "./controllers/createBeer.js";
import updateBeer from "./controllers/updateBeer.js";
import deleteBeer from "./controllers/deleteBeer.js";

const router = new Router();

router
  .get("/beers", getBeers)
  .get("/beers/:id", getBeerDetails)
  .post("/beers", createBeer)
  .put("/beers/:id", updateBeer)
  .delete("/beers/:id", deleteBeer);

export default router;
