const express = require('express'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    mongoose = require('mongoose'),
    config = require('./config/database');

mongoose.connect(config.database);

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('MongoDB database connection established successfully');
})

const app = express();

app.use(cors());

app.use(bodyParser.json());

const users = require('./routes/users');
const products = require('./routes/products');
const sessions = require('./routes/sessions');
const cart = require('./routes/cart');

app.use('/users', users.unprotected)
app.use('/products', products.unprotected)
app.use('/sessions', sessions.unprotected)
app.use('/cart', cart.unprotected)

app.get('/', (req, res) => {
    res.send('Invalid Endpoint');
})

app.listen(4000, () => { console.log('Express Server on 4000') })

//module.exports = app