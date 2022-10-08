const db = require('../db')
const lodash = require('lodash')

const { Schema, model } = require('ottoman')

const CartSchema = new Schema({
  items: [{
    product: { type: String, ref: 'Product' },
    quantity: { type: Number, default: 0 }
  }]
})
CartSchema.index.findByName = { by: 'name', type: 'n1ql' }
CartSchema.statics.customCreation = async function () {
  return this.create({ items: [] })
}

CartSchema.methods.addNewProduct = function (product) {
  const { stock_id } = product

  const currentItem = lodash.find(this.items, { product: stock_id })
  if (!currentItem) this.items.push({ product: stock_id, quantity: 1 })
  else {
    const { quantity } = currentItem
    const idx = lodash.findIndex(this.items, currentItem)
    this.items[idx] = { product: stock_id, quantity: quantity + 1 }
  }
  return this.save()
}
const CartModel = model('Cart', CartSchema, { collectionName: 'Cart' })

module.exports = { CartSchema, CartModel }
