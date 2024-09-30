import multer from "multer";
import path from "path";

//configurartion de multer pour le upload de fichier

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); //le fichier ou les fichiers seront stockés
  },
  filename: (req, file, cb) => {
    // Nettoyer le nom du fichier en retirant les espaces autour et à l'intérieur
    const cleanFileName = file.originalname
      .trim() // Enlève les espaces au début et à la fin
      .replace(/\s+/g, "_") // Remplace les espaces à l'intérieur par des underscores
      .toLowerCase(); // Met tout le nom en minuscules pour plus de cohérence

    cb(null, Date.now() + "-" + cleanFileName); // Générer un nom unique
  },
});

//Filtre pour accepter uniquement les fichiers image

const fileFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png|gif/;
  const mimetype = filetypes.test(file.mimetype);
  const extname = filetypes.test(
    path.extname(file.originalname).toLocaleLowerCase()
  );

  if (mimetype && extname) {
    return cb(null, true);
  }
  // Si l'extension ou le type MIME ne correspond pas, retourne une erreur
  cb(
    new Error(
      "Le fichier doit être une image au format jpeg, jpg, png ou gif."
    ),
    false
  );
};

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 2, // 2MB
  },
});
