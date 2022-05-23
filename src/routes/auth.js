const { Router } = require('express');
const { check } = require('express-validator');
const { login, googleSignIn } = require('../controllers');
const { validateFields } = require('../middlewares');

const router = Router();

router.post('/login',[
    check('brandEmail', 'El correo es obligatorio').isEmail(),
    check('country', 'La contraseña es obligatoria').not().isEmpty(),
    validateFields,
], login);

router.post('/google',[
    check('id_token', 'id_token es necesario').not().isEmpty(),
    validateFields,
], googleSignIn);


module.exports = router;