import express from "express";
import { listCommandes } from "../controlllers/commandesController.js";
const router = express.Router();

///CRUD pour les commandes
router.get("/commande", listCommandes);

///Export de mon router Commande
export default router;
