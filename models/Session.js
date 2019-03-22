const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let Session = new Schema({
    user_id: {
        type: String,
        require: true
    },
    last_action_time: {
        type: Date,
        require: true
    }
});

module.exports = mongoose.model('Session', Session);