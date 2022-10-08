const db = require('../db')
const lodash = require('lodash')
const { Schema, model } = require('ottoman')

const ProductSchema = new Schema({
    stock_id: String,
    label: String,
    brand: String,
    img: String,
    price: Number,
    discount_percentage: Number,
    discount_type: Number
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

ProductSchema.statics.customCreation = async function({ id, label, brand, img, price, discountPercentage, discountType }) {
    return this.create({ 
        stock_id: id,
        label,
        brand,
        img, 
        price,
        discount_percentage: discountPercentage,
        discount_type: discountType
     })
}
ProductSchema.statics.findAll = async function() {
    const products = await this.find({})
    return products.rows
}
const ProductModel = model('Product', ProductSchema, { collectionName: 'Product' })
module.exports = { ProductSchema, ProductModel }