(function () {
  // ****************************************************************************************************
  // ****************************************************************************************************
  /*

    OBJECTIFS :

    - afficher une liste de produits (avec styles)
    - afficher le contenu du panier
    - faire interagir la liste produit avec le panier (au click sur un produit, on incrémente sa quantité)

    l'utilisation de design pattern et bonnes pratiques de conception sera appréciée :-)

*/

  function Page () {
    this.cart = new Cart()
    this.init()
  }

  Page.prototype.init = function () {
    $(document).ready(function () {
      (async () => {
        await this.renderProducts()
        this.cart.addListener(() => {
          this.renderCart()
        })
        await this.cart.init()
      })()
    }.bind(this))
  }

  Page.prototype.renderProducts = async function () {
    const fetchDataFromApi = await fetch('http://localhost:3000/products').catch(error => console.error('Error API ', error.message))

    if (!fetchDataFromApi.ok) {
      console.error('Error fetch API')
      return
    }

    const productsData = await fetchDataFromApi.json()

    document.getElementById('main').innerHTML = ''

    productsData.forEach(dataProduct => {
      const newProduct = new Product(dataProduct)

      document.getElementById('main').innerHTML += `<div class="products">${newProduct.render()}</div>`
    })

    Array.from(document.getElementsByClassName('product_button_add')).forEach(element => {
      element.addEventListener('click', async () => {
        await this.cart.add_product(element.id)
      }, false)
    })
  }

  Page.prototype.renderCart = function () {
    document.getElementById('cart_content').innerHTML = this.cart.render()
  }

  return new Page()
})()
