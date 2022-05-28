
const validarJWT = require('./validar-jwt');
const validateFields = require('./validate-fields');
const validarAchivoSubir = require('./validar-archivo');


module.exports = {
    ...validarJWT,
    ...validateFields,
    ...validarAchivoSubir,
}