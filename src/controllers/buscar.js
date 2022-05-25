const { response } = require('express');
const { Beer, Categorias, Producto } = require('../models');
const { ObjectId } = require('mongoose').Types;

const coleccionesPermitidas = [
    'beers',
    'categorias',
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
        ],
        $and: [
            { city: 'Lima'},
        ]
    });

    res.json({
        results: beers
    })
}

const buscarCategorias = async( termino = '', res = response) => {
    
    const esMongoId = ObjectId.isValid( termino );
    if ( esMongoId ) {
        const categorias = await Categorias.findById(termino)
                                .populate('beer', 'name');
        return res.json({
            results: ( categorias ) ? [ categorias ] : []
        })
    }

    const regex = new RegExp( termino, 'i' );

    const categorias = await Categorias.find( { name: regex } )
                            .populate('beer', 'name');

    res.json({
        results: categorias
    })
}

const buscarProductos = async( termino = '', res = response) => {
    
    const esMongoId = ObjectId.isValid( termino );
    if ( esMongoId ) {
        const productos = await Producto.findById(termino)
                            .populate('categoria', 'name')
                            .populate('beer', 'name');
        return res.json({
            results: ( productos ) ? [ productos ] : []
        })
    }

    const regex = new RegExp( termino, 'i' );

    const productos = await Producto.find({
                            $or: [ 
                                { name: regex },  
                                { description: regex },  
                            ],
                        })
                        .populate('categoria', 'name')
                        .populate('beer', 'name');

    res.json({
        results: productos
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
            buscarCategorias(termino, res);
        break;
        case 'productos':
            buscarProductos(termino, res);
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