const db = require('../db')
const lodash = require('lodash')
const { Schema, model } = require('ottoman')

const ProductSchema = new Schema({
    stockID: String,
    label: String,
    brand: String,
    img: String,
    price: Number
})

ProductSchema.index = {
    findByStockID: {
        type: 'refdoc',
        by: 'stockID'
    },
    findByLabel: {
        by: 'label'
    },
    findByBrand: {
        by: 'brand'
    }
}

ProductSchema.statics.customCreation = async function({ id, label, brand, img, price }) {
    // const existingProduct = await this.find({ stockID: id })
    // if (existingProduct && !lodash.isEmpty(existingProduct)) {
    //     console.log(`Product ${id} already exists`)
    //     return existingProduct
    // }
    return this.create({ 
        stockID: id,
        label,
        brand,
        img, 
        price
     })
}
ProductSchema.statics.findAll = async function() {
    const products = await this.find({})
    return products.rows
}
const ProductModel = model('Product', ProductSchema, { collectionName: 'Product' })
module.exports = { ProductSchema, ProductModel }