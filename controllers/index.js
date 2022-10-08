require('../db')

const { ProductModel } = require('../models/product')
const { CartModel } = require('../models/cart')

const createProduct = async (req, res) => {
  try {
    const { id, label, brand, img, price, discount: discountPercentage, discount_type: discountType } = req.body
    const product = await ProductModel.customCreation({ id, label, brand, img, price, discountPercentage, discountType })
    return res.json(product)
  } catch (error) {
    console.log(error.message)
    return res.send(error).status(500)
  }
}

const findAllProducts = async (req, res) => {
  try {
    const products = await ProductModel.findAll()
    return res.json(products)
  } catch (error) {
    console.log(error.message)
    return res.send(error).status(500)
  }
}

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
}
module.exports = { createProduct, createCart, addProductToCart, findAllProducts }
