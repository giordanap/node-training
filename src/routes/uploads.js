const { Router } = require('express');
const { check } = require('express-validator');
const { cargarArchivo, actualizarArchivo, mostrarCity } = require('../controllers');
const { validateFields, validarAchivoSubir } = require('../middlewares');
const { coleccionesPermitidas } = require('../helpers')

const router = Router();

router.post('/', validarAchivoSubir, cargarArchivo);

router.put('/:coleccion/:id', [
        check('id', 'El id debe ser de mongo').isMongoId(),
        check('coleccion').custom( c => coleccionesPermitidas( c, ['beers','productos'])),
        validarAchivoSubir,
        validateFields,
    ], 
    actualizarArchivo);

router.get('/:coleccion/:id',[
        check('id', 'El id debe ser de mongo').isMongoId(),
        check('coleccion').custom( c => coleccionesPermitidas( c, ['beers','productos'])),
        validateFields,
    ],
    mostrarCity);

module.exports = router;
