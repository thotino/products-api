const express = require('express')
const fs = require('fs')
const cors = require('cors')
const bodyParser = require('body-parser')
const { createProduct, createCart, addProductToCart, findAllProducts } = require('./controllers')

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
app.post('/products', createProduct)

app.get('/products', findAllProducts)

app.post('/cart', createCart)

// Add product to cart
app.post('/cart/:id', addProductToCart)

app.listen(port, function () {
  console.log(`App listening on port ${port}`)
})
