const db = require('../db')

const { Schema, model } = require('ottoman')
const { DiscountSchema } = require('./discount')
const { ProductSchema } = require('./product')
const CartSchema = new Schema({
    items: [{
        product: { type: ProductSchema, ref: 'Product', unique: true },
        discount: { type: DiscountSchema, ref: 'Discount' },
        quantity: { type: Number, default: 0 },
        initial_price: { type: Number, default: 0 },
        discounted_price: { type: Number, default: 0 }
    }]
})
CartSchema.index.findByName = { by: 'name', type: 'n1ql' }
CartSchema.statics.customCreation = async function() {
    return this.create({ items: [] })
}
CartSchema.methods.addNewProduct = function (product) {
    // const { label, brand, price } = product
    this.items.push({ product, quantity })

    return this.save()
}
const CartModel = model('Cart', CartSchema, { collectionName: 'Cart' })

module.exports = { CartSchema, CartModel }