const express = require("express");
const userRoutes = require("./routes/user.routes");
const router = express.Router();


// Agrega aquí todas tus rutas combinadas
router.use("/users", userRoutes);

module.exports = router;
