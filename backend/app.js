const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const express = require('express');
const app = express();
const cors = require('cors')
const mongoose = require('mongoose');
const config = require('config');
const jwt = require('jsonwebtoken')





const productsRouter = require('./router/products');
const userRouter = require('./router/users');
const auth = require('./router/auth');
const cartRouter = require('./router/carts');
const orderRouter = require('./router/orders');
const blogRouter = require('./router/blogs');






mongoose.connect('mongodb://localhost/byc')
.then(() => console.log('Connected to MongoDB......'))
.catch(err => console.log('Could not connect to MongoDB.....', err))


if (!config.get('jwtPrivateKey')) {
    console.error('FATAL ERROR: jwtPrivateKey is not defined.');
    process.exit(1);
}




app.use(express.json());
app.use(cors())

app.use('/api/products', productsRouter);
app.use('/api/users', userRouter);
app.use('/api/auths', auth);
app.use('/api/carts', cartRouter);
app.use('/api/orders', orderRouter);
app.use('/api/blogs', blogRouter);



const port = process.env.PORT || 4000;

app.listen(port, () => {console.log(`listening on port ${port}...`)});