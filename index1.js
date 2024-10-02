import express from "express";
import path from "path";
import compression from "compression";
import helmet from "helmet";
import cors from "cors";
import { fileURLToPath } from "url";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import articleRoute from "./routes/articlesRouter.js";
import tierRouter from "./routes/tiersRouter.js";
import commandeRouter from "./routes/commandeRouter.js";

app.use(express.json());
//app.use(express.urlencoded({ extended: true })); //non utiliseur dans le cas de mon apiRestFul qui n'envoie et ne reçoit que du JSON
app.use(compression());
app.use(helmet());
app.use(
  cors({
    origin: "http://localhost:5173", //Permet de se connection depuis cette url si mon application tourne sur un autre port comme en Dev
    methods: ["GET", "POST", "PUT", "DELETE"], //Méthode autorisées
    allowedHeaders: ["Content-Type", "Authorization"], // En-têtes autorisés
    credentials: true, //Autorise l'envoie des cookie ou autre information d'authentification
  })
);

app.use("/uploads", express.static(path.resolve(__dirname, "uploads")));

/** middleware pour servir les fichiers statiques */
app.use(express.static(path.resolve(__dirname, "dist")));

app.use(articleRoute);
app.use(tierRouter);
app.use(commandeRouter);

//**Midleware pour gérer les erreurs 404 (route non trouvée) */
app.use((req, res, next) => {
  res.status(404).json({ error: "La ressource demandée est introuvable" });
});

/** Midleware global pour gérer les erreurs serveur (500) et autres */
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Erreur interne du serveur" });
});
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "dist", "index.html"));
});
/**lancement du server */
/**definition du port d'écoute */
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`server ecoute sur le port ${port}`);
});
