

### Add a new product to the catalog
```sh
curl -X POST \
  http://localhost:3000/products \
  -H 'Content-Type: application/json' \
  -H 'Postman-Token: 10966b05-4495-45b5-a28e-21b6035e40a0' \
  -H 'cache-control: no-cache' \
  -d '{
        "id": "tn1",
        "label": "tshirt",
        "brand": "Nike",
        "img": "https://mosaic01.ztat.net/vgs/media/pdp-zoom/N1/24/2D/0E/JK/12/N1242D0EJ-K12@21.jpg",
        "price": "12.99"
      }'
```