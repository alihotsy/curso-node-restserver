
const validaCampos = require('../middlewares/validar-campos');
const validarJWT = require('../middlewares/validar-jwt');
const validaRoles = require('../middlewares/validar-rol');

module.exports = {
    ...validaCampos,
    validarJWT,
    ...validaRoles
}