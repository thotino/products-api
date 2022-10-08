function Cart () {
  this.cartData = {}
  this.cartId = ''
  this.listeners = []
}

Cart.prototype.addListener = function (listener) {
  this.listeners.push(listener)
}

Cart.prototype.notify = function (event, data) {
  for (const listener of this.listeners) {
    listener(event, data)
  }
}

Cart.prototype.setData = function (cartData) {
  this.cartData.items = cartData
  this.notify('cartData', cartData)
}

Cart.prototype.setId = function (id) {
  this.cartId = id
}

Cart.prototype.render = function () {
  let productList = []
  if (this.cartData.items) {
    productList = this.cartData.items.map(item => {
      return {
        name: item.product,
        quantity: item.quantity
      }
    })
  }

  let html = ''
  productList.forEach(product => {
    html += `<li>${product.name} - Quantity : ${product.quantity}</li>`
  })

  return html
}

Cart.prototype.add_product = async function (productToAdd) {
  const fetchToAPI = await fetch(`http://localhost:3000/cart/${this.cartId}`, {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ productId: productToAdd })
  }).catch(error => console.error('ERROR API ', error.message))

  if (!fetchToAPI.ok) {
    console.error('Error Fetch API')
    return
  }
  const { id, items } = await fetchToAPI.json()

  this.setData(items)
}

Cart.prototype.init = async function () {
  const fetchDataFromApi = await fetch('http://localhost:3000/cart', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  }).catch(error => console.error('Error API ', error.message))

  if (!fetchDataFromApi.ok) {
    console.error('Error fetch API')
    return
  }

  const { id, items } = await fetchDataFromApi.json()
  this.setData(items)
  this.setId(id)
}
