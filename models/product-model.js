const { CouchbaseClient } = require('../db/client-base')
const { ProductSchema } = require('../schemas/product-schema')

class ProductClient extends CouchbaseClient {
  constructor(options) {
    super(options)
  }
  registerModels() {
    this.Product = this.db.model('Product', ProductSchema)
  }
}

module.exports = { ProductClient }