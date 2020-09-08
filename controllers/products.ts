import { v4 } from "https://deno.land/std/uuid//mod.ts";
import { Product } from "../types.ts";
import { compareSpecs } from "https://deno.land/x/oak@v6.1.0/negotiation/common.ts";

let products: Product[] = [{
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
}];

// @desc  Get Products
// @route GET /api/v1/products
const getProducts = ({ response }: { response: any }) => {
  response.body = {
    success: true,
    data: products,
  };
};

// @desc  Get Single Product
// @route GET /api/v1/product/:id
const getProduct = (
  { params, response }: { params: { id: string }; response: any },
) => {
  const product: Product | undefined = products.find((p) => p.id === params.id);

  if (product) {
    response.status = 200;
    response.body = {
      success: true,
      data: product,
    };
  } else {
    response.status = 404;
    response.body = {
      success: false,
      msg: "No product found",
    };
  }
};

// @desc  Add Product
// @route POST /api/v1/product/:id
const addProduct = async (
  { request, response }: { request: any; response: any },
) => {
  const body = await request.body();

  if (!request.hasBody) {
    response.status = 400;
    response.body = {
      success: false,
      msg: "No data",
    };
  } else {
    const product: Product = body.value;
    product.id = v4.generate();
    products.push(product);
    response.status = 201;
    response.body = {
      success: true,
      data: product,
    };
  }
};

// @desc  Update Product
// @route put /api/v1/product/:id
const updateProduct = async (
  { params, request, response }: {
    params: { id: string };
    response: any;
    request: any;
  },
) => {
  const product: Product | undefined = products.find((p) => p.id === params.id);

  if (product) {
    const body = await request.body();
    const updateData: { name?: string; description?: string; price?: number } =
      body.value;

    products = products.map((p) =>
      p.id === params.id ? { ...p, ...updateData } : p
    );

    response.status = 200;
    response.body = {
      success: true,
      data: products,
    };
  } else {
    response.status = 404;
    response.body = {
      success: false,
      msg: "No product found",
    };
  }
};

// @desc  Delete Product
// @route Delete /api/v1/product/:id
const deleteProduct = (
  { params, response }: { params: { id: string }; response: any },
) => {
  products = products.filter((p) => p.id !== params.id);
  response.body = {
    success: true,
    msg: "Product removed",
    data: products,
  };
};

export { getProducts, getProduct, addProduct, deleteProduct, updateProduct };
