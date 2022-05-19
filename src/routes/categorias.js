const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');

const router = Router();

router.get('/', (req, res) => {
    console.log('Todo OK')
})

module.exports = router;