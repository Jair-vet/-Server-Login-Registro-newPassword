require("dotenv").config(); // importar dotenv para obtener las variables de entorno

module.exports = {
  USERDB: process.env.USERDB,
  PASSWORD: process.env.PASSWORD,
  DATABASE: process.env.DATABASE,
  HOST: process.env.HOST,
  JWT_SECRET: process.env.JWT_SECRET,
  TIME_ZONE: process.env.TIME_ZONE,
  SERVER_FILES: process.env.SERVER_FILES,
};
