import Commandes from "../Models/commandes.js";
//listes de tous mes commandes
export const listCommandes = async (req, res) => {
  try {
    const commandes = await Commandes.findAll();
    res.json(commandes);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Erreur lors de la récupération des données de la table commande",
    });
  }
};
