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

CategoriaSchema.methods.toJSON = function() {
    const { __v, _id, state,...categoria } = this.toObject();
    categoria.uid = _id;
    return categoria;
}

module.exports = model('Categoria', CategoriaSchema);