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

router.put('/:id', beerPut);

router.post('/', beerPost);

router.delete('/:id', beerDelete);

router.patch('/', beerPatch);

module.exports = router;