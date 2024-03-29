const {Router} = require('express');
const { check } = require('express-validator');
const { usuariosGet, usuariosPost, usuariosPut, usuariosDelete, usuariosPatch } = require('../controllers/usuarios');
const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');

// const { validarCampos } = require('../middlewares/validar-campos');
// const validarJWT = require('../middlewares/validar-jwt');
// const {esAdminRole,tieneRole} = require('../middlewares/validar-rol');
const { validarCampos,validarJWT, esAdminRole, tieneRole } = require('../middlewares');

const router = Router();

  router.get('/', usuariosGet)
  router.put('/:id',[
     check('id', 'No es un ID válido').isMongoId(),
     check('nombre', 'El nombre es obligatorio').not().isEmpty(),
     check('id').custom(existeUsuarioPorId),
     check('rol').custom( esRoleValido ),
     validarCampos
  ], usuariosPut)

  router.post('/', [
    check('correo', 'El correo no es válido').isEmail(),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'La contraseña debe ser más de 6 letras').isLength({min:6}),
    check('correo').custom( emailExiste ),
    // check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('rol').custom( esRoleValido ),
    validarCampos
  ], usuariosPost)
  router.delete('/:id',[
    validarJWT,
    // esAdminRole,
    tieneRole('VENTAS_ROLE'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos

  ], usuariosDelete)
  router.patch('/', usuariosPatch)

module.exports = router;