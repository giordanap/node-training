const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields, validarAchivoSubir } = require('../middlewares');
const { coleccionesPermitidas } = require('../helpers')
const { 
    cargarArchivo, 
    actualizarArchivo, 
    mostrarCity, 
    actualizarArchivoCloudinary 
} = require('../controllers');

const router = Router();

router.post('/:carpeta', validarAchivoSubir, cargarArchivo);

router.put('/:coleccion/:id', [
        check('id', 'El id debe ser de mongo').isMongoId(),
        check('coleccion').custom( c => coleccionesPermitidas( c, ['beers','productos'])),
        validarAchivoSubir,
        validateFields,
    ], 
    actualizarArchivoCloudinary);
    // actualizarArchivo);

router.get('/:coleccion/:id',[
        check('id', 'El id debe ser de mongo').isMongoId(),
        check('coleccion').custom( c => coleccionesPermitidas( c, ['beers','productos'])),
        validateFields,
    ],
    mostrarCity);

module.exports = router;
