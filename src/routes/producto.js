const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields, validarJWT } = require('../middlewares');
const { productoExistsById, categoriaExistsById } = require('../helpers');

const {
    obtenerProducto,
    obtenerProductos,
    productoPost,
    actualizarProducto,
    borrarProducto,
} = require('../controllers');

const router = Router();

router.get('/', obtenerProductos);

router.get('/:id',[
        validarJWT,
        check('id').custom( productoExistsById ),
	],
	obtenerProducto);

router.post('/', [
        validarJWT,
        check('name','El nombre es obligatorio').not().isEmpty(),
        check('categoria').custom(categoriaExistsById),
        validateFields,
    ], 
    productoPost);

router.put('/:id',[
        validarJWT,
        check('id').custom( productoExistsById ),
        validateFields,
    ],
    actualizarProducto);

router.delete('/:id', [
        validarJWT,
        check('id').custom( productoExistsById ),
        validateFields
    ],
    borrarProducto);

module.exports = router;