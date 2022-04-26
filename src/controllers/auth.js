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
        
        const googleUser = await googleVerify( id_token );
        console.log(googleUser);

        res.json({
            msg: 'Todo bien!',
            id_token
        })

    } catch (error) {
    }

}



module.exports = { 
    login,
    googleSignIn
 };
