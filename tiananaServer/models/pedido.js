const mongoose = require('mongoose');
const { schema } = require('./user');
const Schema = mongoose.Schema;

const pedidoOptSchema = new Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    option: {
        type: String,
        default: 'none'
    },
    ativo: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

const pedidoSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    pedidos: [ pedidoOptSchema ]  

}, {
    timestamps: true
});

var Pedido = mongoose.model('Pedido', pedidoSchema);

module.exports = Pedido;