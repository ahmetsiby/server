// controllers/ArticleController.js
import fs from "fs";
import path from "path";
import Article from "../Models/articles.js";

// Liste tous les articles
export const listArticles = async (req, res) => {
  try {
    const articles = await Article.findAll();
    res.json(articles);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des articles" });
  }
};

// Ajouter un article
export const addArticle = async (req, res) => {
  try {
    const { numarticle, designation, prixrevient, prixunitaire } = req.body;
    const image = req.file ? req.file.filename : null; //chemin du fichier de l'image si uploder
    const newArticle = await Article.create({
      numarticle,
      designation,
      prixrevient,
      prixunitaire,
      image,
    });
    res.status(201).json(newArticle);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur lors de l'ajout de l'article" });
  }
};

// Modifier un article
export const updateArticle = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);

    const { numarticle, designation, prixrevient, prixunitaire } = req.body;
    const image = req.file ? req.file.path : null; //chemin du fichier de l'image si uploder
    const article = await Article.findByPk(id);

    if (!article) {
      return res.status(404).json({ error: "Article non trouvé" });
    }

    article.numarticle = numarticle;
    article.designation = designation;
    article.prixrevient = prixrevient;
    article.prixunitaire = prixunitaire;
    article.image = image ? image : article.image;
    await article.save();

    res.json(article);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Erreur lors de la mise à jour de l'article" });
  }
};

// Supprimer un article
export const deleteArticle = async (req, res) => {
  try {
    // Assurez-vous que l'ID est converti en entier
    const id = parseInt(req.params.id, 10); // 10 pour la base décimale
    console.log(id);

    // Vérifiez si l'ID est valide
    if (isNaN(id)) {
      return res.status(400).json({ error: "ID invalide" });
    }

    const article = await Article.findByPk(id);

    if (!article) {
      return res.status(404).json({ error: "Article non trouvé" });
    }

    // Supprimer l'image associée, si elle existe
    if (article.image) {
      const imagePath = path.resolve(article.image);
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error("Erreur lors de la suppression de l'image : ", err);
        }
      });
    }

    await article.destroy();
    res.json({ message: "Article supprimé avec succès" });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Erreur lors de la suppression de l'article" });
  }
};
