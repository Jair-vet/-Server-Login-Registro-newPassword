module.exports = {
    errors: {
      errorPDF: {
        code: 404,
        message: "ERROR AL OBTENER EL PDF",
      },
      errorPermision: {
        code: 404,
        message: "NO TIENES PERMISO DE REALIZAR ESTA ACCIÓN",
      },
      errorEmail: {
        code: 404,
        message: "CORREO NO ENCONTRADO",
      },
      errorSendEmail: {
        code: 404,
        message: "EL CORREO NO FUE ENVIADO",
      },
      errorNameTwo: {
        code: 404,
        message: "EL NOMBRE YA EXISTE",
      },
      errorEmailTwo: {
        code: 404,
        message: "EL CORREO YA EXISTE",
      },
      errorUser: {
        code: 404,
        message: "USUARIO NO ENCONTRADO",
      },
      errorPassword: {
        code: 404,
        message: "PASSWORD INCORRECTO",
      },
  
      errorNotFound: {
        code: 404,
        message: "EL REGISTRO NO EXISTE",
      },
      errorServer: {
        code: 500,
        message: "ERROR EN SERVIDOR",
      },
      errorDataBase: {
        code: 404,
        message: "ERROR EN BASE DE DATOS",
      },
      errorConnection: {
        code: 500,
        message: "ERROR EN CONEXION",
      },
      errorTokenNotFound: {
        code: 404,
        message: "NO HAY TOKEN EN PETICION",
      },
      errorTokenInvalid: {
        code: 401,
        message: "EL TOKEN ES INVALIDO",
      },
      errorCreate: {
        code: 404,
        message: "ERROR AL DAR DE ALTA REGISTRO",
      },
      errorMembresia: {
        code: 404,
        message: "ERROR CON EL CORREO O LA MEMBRESIA",
      },
      errorUploadFile: {
        code: 404,
        message: "ERROR AL SUBIR ARCHIVO",
      },
      errorJoinOrganization: {
        code: 404,
        message: "Ocurrio un error",
      },
      errorAlredyOrganization: {
        code: 404,
        message: "Ya estas dentro",
      },
  
      errorJoinOrganizationNotFound: {
        code: 404,
        message: "El codigo no existe",
      },
      errorUpdate: {
        code: 404,
        message: "ERROR AL ACTUALIZAR REGISTRO",
      },
  
      errorDelete: {
        code: 404,
        message: "ERROR AL ELIMINAR REGISTRO",
      },
      errorLogin: {
        code: 404,
        message: "ERROR AL INICIAR SESIÓN",
      },
      errorRecordAlredyExists: {
        code: 404,
        message: "EL REGISTRO YA EXISTE",
      },
      errorToSendData: {
        code: 404,
        message: "ERROR AL MANDAR LOS DATOS",
      },
      errorFileNotFound: {
        code: 404,
        message: "EL ARCHIVO NO FUE ENVIADO CORRECTAMENTE",
      },
      errorOrganization: {
        code: 404,
        message: "EL usuario no pertence a ningun templo",
      },
    },
  
    success: {
      succesPDF: {
        code: 200,
        message: "EL PDF SE GENERO EXITOSAMENTE",
      },
      successGet: {
        code: 200,
        message: "PETICIÓN EXITOSA",
      },
      successCreate: {
        code: 200,
        message: "REGISTRO EXITOSO",
      },
      successUpdate: {
        code: 200,
        message: "REGISTRO ACTUALIZADO",
      },
      successDelete: {
        code: 200,
        message: "REGISTRO ELIMINADO",
      },
      successSendEmail: {
        code: 200,
        message: "CORREO ENVIADO CORRECTAMENTE",
      },
      successJoinOrganization: {
        code: 200,
        message: "Felicidades te haz unido con exito",
      },
    },
  };
  