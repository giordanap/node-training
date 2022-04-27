const { response } = require('express');
const Beer = require('../models/beer');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/generar-jwt');
const { googleVerify } = require('../helpers/google-verify');

const login = async( req, res = response) => {

    const { brandEmail, country } = req.body;
    
    try {
        
        const beer = await Beer.findOne({ brandEmail });
        
        // verficar si el email existe tresCruces@gmail.com
        if ( !beer ) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - correo'
            })
        }

        // verficar ciudad
        if ( beer.city != 'Lima' ) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - ciudad: no es Lima'
            })
        }

        // verificar country
        const validCountry = bcryptjs.compareSync(country, beer.country);
        if ( !validCountry ) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - country'
            })
        }

        // generar JWT
        const token = await generarJWT( beer.id );

        res.json({
            beer,
            token
        }) 

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }


}

const googleSignIn = async( req, res = response ) => {

    const { id_token } = req.body;

    try {

        const { brandEmail, name, city } = await googleVerify( id_token );

        let beer = await Beer.findOne({ brandEmail });

        if ( !beer ) {
            // Tengo que crearlo
            const data = {
                name: nombre,
                brandEmail: correo,
                country: 'Perú',
                city: img
            }

            beer = new Beer( data );
            await beer.save();
        }

        // Generar el JWT
        const token = await generarJWT( beer.id );

        res.json({
            beer,
            token
        })

    } catch (error) {
        res.status(400).json({
            msg: 'Token de Google no es válido'
        })
    }

}



module.exports = { 
    login,
    googleSignIn
 };
