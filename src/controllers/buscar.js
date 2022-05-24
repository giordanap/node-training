const { response } = require('express');
const { Beer } = require('../models');
const { ObjectId } = require('mongoose').Types;

const coleccionesPermitidas = [
    'beers',
    'categorias',
    'countries',
    'productos',
];

const buscarBeers = async( termino = '', res = response) => {
    
    const esMongoId = ObjectId.isValid( termino );
    if ( esMongoId ) {
        const beer = await Beer.findById(termino);
        return res.json({
            results: ( beer ) ? [ beer ] : []
        })
    }

    const regex = new RegExp( termino, 'i' );

    const beers = await Beer.find({
        $or: [ 
            { name: regex },  
            { brandEmail: regex },  
        ]
    });

    res.json({
        results: beers
    })
}

const buscar = ( req, res = response ) => {
    
    const { coleccion, termino } = req.params;
    
    if ( !coleccionesPermitidas.includes( coleccion ) ) {
        return res.status(400).json({
            msg: `Las colecciones permitidas son: ${coleccionesPermitidas }`
        })
    }

    switch (coleccion) {
        case 'beers':
            buscarBeers(termino, res);
        break;
        case 'categorias':
        break;
        case 'countries':
        break;
        case 'productos':
        break;

        default:
            res.status(500).json({
                msg: 'Se le olvido hacer esta búsqueda'
            });
    }
}

module.exports = {
    buscar
}