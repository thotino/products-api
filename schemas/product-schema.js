const { Schema } = require('ottoman')

const ProductSchema = new Schema({
  stock_id: { type: String, required: true },
  label: String,
  brand: String,
  img: String,
  price: { type: Number, required: true },
  discount: { type: Number, min: 0, max: 100 },
  discount_type: String
})

ProductSchema.index = {
  findByStockID: {
    type: 'refdoc',
    by: 'stock_id'
  },
  findByLabel: {
    by: 'label'
  },
  findByBrand: {
    by: 'brand'
  }
}

ProductSchema.statics.customCreation = async function ({ id, label, brand, img, price, discountPercentage, discountType }) {
  return this.create({
    stock_id: id,
    label,
    brand,
    img,
    price,
    discount: discountPercentage,
    discount_type: discountType
  })
}
ProductSchema.statics.findAll = async function () {
  const products = await this.find({})
  return products.rows
}

module.exports = { ProductSchema }
