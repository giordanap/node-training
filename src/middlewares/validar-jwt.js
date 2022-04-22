const { request, response } = require('express');
const jwt = require('jsonwebtoken');

const Beer = require('../models/beer');

const validarJWT = async( req = request, res = response, next ) => {

    const token = req.header('x-token');

    if ( !token ) {
        
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        })

    }

    try {

        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );

        // leer la cerveza que corresponde al uid
        const beer = await Beer.findById( uid );

        // Verifica si existe la cerveza
        if ( !beer) {
        
            return res.status(401).json({
                msg: 'No existe la cerveza'
            })
    
        }

        // Verifica si es de Lima
        if ( beer.city != 'Lima' ) {
        
            return res.status(401).json({
                msg: 'No es de Lima'
            })
    
        }

        
        req.beer = beer;
        next();

    } catch (error) {
        
        console.log(error);
        res.status(401).json({
            msg: 'Token no valido'
        })

    }

    

}

module.exports = { validarJWT }