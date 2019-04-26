const express = require('express');

const router = express.Router();
const Product = require('../models/Product');


//All products
router.route('/').get((req, res) => {
    Product.find((err, product) => {
        if (err) {
            console.log(err);
        } else {
            res.json(product);
        }
    })
});

//Specific Product
router.route('/:id').get((req, res) => {
    Product.findById(req.params.id, (err, product) => {
        if (err) {
            console.log(err);
        } else {
            res.json(product);
        }
    })
});

//Add Product
router.route('/add').post((req, res) => {
    let product = new Product({
        name: req.body.name,
        atomic_price: req.body.atomic_price,
        quantity: req.body.quantity,
        description: req.body.description,
        image: req.body.image
    });
    product.save()
        .then(product => {
            res.status(200).json({ 'product': 'Added successfully' });
        })
        .catch(err => {
            res.status(400).send('Failed to create new record');
        });
});

//Update Product
router.route('/update/:id').post((req, res) => {
    Product.findById(req.params.id, (err, product) => {
        if (!product) {
            res.json(err);
        } else {
            product.name = req.body.name;
            product.atomic_price = req.body.atomic_price;
            product.quantity = req.body.quantity;
            product.description = req.body.description;
            product.image = req.body.image;

            product.save()
                .then(product => {
                    res.json('Update done');
                })
                .catch(err => {
                    res.status(400).send('Update failed');
                });
        }
    })
});

//Delete Product
router.route('/delete/:id').get((req, res) => {
    Product.findByIdAndRemove({ _id: req.params.id }, (err, product) => {
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
