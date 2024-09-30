import { body, validationResult } from "express-validator";

//Perment de valider mes entrées
export const validateArticle = [
  body("numarticle")
    .notEmpty()
    .withMessage("Le numéro d'article est requis")
    .matches(/^[a-zA-ZÀ-ÿ0-9\s]{1,255}$/)
    .withMessage(
      "le numéro d'article ne doit pas contenir de caractéres spéciaux"
    ),
  body("designation")
    .notEmpty()
    .withMessage("la designation est obligatoire")
    .matches(/^[a-zA-ZÀ-ÿ0-9\s]{1,255}$/)
    .withMessage("la désignation ne doit pas contenir de caractéres spéciaux"),
  body("prixrevient")
    .notEmpty()
    .withMessage("Le prix de revient est requis")
    .isFloat({ gt: 0 })
    .withMessage("Le prix de revient doit être un nombre possitif")
    .matches(/^\d+(\.\d{1,2})?$/)
    .withMessage(
      "Le prix de revient doit avoir au maximum deux chiffres aprés la virgule"
    ),
  body("prixunitaire")
    .notEmpty()
    .withMessage("Le prix unitaire est requis")
    .isFloat({ gt: 0 })
    .withMessage("Le prix de unitaire doit être un nombre possitif")
    .matches(/^\d+(\.\d{1,2})?$/)
    .withMessage(
      "Le prix de unitaire doit avoir au maximum deux chiffres aprés la virgule"
    ),
  body("image").custom((value, { req }) => {
    if (!req.file) {
      throw new Error("Une image est requise");
    }
    return true;
  }),

  /**Midleware de gestion des erreurs */
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
