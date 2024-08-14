const jwt = require('jsonwebtoken');

const validateJWT = (req, res, next) => {
  // Obtener el encabezado de autorización
  const authHeader = req.header('Authorization');

  // Verificar que el encabezado esté presente
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      ok: false,
      msg: 'NO HAY TOKEN',
    });
  }

  // Extraer el token del encabezado
  const token = authHeader.split(' ')[1];

  try {
    // Verificar el token
    const { id_user } = jwt.verify(token, process.env.JWT_SECRET);
    req.id_user = id_user;

    // Continuar con el siguiente middleware
    next();
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: 'TOKEN INVALIDO',
    });
  }
};

module.exports = {
  validateJWT,
};
