const express = require('express');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./public/schema/db')
const {ProductModel} = require('./public/schema/model/product')
const {CartModel} = require('./public/schema/model/cart')
const { DiscountModel } = require('./public/schema/model/discount')
const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(fs.readFileSync('./public/views/page.html'));
    res.end();
});

  console.log({ ProductModel, CartModel })

app.get('/hc', (req, res) => {
    res.json({ status: 'OK' })
})
app.post('/products', async (req, res) => {
    try {
        const { id, label, brand, img, price } = req.body        
        const product = await ProductModel.customCreation({ id, label, brand, img, price })
        return res.json(product)
    } catch (error) {
        console.log(error.message)
        return res.send(error).status(500)
    }    
})

app.get('/products', async(req, res) => {
    try {
        const products = await ProductModel.findAll()
        return res.json(products)
    } catch (error) {
        console.log(error.message)
        return res.send(error).status(500)
    }
})

app.post('/products/:id/discount', async (req, res) => {
    try {
        const { id: stockID } = req.params
        const { type, percentage } = req.body
        const product = await ProductModel.findByStockID(stockID)
        if(!product) throw new Error('ERR_PRODUCT_NOT_FOUND')
        const discount = await DiscountModel.customCreation({ type, percentage })
        return res.json(discount)
    } catch (error) {
        console.log(error.message)
        return res.send(error).status(500)
    }
})

app.get('/cart', async (req, res) => {
    try {
        const cart = await CartModel.customCreation()
        return res.json(cart)
    } catch (error) {
        console.log(error.message)
        return res.send(error).status(500)
    }
});

// Add product to cart
app.post('/cart/:id', async (req, res) => {
    try {
        console.log('received cart data', req.body);
    const { id: cartId } = req.params
    const { productId } = req.body
    const product = await ProductModel.findByStockID(productId)
    if (!product) throw new Error('ERR_PRODUCT_NOT_FOUND')
    
    const cart = await CartModel.findById(cartId)
    await cart.addNewProduct(product)
    return res.json(cart)
    // res.send(fs.readFileSync('cart.json'));
    } catch (error) {
        console.log(error.message)
        return res.send(error).status(500)
    }    
});

app.listen(3000, function () {
    console.log('App listening on port 3000')
});
