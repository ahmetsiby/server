import { DataTypes } from "sequelize";
import sequelize from "../config/config.js";
//définition du modéle commandes
const Commande = sequelize.define(
  "Commande",
  {
    numcommande: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    datecommande: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    tiers_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "commande",
    timestamps: false,
  }
);
export default Commande;
