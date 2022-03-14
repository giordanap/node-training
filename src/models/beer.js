const { Schema, model } = require('mongoose');

const BeerSchema = Schema({
    name: {
        type: String,
        // required: [true, 'Name is required']
    },
    brandEmail: {
        type: String,
        // required: [true, 'BrandEmail is required'],
        // unique: true
    },
    country: {
        type: String,
        required: [true, 'Country is required']
    },
    city: {
        type: String,
        // required: [true, 'City is required']
    }
});

module.exports = model('Beer', BeerSchema);