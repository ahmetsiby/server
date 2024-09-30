import express from "express";
import { listTiers } from "../controlllers/tiersController.js";
const router = express.Router();

//CRUD pour les Tiers
router.get("/tiers", listTiers);

/**exportation de notre router pour tier
 *
 */
export default router;
