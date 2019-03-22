const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let Company = new Schema({
    name: {
        type: String,
        require: true
    },
    street_address: {
        type: String,
        require: true
    },
    zipcode: {
        type: String,
        require: true
    },
    city: {
        type: String,
        require: true
    },
    state: {
        type: String,
        require: true
    },
    country: {
        type: String,
        require: true
    }
});

module.exports = mongoose.model('Company', Company);