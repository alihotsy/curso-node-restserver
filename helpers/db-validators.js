const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRoleValido = async(rol = '') => {

    console.log(rol)
    const existeRol = await Role.findOne({rol});
    if(!existeRol){
      throw new Error(`El rol ${rol} no existe en la BD`);
    }

  } 

const emailExiste = async(correo = '') => {
    const existeEmail = await Usuario.findOne({correo});
    if(existeEmail) {
      throw new Error(`El email ${correo} ya existe!`)
    }
}

const existeUsuarioPorId = async(id) => {
  
    try {
      const existeUsuario = await Usuario.findById(id);
      if(!existeUsuario) {
        throw new Error(`El usuario con id: ${id} no existe`);
  
      }
      
    } catch (error) {
      throw new Error(`El usuario con id: ${id} no existe`);
    }
  
}
  
  module.exports = { 
    esRoleValido,
    emailExiste,
    existeUsuarioPorId
  }