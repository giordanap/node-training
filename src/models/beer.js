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

BeerSchema.methods.toJSON = function() {
    const { __v, country, ...beer } = this.toObject();
    return beer;
}

module.exports = model('Beer', BeerSchema);