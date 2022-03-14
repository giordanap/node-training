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
const Country = require('../models/country');
const Beer = require('../models/beer');

const router = Router();

router.get('/', beerGet);

router.put('/:id', beerPut);

router.post('/', [
	check('name', 'Name is required').not().isEmpty(),
	check('city', 'City must be a string with 3 characters as minimun').isLength({min: 3}),
	check('country').custom(
		async(country = '') => {
			const countryExists = await Country.findOne({ country });
			if(!countryExists){
				throw new Error(`The country ${ country } doesn't exist`);
			}
		}
	),
	check('brandEmail').custom(
		async(brandEmail = '') => {
			const emailExists = await Beer.findOne({ brandEmail });
			if (emailExists) {
				throw new Error(`The brandEmail ${ brandEmail } exist`);
			}
		}
	),
	validateFields,
	],
	beerPost);

router.delete('/:id', beerDelete);

router.patch('/', beerPatch);

module.exports = router;