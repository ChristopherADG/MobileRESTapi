const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let Product = new Schema({
    name: {
        type: String,
        require: true
    },
    atomic_price: {
        type: Number,
        require: true
    },
    quantity: {
        type: Number,
        require: true
    },
    attributes: {
        type: [String],
        require: false
    }
});

module.exports = mongoose.model('Product', Product);