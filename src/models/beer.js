const { Schema, model } = require('mongoose');

const BeerSchema = Schema({
    name: {
        type: String,
    },
    brandEmail: {
        type: String,
    },
    country: {
        type: String,
        required: [true, 'Country is required']
    },
    city: {
        type: String,
    }
});

module.exports = model('Beer', BeerSchema);