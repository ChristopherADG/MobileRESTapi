const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let Cart = new Schema({
    user_email: {
        type: String,
        require: true
    },
    item_id: {
        type: String,
        require: true
    },
    quantity: {
        type: String,
        require: false
    }
});

module.exports = mongoose.model('Cart', Cart);