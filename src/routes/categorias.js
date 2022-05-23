const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields, validarJWT } = require('../middlewares');

const {
    cateogirasGet,
    cateogirasPost,
} = require('../controllers/categorias');

const router = Router();

router.get('/', cateogirasGet);

router.post('/', [
    validarJWT,
    check('name','El nombre es obligatorio').not().isEmpty(),
    validateFields,
    ], cateogirasPost);

module.exports = router;