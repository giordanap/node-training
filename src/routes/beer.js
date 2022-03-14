const { Router } = require('express');
const {
	beerGet,
	beerPut,
	beerPost,
	beerDelete,
	beerPatch
} = require('../controllers/beer');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');
const { 
	isValidCountry, 
	isValidBrandEmail 
} = require('../helpers/db-validators');
const Beer = require('../models/beer');

const router = Router();

router.get('/', beerGet);

router.put('/:id', beerPut);

router.post('/', [
	check('name', 'Name is required').not().isEmpty(),
	check('city', 'City must be a string with 3 characters as minimun').isLength({min: 3}),
	check('country').custom(isValidCountry),
	check('brandEmail').custom(isValidBrandEmail),
	validateFields,
	],
	beerPost);

router.delete('/:id', beerDelete);

router.patch('/', beerPatch);

module.exports = router;