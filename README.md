# PRODUCTS APP
## Features
* ExpressJS server
* Couchbase database with Ottoman ODM
* CRUD services
* Dockerization

## Install and start locally
```sh
git clone https://github.com/thotino/products-api.git
cd products-api
yarn install
yarn start
```

### Install and run Couchbase (with Docker)
```sh
docker run -d --name db -p 8091-8097:8091-8097 -p 11210:11210 -p 11207:11207 -p 18091-18095:18091-18095 -p 18096:18096 -p 18097:18097 couchbase

```
### Build and start the services (with Docker)
```sh
docker-compose build
docker-compose up
```

### Add a new product to the catalog
```sh
curl -X POST \
  http://localhost:3000/products \
  -H 'Content-Type: application/json' \
  -d '{
        "id": "tn1",
        "label": "tshirt",
        "brand": "Nike",
        "img": "https://mosaic01.ztat.net/vgs/media/pdp-zoom/N1/24/2D/0E/JK/12/N1242D0EJ-K12@21.jpg",
        "price": "12.99",
        "discount": 50,
        "discount_type": "soldes"
      }'
```

### Retrieve all the products in the catalog
```sh
curl -X GET \
  http://localhost:3000/products \
  -H 'Content-Type: application/json' \
```

### Create a new cart
```sh
curl -X POST \
  http://localhost:3000/cart \
  -H 'Content-Type: application/json' \
  -H 'cache-control: no-cache'
```

### Add a product to the cart