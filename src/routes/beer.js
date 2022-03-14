const { Router } = require('express');
const { check } = require('express-validator');
const {
	beerGet,
	beerPut,
	beerPost,
	beerDelete,
	beerPatch
} = require('../controllers/beer');
const { validateFields } = require('../middlewares/validate-fields');

const router = Router();

router.get('/', beerGet);

router.put('/:id', beerPut);

router.post('/', [
	check('name', 'Name is required').not().isEmpty(),
	check('brandEmail', 'Invalid email').isEmail(),
	check('country', 'Country must be a string with 6 characters as minimun').isLength({min: 6}),
	check('city', 'City must be a string with 6 characters as minimun').isLength({min: 6}),
	validateFields,
	],
	beerPost);

router.delete('/:id', beerDelete);

router.patch('/', beerPatch);

module.exports = router;