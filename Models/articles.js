//Models/articles.js
// models/Article.js

import { DataTypes } from "sequelize";
import sequelize from "../config/config.js";

// Définition du modèle Article
const Article = sequelize.define(
  "Article",
  {
    numarticle: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    designation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    prixrevient: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        isFloat: {
          args: { min: 0 },
          msg: "Le prix de revient doit être un nombre positif",
        },
      },
    },
    prixunitaire: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        isFloat: {
          args: { min: 0 },
          msg: "Le prix unitaire doit être positf",
        },
      },
    },
    image: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "article", // Nom de la table dans PostgreSQL
    timestamps: false, // Ajoute les champs createdAt et updatedAt
  }
);

export default Article;
