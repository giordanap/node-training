const { Schema, model } = require('mongoose');

const ProductoSchema = Schema({
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
    },
    price: {
        type: Number,
        default: 0
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        require: true
    },
    description: { type: String},
    enable: { type: Boolean, default: true},
});

ProductoSchema.methods.toJSON = function() {
    const { __v, _id, state,...producto } = this.toObject();
    producto.uid = _id;
    return producto;
}

module.exports = model('Producto', ProductoSchema);