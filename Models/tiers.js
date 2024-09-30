import { DataTypes } from "sequelize";
import sequelize from "../config/config.js";
//définition du modéle tiers
const Tier = sequelize.define(
  "Tier",
  {
    numtiers: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    nomtiers: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    adressetiers: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "tiers",
    timestamps: false,
  }
);
export default Tier;
