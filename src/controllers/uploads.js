const { response } = require('express');
const { subirArchivo } = require('../helpers/subir-archivo');
const { Beer, Producto } = require('../models')
const fs = require("fs");
const path = require('path');
const res = require('express/lib/response');

const cargarArchivo = async( req, res = response ) => {

    try {

        const nombre = await subirArchivo( req.files, undefined, 'fotos' );
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

module.exports = {
    cargarArchivo,
    actualizarArchivo,
    mostrarCity,
}