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

function getProductsFromCart(cart) {
    console.log(cart)
    var arr = []
    cart.forEach(function(entry) {
        console.log(entry["user_email"]);
        Product.findById(entry["item_id"], (err, product) => {
            if (err) {
                console.log(err);
            } else {
                console.log(product["name"])
                arr.push(product)
            }
        });
        console.log(arr)
    });
    return arr
}

// Get cart.item for user
router.route('/find/:email').get((req, res) => {

    var productsInCart = []

    Cart.find({user_email: req.params.email}, (err, cart) => {
        if (err) {
            console.log(err);
        } else {
            productsInCart = getProductsFromCart(cart)
            console.log(productsInCart)
            res.json(productsInCart)
        }
    });
});

//Add Product
router.route('/add').post((req, res) => {
    let cart = new Cart({
        user_email: req.body.user_email,
        item_id: req.body.item_id,
        quantity: req.body.quantity
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
