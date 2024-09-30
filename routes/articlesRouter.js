// routes/articleRoutes.js
import express from "express";
import { validateArticle } from "../middlewares/articleValidator.js";
import { cleanData } from "../middlewares/articleCleanup.js";
import { upload } from "../middlewares/articleUpload.js";

import {
  listArticles,
  addArticle,
  updateArticle,
  deleteArticle,
} from "../controlllers/articlesControlleurs.js";
const router = express.Router();

// Routes CRUD pour les articles
router.get("/articles", listArticles);
router.post(
  "/articles",
  upload.single("image"),
  validateArticle,
  cleanData,
  addArticle
);
router.put("/articles/:id", updateArticle);
router.delete("/articles/:id", deleteArticle);

export default router;
