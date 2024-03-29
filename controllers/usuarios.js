const {response,request} = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');


const usuariosGet = async(req = request, res = response) => {
    // const {q,nombre = "No name"} = req.query //query params ?
    const { limite = 5, desde = 0 } = req.query;

    // const usuarios = await Usuario.find({estado: true})
    //  .skip(Number(desde))
    //  .limit(Number(limite));

    //  const total = await Usuario.countDocuments({estado: true});

     const [total,usuarios] = await Promise.all([
      Usuario.countDocuments({estado: true}),
      Usuario.find({estado: true})
        .skip(Number(desde))
        .limit(Number(limite))
     ])
    

    res.json({
      total,
      usuarios
    });
  }

const usuariosPost = async(req, res = response) => {

    

    const { nombre,correo, password, rol } = req.body;
    const usuario = new Usuario({nombre,correo, password, rol});

    // const existeEmail = await Usuario.findOne({correo});

    // // if(existeEmail){
    // //    return res.status(400).json({
    // //       msg: 'El correo ya existe!'
    // //    })
    // // }

    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password,salt);


    await usuario.save();

    res.status(200).json(usuario);
    }

const usuariosPut = async(req, res = response) => {
    const {id} = req.params;
    const { _id,password,google,correo, ...resto} = req.body;

    if(password) {
      const salt = bcryptjs.genSaltSync();
      resto.password = bcryptjs.hashSync(password,salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id,resto);

    res.json(usuario);
  }
const usuariosPatch = (req, res = response) => {
res.json({
    msg:'patch API - controlador'
});
}
const usuariosDelete = async(req, res = response) => {

  const { id } = req.params;

  
  const usuario = await Usuario.findByIdAndUpdate(id,{estado:false});


res.json(usuario);
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPatch,
    usuariosPut,
    usuariosDelete
}