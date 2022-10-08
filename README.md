

### Add a new product to the catalog
```sh
curl -X POST \
  http://localhost:3000/products \
  -H 'Content-Type: application/json' \
  -H 'Postman-Token: 5fd5507f-b714-426f-9931-af9fdb4a8caa' \
  -H 'cache-control: no-cache' \
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
  -H 'Postman-Token: 27eeaced-f7a8-40bf-917a-ba8eceef1793' \
  -H 'cache-control: no-cache'
```