var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var contactSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    rua: {
        type: String,
        required: true
    },
    ruaNum: {
        type: String,
        required: true
    },
    Bairro: {
        type: String,
        required: true
    },
    cidade: {
        type: String,
        required: true
    },
    celular: {
        type: String,
        required: true
    },
    whatsapp: {
        type: Boolean,
        required: true
    }
}, {
    timestamps: true
});

var User = new Schema({
    username: {
        type: String,
        unique: true,
    },
    firstname: {
        type: String,
        default: ''
    },
    lastname: {
        type: String,
        default: ''
    },
    admin: {
        type: Boolean,
        default: false
    },
    contact: contactSchema
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);
