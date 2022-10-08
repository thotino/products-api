const express = require('express');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./public/schema/db')
const {ProductModel} = require('./public/schema/model/product')
const {CartModel} = require('./public/schema/model/cart')
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
        console.log(req.body)
        const { id, label, brand, img, price } = req.body
        
        const product = await ProductModel.customCreation({ id, label, brand, img, price })
        return res.json(product)
    } catch (error) {
        console.log(error)
        return res.send(error).status(500)
    }    
})
app.get('/products', (req, res) => {
    res.send(fs.readFileSync('products.json'));
});

app.get('/cart', (req, res) => {
    res.send(fs.readFileSync('cart.json'));
});

app.post('/cart', (req, res) => {
    console.log('received cart data', req.body);
    res.send(fs.readFileSync('cart.json'));
});

app.listen(3000, function () {
    console.log('App listening on port 3000')
});
