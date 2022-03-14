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

module.exports = {
    isValidCountry,
    isValidBrandEmail
}