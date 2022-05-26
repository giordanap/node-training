const { Beer, Country, Categorias, Producto } = require('../models');
const { collection } = require('../models/beer');

const isValidBrandEmail = async(brandEmail = '') => {
    const EmailExists = await Beer.findOne({ brandEmail });
    if (EmailExists) {
        throw new Error(`The brandEmail ${ brandEmail } exist`);
    }
}

const isValidCountry = async(country = '') => {
    const countryExists = await Country.findOne({ country });
    if (!countryExists) {
        throw new Error(`The country ${ country } doesn't exist`);
    }
}

const beerExistsById = async(id) => {
    const _beerExistsById = await Beer.findById(id);
    if(!_beerExistsById) {
        throw new Error(`The beer with id ${ id } doesn't exist`)
    }
}

const categoriaExistsById = async(id) => {
    const _categoriaExistsById = await Categorias.findById(id);
    if(!_categoriaExistsById) {
        throw new Error(`The category with id ${ id } doesn't exist`)
    }
}

const productoExistsById = async(id) => {
    const _productoExistsById = await Producto.findById(id);
    if(!_productoExistsById) {
        throw new Error(`The product with id ${ id } doesn't exist`)
    }
}

const coleccionesPermitidas = (coleccion = '', colecciones = []) => {

    const incluida = colecciones.includes( coleccion );
    if ( !incluida) {
        throw new Error(`La coleccion ${ coleccion } no es permitida, ${ colecciones }`);
    }

    return true;
}

module.exports = {
    isValidCountry,
    isValidBrandEmail,
    beerExistsById,
    categoriaExistsById,
    productoExistsById,
    coleccionesPermitidas,
}