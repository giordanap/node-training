const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields, validarJWT } = require('../middlewares');

const { 
	isValidCountry, 
	isValidBrandEmail,
	beerExistsById
} = require('../helpers');

const {
	beersGet,
	beerGet,
	beerPut,
	beerPost,
	beerDelete,
	beerPatch
} = require('../controllers');

const router = Router();

router.get('/', beersGet);

router.get('/:id',[
		validarJWT,
	],
	beerGet);

router.put('/:id',[
		check('id', 'No es un id válido').isMongoId(), 
		check('id').custom(beerExistsById),
		check('country').custom(isValidCountry),
		validateFields,
	],
	beerPut);

router.post('/', [
		check('name', 'Name is required').not().isEmpty(),
		check('brandEmail').custom(isValidBrandEmail),
		check('country').custom(isValidCountry),
		check('city', 'City must be a string with 3 characters as minimun').isLength({min: 3}),
		validateFields,
	],
	beerPost);

router.delete('/:id', [
		check('id','No es un id válido').isMongoId(),
		check('id').custom(beerExistsById),
		validateFields
	],
	beerDelete);

router.patch('/', beerPatch);

module.exports = router;