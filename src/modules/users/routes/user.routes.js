const { Router } = require("express");
const {
  login,
  addPasswordClient,
  getClient
} = require("../controllers/user.controller.js");
const { validateJWT } = require("../../../middlewares/validate-jwt.js");

const router = Router();


router.post("/login", login); // Loguear Usuario
router.post("/password", [validateJWT], addPasswordClient); // Loguear Usuario
router.get("/client", /* [validateJWT], */ getClient); // Loguear Usuario


module.exports = router;
