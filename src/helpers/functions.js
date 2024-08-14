const tables = require("../helpers/constants/tables");
const bcrypt = require("bcrypt");
const { errors, success } = require("../helpers/constants/messages");
const constants = require("../helpers/constants/constants");
const axios = require("axios");
const FormData = require("form-data");
const moment = require("moment-timezone");
const fetch = require("node-fetch");
module.exports = {
  getCurrentDate() {
    moment.tz.setDefault(constants.TIME_ZONE);
    let currentTime = moment().format();
    currentTime = currentTime.replace("T", " ");
    currentTime = currentTime.slice(0, 19);
    return currentTime;
  },

  uploadFile: async (file, type, folder, server, name) => {
    return new Promise(async function (resolve, reject) {
      console.log(name, server);
      const fileBuffer = Buffer.from(file.data);
      const formData = new FormData();
      formData.append("file", fileBuffer, {
        filename: name,
        contentType: file.mimetype,
      });
      formData.append("bucket_name", type);
      formData.append("folder_name", folder);
      formData.append("endpoint_path", server);
      formData.append("with_replace", "false");
      try {
        const response = await axios.post(
          "https://www.binteapi.com:8080/api/submit/endpoint-dynamic/",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: "Token a7143f2e369e24e9ec084081de3f0927b4ea77a0",
            },
          }
        );
        resolve([true, success.successUpdate, response.data]);
      } catch (error) {
        console.log("Error al enviar los datos: ", error.message);
        resolve([false, errors.errorUploadFile, []]);
      }
    });
  },

  readPDF: async (path_pdf) => {
    return new Promise(async function (resolve, reject) {
      try {
        console.log(path_pdf);
        const dataPDF = await fetch(path_pdf);
        const filePDF = Buffer.from(await dataPDF.arrayBuffer()).toString(
          "base64"
        );
        resolve([true, success.succesPDF, filePDF]);
      } catch (error) {
        console.log(error);
        resolve([false, errors.errorPDF, 0]);
      }
    });
  },

  // Función para verificar si el usuario es admin
  isRoot: async (userId, connection) => {
    return new Promise((resolve, reject) => {
      connection.query(`SELECT id_rol FROM Users WHERE id = ${userId} and id_rol = 1`, [userId], (error, results) => {
        if (error) {
          console.log(error);
          resolve([false, errors.errorDataBase, 0]);
        } else {
          if (results.length > 0) {
            resolve([true, success.successCreate, results]);
          } else {
            resolve([false, errors.errorPermision, 0]);
          }
        }
      });
    });
  },

  isMembershipValid: async (table, correo, membresia, connection) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT membresia FROM ${table} WHERE correo = '${correo}' AND membresia = '${membresia}'`;
      
      // Pasa los valores como un array de parámetros
      connection.query(query, [correo, membresia], (error, results) => {
        if (error) {
          console.log(error);
          resolve([false, 'Error en la base de datos', 0]);
        } else {
          if (results.length > 0) {
            resolve([true, 'Membresía válida', results]);
          } else {
            resolve([false, 'Correo o membresía no coinciden', 0]);
          }
        }
      });
    });
  },

  encryptPassword: async (newPassword) => {
    return new Promise((resolve, reject) => {
      try {
        // Generar la sal para encriptar
        const salt = bcrypt.genSaltSync(10);
        
        // Encriptar la nueva contraseña
        const hashedPassword = bcrypt.hashSync(newPassword, salt);
        
        // Resolver la promesa con la contraseña encriptada
        resolve([true, 'Contraseña encriptada correctamente', hashedPassword]);
      } catch (error) {
        console.log(error);
        resolve([false, 'Error al encriptar la contraseña', null]);
      }
    });
  },

  updatePassword: async (table, correo, membresia, hashedPassword, connection) => {
    return new Promise((resolve, reject) => {
      // Consulta SQL para actualizar la contraseña, usando parámetros de consulta
      // const updateQuery = `UPDATE Stown.Owners_Club SET password  WHERE correo = '${correo}' AND membresia = '${membresia}'`;
      const updateQuery = `UPDATE ${table} SET password = '${hashedPassword}'  WHERE correo = '${correo}' AND membresia = '${membresia}'`;

      // Ejecutar la consulta con parámetros
      connection.query(updateQuery, [hashedPassword, correo, membresia], (error, results) => {
        if (error) {
          console.log(error);
          return resolve([false, 'Error al actualizar la contraseña']);
        }
  
        if (results.affectedRows > 0) {
          resolve([true, 'Contraseña actualizada correctamente']);
        } else {
          resolve([false, 'No se encontró el registro para actualizar']);
        }
      });
    });
  },
  

  // Función para obtener todos los proyectos
  getAllProjects: async (connection) => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT id FROM Projects', (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  },

  createRecord: async (object, table, connection) => {
    return new Promise(function (resolve, reject) {
      const query = `INSERT INTO ${table} SET ?`;
      connection.query(query, [object], async (error, results) => {
        if (error) {
          console.log(error);
          resolve([false, errors.errorDataBase, 0]);
        } else {
          if (results.affectedRows > 0) {
            resolve([true, success.successCreate, results.insertId]);
          } else {
            resolve([false, errors.errorCreate, 0]);
          }
        }
      });
    });
  },

  permissionAny: async (id, connection) => {
    return new Promise(function (resolve, reject) {
      const query = `SELECT * FROM Users WHERE id = ${id}`;
      connection.query(query, async (error, results) => {
        if (error) {
          resolve([false, errors.errorDataBase, 0, ""]);
        } else if (results.length > 0) {
          resolve([true, success.successGet, id, results[0].name]);
        }
      });
    });
  },

  readRecord: async (table, id, connection) => {
    return new Promise(function (resolve, reject) {
      const query = `SELECT * FROM ${table} WHERE id = ${id}`;
      console.log(query);
      connection.query(query, async (error, results) => {
        if (error) {
          console.log(error);
          resolve([false, errors.errorDataBase, 0]);
        } else {
          if (results.length > 0) {
            resolve([true, success.successGet, results[0]]);
          } else {
            resolve([false, errors.errorNotFound, 0]);
          }
        }
      });
    });
  },

  readPay: async (table, id_cliente, connection) => {
    return new Promise(function (resolve, reject) {
      const query = `SELECT * FROM ${table} WHERE id = ${id_cliente}`;
      console.log(query);
      connection.query(query, [table, id_cliente], (error, results) => {
        if (error) {
          console.log(error);
          resolve([false, errors.errorDataBase, 0]);
        } else {
          if (results.length > 0) {
            resolve([true, success.successGet, results[0]]);
          } else {
            resolve([false, errors.errorNotFound, 0]);
          }
        }
      });
    });
  },

  readPayAll: async (table, id_cliente, connection) => {
    return new Promise(function (resolve, reject) {
      const query = `SELECT * FROM ${table} WHERE id = ${id_cliente}`;
      console.log(query);
      connection.query(query, [table, id_cliente], (error, results) => {
        if (error) {
          console.log(error);
          resolve([false, errors.errorDataBase, 0]);
        } else {
          if (results.length > 0) {
            resolve([true, success.successGet, results[0]]);
          } else {
            resolve([false, errors.errorNotFound, 0]);
          }
        }
      });
    });
  },

  readAllRecord: async (query, connection) => {
    return new Promise(function (resolve, reject) {
      connection.query(query, async (error, results) => {
        if (error) {
          console.log(error);
          resolve([false, errors.errorDataBase, []]);
        } else {
          if (results.length > 0) {
            resolve([true, success.successGet, results]);
          } else {
            resolve([true, success.successGet, []]);
          }
        }
      });
    });
  },

  updateRecord: async (object, table, id, connection) => {
    return new Promise(function (resolve, reject) {
      // UPDATE `ccamigos_congreso-musicos`.`ClientesRegistros` SET `id_pago` = '3' WHERE (`id` = '27');
      const query = `UPDATE  ${table} SET ? WHERE id = ${id}`;
      connection.query(query, [object], async (error, results) => {
        if (error) {
          console.log(error);
          resolve([false, errors.errorDataBase, 0]);
        } else {
          if (results.affectedRows > 0) {
            resolve([true, success.successUpdate, id]);
          } else {
            resolve([false, errors.errorUpdate, 0]);
          }
        }
      });
    });
  },
  updatePay: async (pago, table, id_cliente, connection) => {
    return new Promise(function (resolve, reject) {
      // UPDATE ClientesRegistros SET pago = ${staus} WHERE id = ${id_cliente}
      const query = `UPDATE ${table} SET id_pago = ${pago} WHERE id = ${id_cliente}`;
      // const { pago } = object
      connection.query(query, [table, pago, id_cliente], (error, results) => {
        if (error) {
          console.log(error);
          resolve([false, errors.errorDataBase, 0]);
        } else {
          if (results.affectedRows > 0) {
            resolve([true, success.successUpdate, id_cliente]);
          } else {
            resolve([false, errors.errorUpdate, 0]);
          }
        }
      });
    });
  },

  updatePayAll: async (pago, table, id_cliente, connection) => {
    return new Promise(function (resolve, reject) {
      // UPDATE ClientesRegistros SET pago = ${staus} WHERE id = ${id_cliente}
      const query = `UPDATE ${table} SET id_pago = ${pago} WHERE id = ${id_cliente}`;
      // const { pago } = object
      connection.query(query, [table, pago, id_cliente], (error, results) => {
        if (error) {
          console.log(error);
          resolve([false, errors.errorDataBase, 0]);
        } else {
          if (results.affectedRows > 0) {
            resolve([true, success.successUpdate, id_cliente]);
          } else {
            resolve([false, errors.errorUpdate, 0]);
          }
        }
      });
    });
  },
  updateEventFunction: async (object, table, id, connection) => {
    return new Promise(function (resolve, reject) {
      const query = `UPDATE ${table} SET ? WHERE id_evento = ?`;
      connection.query(query, [object, id], async (error, results) => {
        if (error) {
          console.log(error);
          resolve([false, errors.errorDataBase, 0]);
        } else {
          if (results.affectedRows > 0) {
            resolve([true, success.successUpdate, id]);
          } else {
            resolve([false, errors.errorUpdate, 0]);
          }
        }
      });
    });
  },

  deleteRecord: async (table, id, connection) => {
    return new Promise(function (resolve, reject) {
      const query = `DELETE FROM  ${table}  WHERE id = ${id}`;
      connection.query(query, async (error, results) => {
        if (error) {
          console.log(error);
          resolve([false, errors.errorDataBase, 0]);
        } else {
          if (results.affectedRows > 0) {
            resolve([true, success.successDelete, id]);
          } else {
            resolve([false, errors.errorDataBase, 0]);
          }
        }
      });
    });
  },

  updateRecords: async (object, table, condition, connection) => {
    return new Promise(function (resolve, reject) {
      const query = `UPDATE  ${table} SET ? WHERE ${condition}`;

      connection.query(query, [object], async (error, results) => {
        if (error) {
          console.log(error);
          resolve([false, errors.errorDataBase, 0]);
        } else {
          if (results.affectedRows > 0) {
            resolve([true, success.successUpdate, 0]);
          } else {
            resolve([false, errors.errorUpdate, 0]);
          }
        }
      });
    });
  },
};
