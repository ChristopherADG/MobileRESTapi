const express = require('express');

const router = express.Router();
const User = require('../models/User');
const Session = require('../models/Session');


//All sessions
router.route('/').get((req, res) => {
    Session.find((err, session) => {
        if (err) {
            console.log(err);
        } else {
            res.json(session);
        }
    })
});

//Specific session
router.route('/:id').get((req, res) => {
    Session.findById(req.params.id, (err, session) => {
        if (err) {
            console.log(err);
        } else {
            res.json(session);
        }
    })
});

// Sign in
router.route('/signin').post((req, res) => {
    passw = req.body.password
    console.log("password " + passw);
    var query = User.find({}).select({"email": req.body.email, "password_hash": passw});

    query.exec(function(err, user) {
        if (err) {
            console.log(err);
        } else if (typeof user === 'undefined') {
            res.status(400).send('Failed to create new session. Undefined user');
        }
        else if(isSignedIn(user.email)) {
            res.redirect('/');
        } else {
            console.log("*** " + user.email)

            let session = new Session({
                user_id: user.email,
                last_action_time: new Date()
            });

            session.save()
                .then(session => {
                    res.status(200).json({ 'session': 'Added successfully ' + session.id });
                })
                .catch(err => {
                    res.status(400).send('Failed to create new session');
                });

        }
    });
/*
    User.find({ email: req.body.email, password_hash: passw}, function (err, user) {
        if (err) {
            console.log(err);
        } else if(isSignedIn(user.id)) {
            res.redirect('/');
        } else {
            console.log(user.id)

            let session = new Session({
                user_id: user.id,
                last_action_time: new Date()
            });

            session.save()
                .then(session => {
                    res.status(200).json({ 'session': 'Added successfully ' + session.id });
                })
                .catch(err => {
                    res.status(400).send('Failed to create new session');
                });

        }
    });
    */
    
});

// Middleware is signed in
function isSignedIn(user_id) {
    Session.find({user_id: user_id}, (err) => {
        if (err) {
            return false
        } else {
            return true
        }
    })
}

//Update Session time
router.route('/update/:id').post((req, res) => {
    Session.findById( req.body.id, (err, session) => {
        if (err) {
            console.log(err);
        } else {
            session.last_action_time = new Date();
            session.save()
                .then(session => {
                    res.json('Update time done');
                })
                .catch(err => {
                    res.status(400).send('Update time failed');
                });
        }
    })
});

//Delete Session by id
router.route('/delete/:id').get((req, res) => {
    Session.findByIdAndRemove({ _id: req.params.id }, (err, session) => {
        if (err) {
            res.json(err);
        } else {
            res.json('Session removed successfully');
        }
    })
});

module.exports = {
    unprotected: router
};
