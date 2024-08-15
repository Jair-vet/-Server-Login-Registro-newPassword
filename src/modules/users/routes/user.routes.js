const { Router } = require("express");
const {
  login,
  addPasswordClient,
  getClient,
  validClient,
  updatePassword,
  obtainMembresia
} = require("../controllers/user.controller.js");
const { validateJWT } = require("../../../middlewares/validate-jwt.js");

const router = Router();


router.post("/login", login); // Loguear Usuario
router.post("/password", [validateJWT], addPasswordClient); // Loguear Usuario
router.post("/valid-user",  validClient); // Valida membresia y correo del Usuario
router.post("/recuperar-password", updatePassword); // Actualiza password del Usuario
router.post("/recuperar-membresia", obtainMembresia); // Actualiza password del Usuario
router.get("/client", /* [validateJWT], */ getClient); // Loguear Usuario


module.exports = router;
