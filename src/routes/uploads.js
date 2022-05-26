const { Router } = require('express');
const { check } = require('express-validator');
const { cargarArchivo, actualizarArchivo } = require('../controllers');
const { validateFields } = require('../middlewares');
const { coleccionesPermitidas } = require('../helpers')

const router = Router();

router.post('/', cargarArchivo);
router.put('/:coleccion/:id', [
        check('id', 'El id debe ser de mongo').isMongoId(),
        check('coleccion').custom( c => coleccionesPermitidas( c, ['beers','productos'])),
        validateFields,
    ], 
    actualizarArchivo);

module.exports = router;
