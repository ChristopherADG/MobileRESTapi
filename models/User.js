const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let User = new Schema({
    first_name: {
        type: String,
        require: true
    },
    last_name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password_hash: {
        type: String,
        require: true
    },
    company_id: {
        type: String,
        require: true
    }
});

module.exports = mongoose.model('User', User);