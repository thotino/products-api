const { CouchbaseClient } = require('../db/client-base')
const { CartSchema } = require('../schemas/cart-schema')

class CartClient extends CouchbaseClient {
  constructor(options) {
    super(options)
  }
  registerModels() {
    this.Cart = this.db.model('Cart', CartSchema)
  }
}

module.exports = { CartClient }
