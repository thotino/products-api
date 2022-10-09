const { ProductModel } = require('../models/product')

const createProduct = async (req, res) => {
  try {
    const { id, label, brand, img, price, discount: discountPercentage, discount_type: discountType } = req.body
    const product = await ProductModel.customCreation({
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
    const products = await ProductModel.findAll()
    return res.json(products)
  } catch (error) {
    console.log(error.message)
    return res.send(error).status(500)
  }
}

module.exports = { createProduct, findAllProducts }
