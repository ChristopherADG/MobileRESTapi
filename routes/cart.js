const express = require('express');

const router = express.Router();
const Cart = require('../models/Cart');
const Product = require('../models/Product');

//All items in cart
router.route('/').get((req, res) => {
    Cart.find((err, cart) => {
        if (err) {
            console.log(err);
        } else {
            res.json(cart);
        }
    })
});

// Get cart.item for user
router.route('/find/:email').get((req, res) => {

    Cart.find({user_email: req.params.email}, (err, cart) => {
        if (err) {
            console.log(err);
        } else {
            res.json(cart)
        }
    });
});

//Add Product
router.route('/add').post((req, res) => {
    let cart = new Cart({
        user_email: req.body.user_email,
        quantity: req.body.quantity,
        name: req.body.name,
        atomic_price: req.body.atomic_price,
        description: req.body.description,
        image: req.body.image
    });
    cart.save()
        .then(cart => {
            res.status(200).json({ 'cart': 'Added successfully' });
        })
        .catch(err => {
            res.status(400).send('Failed to create new record');
        });
});


//Delete Product
router.route('/delete/:id').get((req, res) => {
    Cart.findByIdAndRemove({ _id: req.params.id }, (err, cart) => {
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
