const { Schema, model } = require('mongoose');

const CountrySchema = Schema({
    country: {
        type: String,
        required: [true, 'Country is required']
    },
});

module.exports = model('Country', CountrySchema);