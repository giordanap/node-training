const Country = require('../models/country');
const Beer = require('../models/beer');

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

module.exports = {
    isValidCountry,
    isValidBrandEmail,
    beerExistsById
}