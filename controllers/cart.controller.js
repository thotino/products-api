const { CartModel } = require('../models/cart')
const { ProductModel } = require('../models/product')

const createCart = async (req, res) => {
  try {
    const cart = await CartModel.customCreation()
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
    const product = await ProductModel.findByStockID(productId)
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
