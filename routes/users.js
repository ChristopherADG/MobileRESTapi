const express = require('express');

const router = express.Router();
const User = require('../models/User');


//All users
router.route('/').get((req, res) => {
    User.find((err, users) => {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    })
});

//Specific User
router.route('/:id').get((req, res) => {
    User.findById(req.params.id, (err, user) => {
        if (err) {
            console.log(err);
        } else {
            res.json(user);
        }
    })
});

//Add User
router.route('/add').post((req, res) => {
    let user = new User({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password_hash: req.body.password_hash,
        company_id: req.body.company_id
    });
    user.save()
        .then(user => {
            res.status(200).json({ 'user': 'Added successfully' });
        })
        .catch(err => {
            res.status(400).send('Failed to create new record');
        });
});

//Update User
router.route('/update/:id').post((req, res) => {
    User.findById(req.params.id, (err, user) => {
        if (!user) {
            res.json(err);
        } else {
            user.first_name = req.body.first_name;
            user.last_name = req.body.last_name;
            user.email = req.body.email;
            user.password_hash = req.body.password_hash;
            user.role = req.body.company_id;

            user.save()
                .then(user => {
                    res.json('Update done');
                })
                .catch(err => {
                    res.status(400).send('Update failed');
                });
        }
    })
});

//Delete User
router.route('/delete/:id').get((req, res) => {
    User.findByIdAndRemove({ _id: req.params.id }, (err, user) => {
        if (err) {
            res.json(err);
        } else {
            res.json('Removed successfully');
        }
    })
});

module.exports = {
    unprotected: router
};
