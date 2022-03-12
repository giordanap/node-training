const { Router } = require('express');
const {
	beerGet,
	beerPut,
	beerPost,
	beerDelete,
	beerPatch
} = require('../controllers/beer');

const router = Router();

router.get('/', beerGet);

router.put('/', beerPut);

router.post('/', beerPost);

router.delete('/', beerDelete);

router.patch('/', beerPatch);

module.exports = router;