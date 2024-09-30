//Fonction de validation des champs d'un formulaire
export function validateForm(req, res, next) {
  const { email, username, password } = req.body;
  let errors = [];

  ///**regex pour l'email (vérifier le format ) */
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    errors.push("Email non valide");
  }

  /** Regex pour le nom de l'utilisateur avec (3 - 20 caractéres alphanumérique ) */
  const usernameRegex = /^[a-zA-Z0-9]{3,20}$/;
  if (!username || !usernameRegex.test(username)) {
    errors.push(
      "Le nom de l'utilisateur doit comporter entre 3 et 20 caractéres alphanumérique "
    );
  }

  /**Regex pour le mot de passe (au moins caractéres et doit contenir un chiffre) */
  const passwordRegex = /^(?=.*\d).{6,}$/;
  if (!password || !passwordRegex.test(password)) {
    errors.push(
      "le mot de passe doit contenir au moins 6 caractéres et un chiffre"
    );
  }

  /**verification de l'existance d'erreur */
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }
  /**si tout est valide  */
  next();
}

/**exportation de la function */
