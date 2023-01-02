const { CartClient } = require('../models/cart-model')
const { ProductClient } = require('../models/product-model')

const cartClient = new CartClient()
const productClient = new ProductClient()

const createCart = async (req, res) => {
  try {
    const cart = await cartClient.Cart.customCreation()
    return res.json(cart)
  } catch (error) {
    console.log(error.message)
    return res.send(error).status(500)
  }
}

const addProductToCart = async (req, res) => {
  try {
    const { id: cartId } = req.params
    const { productId } = req.body
    const product = await productClient.Product.findByStockID(productId)
    if (!product) throw new Error('ERR_PRODUCT_NOT_FOUND')

    const cart = await CartModel.findById(cartId)
    await cart.addNewProduct(product)
    return res.json(cart)
  } catch (error) {
    console.log(error.message)
    return res.send(error).status(500)
  }
}

module.exports = { createCart, addProductToCart }

