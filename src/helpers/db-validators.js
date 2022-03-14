const Country = require('../models/country');

const isValidCountry = async(country = '') => {
    const countryExists = await Country.findOne({ country });
    if (!countryExists) {
        throw new Error(`The country ${ country } doesn't exist`);
    }
}

module.exports = {
    isValidCountry
}