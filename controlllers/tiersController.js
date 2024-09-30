import Tiers from "../Models/tiers.js";
//Liste de tous les tiers
export const listTiers = async (req, res) => {
  try {
    const tiers = await Tiers.findAll();
    res.json(tiers);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Erreur lors de la récupération des données de la table tiesr",
    });
  }
};
