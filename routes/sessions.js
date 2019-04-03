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
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email: email }, (err, user) => {
        if (err) {
            throw err;
        }
        if (!user) {
            res.json({ msg: 'Invalid email or password' });
        } else {
            if (password == user.password_hash) {
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
            } else {
                res.json({ msg: 'Invalid email or password' });
            }
        }
    })

});

// Middleware is signed in
function isSignedIn(user_id) {
    Session.find({ user_id: user_id }, (err) => {
        if (err) {
            return false
        } else {
            return true
        }
    })
}

//Update Session time
router.route('/update/:id').post((req, res) => {
    Session.findById(req.body.id, (err, session) => {
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
