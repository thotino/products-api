const { ProductClient } = require('../models/product-model')
const productController = new ProductClient()
const createProduct = async (req, res) => {
  try {
    const { id, label, brand, img, price, discount: discountPercentage, discount_type: discountType } = req.body
    const product = await productController.Product.customCreation({
      id,
      label,
      brand,
      img,
      price,
      discountPercentage,
      discountType
    })
    return res.json(product)
  } catch (error) {
    console.log(error.message)
    return res.send(error).status(500)
  }
}

const findAllProducts = async (req, res) => {
  try {
    const products = await productController.Product.findAll()
    return res.json(products)
  } catch (error) {
    console.log(error.message)
    return res.send(error).status(500)
  }
}

module.exports = { createProduct, findAllProducts }
