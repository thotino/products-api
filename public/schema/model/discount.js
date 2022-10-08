const db = require('../db')

const { Schema, model } = require('ottoman')
const DiscountSchema = new Schema({
    percentage: Number,
    type: String
})
DiscountSchema.index.findByName = { by: 'name', type: 'n1ql' }

DiscountSchema.statics.customCreation = async function({ type, percentage }) {
    return this.create({ 
        type, percentage
     })
}
const DiscountModel = model('Discount', DiscountSchema, { collectionName: 'Discount' })

module.exports = { DiscountSchema, DiscountModel }