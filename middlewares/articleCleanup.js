import sanitizeHtml from "sanitize-html";
//permet de désinfecter mes donner

export const cleanData = (req, res, next) => {
  req.body.numarticle = sanitizeHtml(req.body.numarticle.trim(), {
    allowedTags: [], // N'autorise aucun balise HTML
    allowedAttributes: {}, // N'autorise aucun attribut
  });
  req.body.designation = sanitizeHtml(req.body.designation.trim(), {
    allowedTags: [],
    allowedAttributes: {},
  });
  req.body.prixrevient = parseFloat(req.body.prixrevient);
  req.body.prixunitaire = parseFloat(req.body.prixunitaire);
  // (req.body.image = data.image), //L'image est gerer par Multer
  next();
};
