const { Schema, model } = require('mongoose');

const CategoriaSchema = Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        unique: true
    },
    state: {
        type: Boolean,
        default: true,
        required: true
    },
    beer:{
        type: Schema.Types.ObjectId,
        ref: 'Beer',
        require: true
    }
});

module.exports = model('Categoria', CategoriaSchema);