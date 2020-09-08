# deno-server
Basic CRUD Operation with Deno

* No DB linkage at the moment 
* Allows simple CRUD through REST APIs 
* All files in typescript 

**Running**

```
brew install deno (mac)
deno run --allow-net server.ts
```
**Routes**
```
GET      /api/v1/products
GET      /api/v1/products/:id
POST     /api/v1/products
PUT      /api/v1/products/:id
DELETE   /api/v1/products/:id
```
**Default Product Data**
```
[{
  id: "1",
  name: "first product",
  description: "this is product",
  price: 29.99,
}, {
  id: "2",
  name: "second product",
  description: "this the second",
  price: 19.99,
}, {
  id: "3",
  name: "third product",
  description: "this the second",
  price: 19.99,
}]
```

**Recommendations**

* *deno vs. code plugin* > helps eliminate irrelevant errors (e.g. calling an await function outside an async function, calling libary URLs etc.) 
