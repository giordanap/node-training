const path = require('path');
const fs = require("fs");

const cloudinary = require('cloudinary').v2;
cloudinary.config( process.env.CLOUDINARY_URL );

const { response } = require('express');
const { subirArchivo } = require('../helpers/subir-archivo');

const { Beer, Producto } = require('../models')


const cargarArchivo = async( req, res = response ) => {

    try {

        const { carpeta } = req.params;
        const nombre = await subirArchivo( req.files, undefined, carpeta );
        res.json({ nombre});

    } catch (msg) {
        res.status(400).json({ msg });
    }

}

const actualizarArchivo = async( req, res = response) => {

    const { id, coleccion } = req.params;

    let modelo;

    switch ( coleccion ) {
        case 'beers':
            modelo = await Beer.findById(id);
            if ( !modelo) {
                return res.status(400).json({
                    msg: `No existe una cerveza con el id ${ id }`
                });
            }
            break;
        
        case 'productos':
            modelo = await Producto.findById(id);
            if ( !modelo) {
                return res.status(400).json({
                    msg: `No existe un producto con el id ${ id }`
                });
            }
            break;
    
        default:
            return res.status(500).json({ msg: 'Se me olvido validar esto' });
    }

    
    if ( modelo.city || modelo.city !== '' ) {
        
        const pathCity = modelo.city;

        try {
            if (fs.existsSync( pathCity )) fs.unlinkSync( pathCity );
        } catch (err) {
          console.error(err);
        }

    }

    const name = await subirArchivo( req.files, undefined, coleccion );
    modelo.city = name; // usado como campo para imagenes
    

    await modelo.save();

    res.json({ modelo });
    
}

const actualizarArchivoCloudinary = async( req, res = response) => {

    const { id, coleccion } = req.params;

    let modelo;

    switch ( coleccion ) {
        case 'beers':
            modelo = await Beer.findById(id);
            if ( !modelo) {
                return res.status(400).json({
                    msg: `No existe una cerveza con el id ${ id }`
                });
            }
            break;
        
        case 'productos':
            modelo = await Producto.findById(id);
            if ( !modelo) {
                return res.status(400).json({
                    msg: `No existe un producto con el id ${ id }`
                });
            }
            break;
    
        default:
            return res.status(500).json({ msg: 'Se me olvido validar esto' });
    }

    
    if ( modelo.city || modelo.city !== '' ) {
        
        const nameArr = modelo.city.split('/');
        const name = nameArr[ nameArr.length - 1 ];
        const [ public_id ] = name.split('.')

        try {
            cloudinary.uploader.destroy( public_id );
        } catch (err) {
          console.error(err);
        }

    }

    const { tempFilePath } = req.files.archivo;
    const { secure_url } = await cloudinary.uploader.upload( tempFilePath );
    modelo.city = secure_url;
 
    await modelo.save();

    res.json({ modelo });
    
}

const mostrarCity = async( req, res = response) => {

    const { id, coleccion } = req.params;

    let modelo;

    switch ( coleccion ) {
        case 'beers':
            modelo = await Beer.findById(id);
            if ( !modelo) {
                return res.status(400).json({
                    msg: `No existe una cerveza con el id ${ id }`
                });
            }
            break;
        
        case 'productos':
            modelo = await Producto.findById(id);
            if ( !modelo) {
                return res.status(400).json({
                    msg: `No existe un producto con el id ${ id }`
                });
            }
            break;
    
        default:
            return res.status(500).json({ msg: 'Se me olvido validar esto' });
    }

    
    if ( modelo.city || modelo.city !== '' ) {
        
        const pathCity = modelo.city;

        try {
            if (fs.existsSync( pathCity )) {
                return res.sendFile( pathCity );
            }
        } catch (err) {
          console.error(err);
        }

    }

    // res.json({ msg: 'falta place holder' });
    const noImgPath = path.join( __dirname, '../../assets/no-image.jpg');
    console.log(__dirname);
    res.sendFile(noImgPath);
}

module.exports = {
    cargarArchivo,
    actualizarArchivo,
    actualizarArchivoCloudinary,
    mostrarCity,
}