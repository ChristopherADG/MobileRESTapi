const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let Cart = new Schema({
    user_email: {
        type: String,
        require: true
    },
    quantity: {
        type: String,
        require: false
    },
    name: {
        type: String,
        require: true
    },
    atomic_price: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: false
    },
    image: {
        type: String,
        require: false
    }
});

module.exports = mongoose.model('Cart', Cart);