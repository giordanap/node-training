
const generarJWT = require('./generar-jwt');
const googleVerify = require('./google-verify');
const dbValidators = require('./db-validators');
const subirArchivo = require('./subir-archivo');

module.exports = {
    ...generarJWT,
    ...googleVerify,
    ...dbValidators,
    ...subirArchivo,
}