const jwt = require("jsonwebtoken");

const generateJWT = (id_user) => {
  return new Promise((resolve, reject) => {
    const payload = {
      id_user,
    };

    jwt.sign(payload, process.env.JWT_SECRET, (err, token) => {
      if (err) {
        console.log(err);
        reject("NO SE PUDO GENERAR TOKEN");
      } else {
        resolve(token);
      }
    });
  });
};

module.exports = {
  generateJWT,
  
};
