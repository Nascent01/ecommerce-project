import { useEffect, useState } from "react";
import axios from "axios";
import ProductList from "../components/Catalog/ProductList";
import api from "../api";

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get("/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="container">
      <h1>Products</h1>
      <ProductList products={products} />
    </div>
  );
}