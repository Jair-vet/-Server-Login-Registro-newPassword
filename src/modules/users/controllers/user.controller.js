const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const pool = require("../../../database/db");
const {
  errors,
  success,
} = require("../../../helpers/constants/messages");
const constants = require("../../../helpers/constants/constants");
const {
  readAllRecord,
  permissionAny,
  updateRecord,
  getCurrentDate,
  isMembershipValid,
  encryptPassword,
  updatePassword,
} = require("../../../helpers/functions");
const tables = require("../../../helpers/constants/tables");
const { response } = require("express");
const { generateJWT } = require("../../../helpers/jwt");

const table = tables.tables.Owners_Club.name;

module.exports = {

  login: async (req, res) => {
    try {
      const { correo, membresia } = req.body;
      console.log(correo, membresia);
      let response = 0;
      let responseAux = 0;
  
      const myConnection = pool.connection(constants.DATABASE);
      myConnection.getConnection(async function (err, connection) {
        if (err) {
          return res.status(errors.errorConnection.code).json({
            ok: false,
            message: errors.errorConnection.message,
          });
        }
  
        // Validación de membresía
      const [isValid, validationMessage, userData] = await isMembershipValid(table, correo, membresia, connection);
      // console.log(isValid, validationMessage);

      if (isValid) {
        const userPasswordQuery = `SELECT password FROM ${table} WHERE correo = '${correo}' AND membresia = '${membresia}'`;
        connection.query(userPasswordQuery, [correo, membresia], async (err, result) => {
          if (err) {
            connection.release();
            myConnection.end();
            return res.status(errors.errorQuery.code).json({
              ok: false,
              message: errors.errorQuery.message,
            });
          }

          // If user already has a password
          if (result[0] && result[0].password) {
            connection.release();
            myConnection.end();
            return res.status(200).json({
              ok: true,
              message: 'Usuario ya tiene una contraseña',
              redirectUrl: 'https://www.stown.mx/pages/owners-club',
            });
          }
          // Generar JWT si la membresía es válida y no tiene contraseña
          const token = await generateJWT(userData[0].id);
          userData[0].token = token; // Incluir el token en la respuesta

          connection.release();
          myConnection.end();

          return res.status(200).json({
            ok: true,
            message: 'Membresía válida',
            data: userData[0],
          });
        });
      } else {
        connection.release();
        myConnection.end();

        return res.status(404).json({
          ok: false,
          message: validationMessage,
        });
      }
    });
    } catch (error) {
      console.log(error);
      return res.status(errors.errorMembresia.code).json({
        ok: false,
        message: errors.errorMembresia.message,
      });
    }
  },
  
  addPasswordClient: async (req, res) => {
    try {
      const { correo, membresia, newPassword } = req.body;
  
      const myConnection = pool.connection(constants.DATABASE);
      myConnection.getConnection(async function (err, connection) {
        if (err) {
          return res.status(errors.errorConnection.code).json({
            ok: false,
            message: errors.errorConnection.message,
          });
        }
  
        try {
          // Consulta para verificar el correo y la membresía
          const [membershipValid, message ] = await isMembershipValid(table, correo, membresia, connection);
          if (!membershipValid) {
            return res.status(404).json({
              ok: false,
              message,
            });
          }
  
          // Encriptar la nueva contraseña
          const [encryptionSuccess, encryptionMessage, hashedPassword] = await encryptPassword(newPassword);
          if (!encryptionSuccess) {
            return res.status(500).json({
              ok: false,
              message: encryptionMessage,
            });
          }
  
          // Actualizar la contraseña en la base de datos
          const [updateSuccess, updateMessage] = await updatePassword(table, correo, membresia, hashedPassword, connection);
          console.log(updateMessage);
          if (!updateSuccess) {
            return res.status(500).json({
              ok: false,
              message: updateMessage,
            });
          }
  
          return res.status(200).json({
            ok: true,
            message: 'Contraseña actualizada exitosamente',
          });
        } catch (innerError) {
          console.log(innerError);
          return res.status(500).json({
            ok: false,
            message: 'Error en el procesamiento de la solicitud',
          });
        } finally {
          connection.release();
          myConnection.end();
        }
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        ok: false,
        message: 'Error en el servidor',
      });
    }
  },

  getClient: async (req, res) => {
    try {
      const { correo, membresia } = req.body;
      let response = 0;

      const myConnection = pool.connection(constants.DATABASE);
      myConnection.getConnection(async function (err, connection) {
        if (err) {
          console.log(err);
          return res.status(errors.errorConnection.code).json({
            ok: false,
            message: errors.errorConnection.message,
          });
        }
        response = await readAllRecord(
          `SELECT * FROM ${table} WHERE correo = '${correo}' AND membresia = '${membresia}' `,
          connection
        );
        
        // console.log(response);
        
        connection.release();
        myConnection.end();

        return res.status(response[1].code).json({
          ok: response[0],
          message: response[1].message,
          data: response[2],
        });
      });
    } catch (error) {
      console.log(error);
      return res.status(errors.errorServer.code).json({
        ok: false,
        message: errors.errorServer.message,
      });
    }
  },
 

  
}