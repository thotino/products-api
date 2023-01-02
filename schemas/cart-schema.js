const lodash = require('lodash')

const { Schema } = require('ottoman')

const CartSchema = new Schema({
  items: [{
    product: { type: String, ref: 'Product' },
    quantity: { type: Number, default: 0 }
  }]
})
CartSchema.statics.customCreation = async function () {
  return this.create({ items: [] })
}

CartSchema.methods.addNewProduct = function (product) {
  const { stock_id: stockId } = product

  const currentItem = lodash.find(this.items, { product: stockId })
  if (!currentItem) this.items.push({ product: stockId, quantity: 1 })
  else {
    const { quantity } = currentItem
    const idx = lodash.findIndex(this.items, currentItem)
    this.items[idx] = { product: stockId, quantity: quantity + 1 }
  }
  return this.save()
}
// const CartModel = model('Cart', CartSchema, { collectionName: 'Cart' })

module.exports = { CartSchema }
