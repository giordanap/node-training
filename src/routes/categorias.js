const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields, validarJWT } = require('../middlewares');
const { categoriaExistsById } = require('../helpers');

const {
    cateogirasGet,
    cateogirasPost,
    obtenerCategoria,
    actualizarCategoria,
    borrarCategoria,
} = require('../controllers');

const router = Router();

router.get('/', cateogirasGet);

router.get('/:id',[
        validarJWT,
        check('id').custom( categoriaExistsById ),
	],
	obtenerCategoria);

router.post('/', [
        validarJWT,
        check('name','El nombre es obligatorio').not().isEmpty(),
        validateFields,
    ], 
    cateogirasPost);

router.put('/:id',[
        validarJWT,
        check('id').custom(categoriaExistsById),
        validateFields,
    ],
    actualizarCategoria);

router.delete('/:id', [
        validarJWT,
        check('id').custom(categoriaExistsById),
        validateFields
    ],
    borrarCategoria);

module.exports = router;