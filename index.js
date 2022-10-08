const express = require('express')
const fs = require('fs')
const cors = require('cors')
const bodyParser = require('body-parser')
const db = require('./public/schema/db')
const { ProductModel } = require('./public/schema/model/product')
const { CartModel } = require('./public/schema/model/cart')

const { port } = require('./config')
const app = express()

app.use(bodyParser.json())
app.use(cors())

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' })
  res.write(fs.readFileSync('./public/views/page.html'))
  res.end()
})

app.get('/hc', (req, res) => {
  res.json({ status: 'OK' })
})
app.post('/products', async (req, res) => {
  try {
    const { id, label, brand, img, price, discount: discountPercentage, discount_type: discountType } = req.body
    const product = await ProductModel.customCreation({ id, label, brand, img, price, discountPercentage, discountType })
    return res.json(product)
  } catch (error) {
    console.log(error.message)
    return res.send(error).status(500)
  }
})

app.get('/products', async (req, res) => {
  try {
    const products = await ProductModel.findAll()
    return res.json(products)
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
})

// Add product to cart
app.post('/cart/:id', async (req, res) => {
  try {
    console.log('received cart data', req.body)
    const { id: cartId } = req.params
    const { productId } = req.body
    const product = await ProductModel.findByStockID(productId)
    if (!product) throw new Error('ERR_PRODUCT_NOT_FOUND')

    const cart = await CartModel.findById(cartId)
    await cart.addNewProduct(product)
    return res.json(cart)
  } catch (error) {
    console.log(error.message)
    return res.send(error).status(500)
  }
})

app.listen(port, function () {
  console.log(`App listening on port ${port}`)
})
